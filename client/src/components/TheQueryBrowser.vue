<template>
  <div class="my-query-browser">

    <div class="container-fluid my-sparql-editor">
      <div class="row">
        <div class="col-sm-6">
          <div class="form-group">
            <endpoint-selector></endpoint-selector>
          </div>
        </div>
        <div class="col-sm-6 form-inline">
          <div class="form-group">
            <div class="dropdown my-examples">
              <button id="sparqlExamples" class="btn btn-default dropdown-toggle my-examples-btn" type="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                sample queries
                <span class="caret"></span>
              </button>
              <ul class="dropdown-menu" aria-labelledby="sparqlExamples">
                <li v-for="(example, i) in examples" :key="i">
                  <a href="#" @click.prevent="setExample(i)">{{ example.name }}</a>
                </li>
              </ul>
            </div>
            <button
              @click="runQueryHandler"
              :class="['btn btn-primary my-run-button', { disabled: viewerBusy }]"
            >
              <i :class="['fa fa-fw', viewerBusy ? 'fa-spinner fa-spin' : 'fa-play']" aria-hidden="true"></i>
              {{viewerBusy ? 'abort': 'run'}}
            </button>
          </div>
        </div>
      </div>
      <div ref="editorContainer" class="my-sparql-editor-container"></div>
    </div>

    <div
      ref="viewerContainer"
      :class="['container-fluid my-viewer-container', { busy: viewerBusy }]"
    >
      <div
        class="my-table-view"
        ref="queryViewer"
        v-if="showViewer"
      >
        <div class="my-bool-resp" v-if="boolResp">{{response.boolean ? 'Yes' : 'No'}}</div>
        <div class="table-responsive">
          <table class="table table-striped table-hover" v-if="!boolResp && response.head">
            <thead>
              <tr><th v-for="header in response.head.vars">{{header}}</th></tr>
            </thead>
            <tbody>
              <tr v-for="(row, i) in response.results.bindings">
                <td v-for="(header, j) in response.head.vars" :key="(row[header] ? row[header].value : '') + '-' + i + '-' + j">
                  <rdf-resource
                    v-if="row[header]"
                    :model="row[header]"
                  ></rdf-resource>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  </div>
</template>


<script>
/**
 * @vue
 * @author Armen Inants <armen@inants.com>
 */

import RdfResource from '@/components/RdfResource'
import EndpointSelector from '@/components/EndpointSelector'
import YASQE from 'yasgui-yasqe/dist/yasqe.bundled.min.js'
import SPARQL_EXAMPLES from '@/scripts/sparql-examples.json'
import { mapGetters, mapActions } from 'vuex'
import { DEFAULT_SPARQL_ENDPOINT, DEFAULT_SPARQL_QUERY } from '@/components/settings.js'

export default {
  components: {
    RdfResource,
    EndpointSelector,
  },

  data() {
    return {
      examples: SPARQL_EXAMPLES,
      response: {},
      viewerBusy: false,
    }
  },

  computed: {
    boolResp() {
      return this.response.hasOwnProperty('boolean');
    },

    showViewer() {
      return Object.keys(this.response).length > 0;
    },

    ...mapGetters([
      'sparqlEndpoint',
      'sparqlQuery',
    ]),
  },

  watch: {
    viewerBusy(to) {
      if (to === false) {
        const offsetTarget = $(this.$refs.viewerContainer).offset().top;
        if (window.scrollY > offsetTarget ) {
          $('html, body').animate({ scrollTop: offsetTarget }, 'slow');
        }
      }
    },

    '$route'(to) {
      this.processUrlQuery(to.query);
    },

    sparqlQuery(to) {
      if (this.yasqe) {
        this.yasqe.setValue(to);
      }
      this.fetchIfApplicable();
    },
  },

  created() {
    this.processUrlQuery(this.$route.query);
  },

  mounted() {
    this.yasqe = YASQE(this.$refs.editorContainer);
    this.yasqe.setValue(this.sparqlQuery);
    this.fetchIfApplicable();
  },

  methods: {
    processUrlQuery(query) {
      if (!query.e || !query.q) {
        this.$router.replace({
          name: 'query-browser',
          query: this.getNewQuery({ e: query.e || DEFAULT_SPARQL_ENDPOINT, q: query.q || DEFAULT_SPARQL_QUERY }),
        });
      }

      this.setSparqlQuery(this.$route.query.q);
      this.setSparqlEndpoint(this.$route.query.e);
    },

    runQueryHandler() {
      if (this.viewerBusy && this.xhr && this.xhr.abort) {
        this.xhr.abort();
      } else {
        this.setSparqlQuery(this.yasqe.getValue());
        this.fetchQuery();
      }
    },

    fetchIfApplicable() {
      if (this.$route.query.q && this.$route.query.e && this.$route.query.q !== DEFAULT_SPARQL_QUERY) {
        this.fetchQuery();
      }
    },

    fetchQuery() {
      this.viewerBusy = true;
      this.xhr = this.$sparqlGet({
        sparql: this.sparqlQuery,
        endpoint: this.sparqlEndpoint,
      })
        .always(() => this.viewerBusy = false)
        .done(resp => this.processResp(resp))
        .fail(resp => this.response = {})
    },

    processResp(resp) {
      this.response = resp;
      this.$router.push({
        name: 'query-browser',
        query: { e: this.sparqlEndpoint, q: this.sparqlQuery },
      });
    },

    setExample(index) {
      this.yasqe.setValue(this.examples[index].sparql);
    },

    ...mapActions([
      'setSparqlQuery',
      'setSparqlEndpoint',
    ]),
  },

}
</script>


<style src="yasgui-yasqe/dist/yasqe.min.css"></style>

<style lang="scss">
.yasqe .CodeMirror-fullscreen {
  z-index: 1010;
}

.yasqe_buttons {
  display: none;
}

.yasqe .CodeMirror {
  font-family: 'Source Code Pro', monospace;
}
</style>

<style lang="scss" scoped>
@import "../styles/variables";

.my-sparql-editor {
  margin-top: -$navbar-margin-bottom;
  padding-top: $form-group-margin-bottom;
  padding: 15px;
  background: url('../assets/img-noise2.png') 0 0 repeat;
}

.my-run-button {
  margin-right: 15px;
}

.my-viewer-container {
  margin-top: 15px;
  &.busy {
    opacity: 0.5;
  }
}

.my-show-label {
  margin-right: 5px;
}

.nav-tabs > li.active > a {
  &, &:active, &:hover, &:focus {
    background: url('../assets/img-noise2.png') 0 0 repeat;
    border-color: transparent;
    font-weight: 700;
    color: #444;
    text-shadow: 1px 1px 0px #e0e0e0;
  }
}

.my-examples {
  display: inline-block;
  margin-right: 12px;
}

.my-table-view {
  position: relative;
}

.my-bool-resp {
  text-align: center;
  padding: 20px;
  font-weight: bold;
}
</style>
