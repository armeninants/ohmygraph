<template>
  <div class="my-resource-browser">
    <div class="container-fluid">
      <div class="row my-resource-interface">
        <div class="col-sm-6">
          <div class="form-group">
            <label-search
              :endpoint="endpoint"
              @selected="resourceSelectHandler"
            ></label-search>
          </div>
        </div>
        <div class="col-sm-6">
          <div class="form-group">
            <endpoint-selector
              :model.sync="endpoint"
              key-token="url"
              label-token="name"
              placeholder="SPARQL endpoint"
            ></endpoint-selector>
          </div>
        </div>
      </div>
      <loading-bar class="row" :loading="isLoading"></loading-bar>
    </div>

    <div class="container">
      <div
        v-if="resource"
        class="my-resource-header"
      >
        <span class="prefix">Resource:</span>
        <rdf-resource
          :model="{type: 'uri', value: resource}"
          :endpoint="endpoint"
        ></rdf-resource>
      </div>
      <div class="table-responsive" v-if="showResults">
        <table class="table table-striped table-hover">
          <thead>
            <tr>
              <th>Property</th>
              <th>Value</th>
            </tr>
          </thead>
          <tbody>
            <tr
              v-for="(entry, i) in subjectOf"
              :key="'subj-' + i + entry[0]"
            >
              <td>
                <rdf-resource
                  :model="{type: 'uri', value: entry[0]}"
                  :endpoint="endpoint"
                ></rdf-resource>
              </td>
              <td>
                <ul class="my-resource-list">
                  <li
                    v-for="(obj, j) in entry[1]"
                    :key="j + '-' + obj.value"
                  >
                    <rdf-resource
                      :model="obj"
                      :endpoint="endpoint"
                    ></rdf-resource>
                  </li>
                </ul>
              </td>
            </tr>
            <tr
              v-for="(entry, i) in objectOf"
              :key="'obj-' + i + entry[0]"
            >
              <td>
                is
                <rdf-resource
                  :model="{'type': 'uri', value: entry[0]}"
                  :endpoint="endpoint"
                ></rdf-resource>
                of
              </td>
              <td>
                <ul class="my-resource-list">
                  <li
                    v-for="(obj, j) in entry[1]"
                    :key="j + '-' + obj.value"
                  >
                    <rdf-resource
                      :model="obj"
                      :endpoint="endpoint"
                    ></rdf-resource>
                  </li>
                </ul>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
      <div v-if="resource && !isLoading && !showResults">Description is empty.</div>
    </div>
  </div>
</template>


<script>
/**
 * @vue
 * @author Armen Inants <armen@inants.com>
 */
import LoadingBar from '@/components/LoadingBar'
import LabelSearch from '@/components/LabelSearch'
import RdfResource from '@/components/RdfResource'
import EndpointSelector from '@/components/EndpointSelector'
import LanguageSelector from '@/components/LanguageSelector'
import { DEFAULT_SPARQL_ENDPOINT } from '@/components/settings.js'
import { mapGetters } from 'vuex'

export default {
  components: {
    LoadingBar,
    LabelSearch,
    RdfResource,
    EndpointSelector,
    LanguageSelector,
  },

  data() {
    return {
      endpoint: '',
      resource: '',
      label: '',
      subjectOf: [],
      objectOf: [],
      isLoading: false,
    }
  },

  computed: {
    showResults() {
      return !!(this.subjectOf.length || this.objectOf.length);
    },

    ...mapGetters([
      'language',
    ]),
  },

  watch: {
    '$route': function(to) {
      this.processUrlQuery(to.query);
    },

    language(to) {
      this.fetchIfApplicable();
    },
  },

  created() {
    this.processUrlQuery(this.$route.query);
  },

  methods: {
    processUrlQuery(query) {
      this.endpoint = query.e || DEFAULT_SPARQL_ENDPOINT;
      this.resource = query.r;
      this.fetchIfApplicable();
    },

    fetchIfApplicable() {
      if (this.endpoint && this.resource) {
        this.fetchQuery();
      } else {
        this.subjectOf = [];
        this.objectOf = [];
      }
    },

    fetchQuery() {
      this.isLoading = true;

      const url = '/proxy?endpoint=' +
        encodeURIComponent(this.endpoint) +
        '&sparql=' +
        encodeURIComponent(this.getSparql(this.resource));

      $.getJSON(url)
        .then(this.processResp, err => {
          $.notify(err, 'error');
          this.subjectOf = [];
          this.objectOf = [];
          this.isLoading = false;
        });
    },

    getSparql(resource) {
      const langFilter = this.language !== '*' ? ` && (lang(?o) = '' || LANGMATCHES(lang(?o), '${this.language}'))` : '';
      return `SELECT DISTINCT ?s ?p ?o WHERE {
        {
          SELECT ?p ?o WHERE {
            <${resource}> ?p ?o.
            FILTER(isLiteral(?o)${langFilter})
          } LIMIT 100
        } UNION {
          SELECT ?p ?o WHERE {
            <${resource}> ?p ?o.
            FILTER(!isLiteral(?o))
          } LIMIT 100
        } UNION {
          SELECT ?s ?p WHERE {
            ?s ?p <${resource}>.
          } LIMIT 100
        }
      }`;
    },

    processResp(resp) {
      const rows = resp.results.bindings;
      let subjectOf = {};
      let objectOf = {};
      for (var i = 0; i < rows.length; i++) {
        var row = rows[i];
        var pred = row.p.value;
        if (row.hasOwnProperty('o')) {
          if (subjectOf.hasOwnProperty(pred)) {
            subjectOf[pred].push(row.o);
          } else {
            subjectOf[pred] = [row.o];
          }
        } else {
          if (objectOf.hasOwnProperty(pred)) {
            objectOf[pred].push(row.s);
          } else {
            objectOf[pred] = [row.s];
          }
        }
      }

      this.subjectOf = Object.entries(subjectOf);
      this.objectOf = Object.entries(objectOf);

      this.isLoading = false;

      const offsetTarget = $(this.$el).offset().top;
      if (window.scrollY > offsetTarget ) {
        $('html, body').animate({ scrollTop: 0 }, 'slow');
      }
    },

    resourceSelectHandler(resource) {
      this.$router.push({ 
        name: 'resource-browser',
        query: this.getNewQuery({ r: resource, e: this.endpoint })
      });
    },
  },
}
</script>


<style lang="scss" scoped>
@import "../styles/variables";

.my-resource-browser {
  position: relative;
}

.my-resource-interface{
  margin-top: -$navbar-margin-bottom;
  padding-top: $form-group-margin-bottom;
  background: url('../assets/img-noise2.png') 0 0 repeat;
}

.my-bool-resp {
  text-align: center;
  padding: 20px;
  font-weight: bold;
}

.my-resource-list {
  margin: 0;

  li:first-child:last-child {
    list-style: none;
  }
}

.my-resource-header{
  margin: 15px 0;
  font-size: $font-size-h4;

  .prefix {
    color: #ccc;
  }
}
</style>
