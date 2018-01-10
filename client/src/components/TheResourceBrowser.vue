<template>
  <div class="container-fluid my-resource-browser">
    <div class="form-horizontal my-resource-interface">
      <div class="form-group">
        <div class="col-sm-6">

          <div class="input-group margin-bottom-sm">
            <span class="input-group-addon"><i class="fa fa-search fa-fw"></i></span>
            <input
              type="text"
              class="form-control my-input-lookup"
              placeholder="Label lookup"
              disabled
            >
          </div>

        </div>
        <div class="col-sm-3">
          <flexi-input
            :model.sync="endpoint"
            :data-source="endpoints"
            key-token="url"
            label-token="name"
            placeholder="SPARQL endpoint"
          ></flexi-input>
        </div>
      </div>
    </div>

    <loading-bar :loading="isLoading"></loading-bar>

    <h3
      v-if="resource"
      class="my-resource-header"
    >
      <span class="prefix">Resource:</span> {{ resource }}
    </h3>
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
            :key="'subj-' + entry[0]"
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
                  :key="j"
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
            :key="'obj-' + entry[0]"
          >
            <td>
              is
              <rdf-resource
                :model="{type: 'uri', value: entry[0]}"
                :endpoint="endpoint"
              ></rdf-resource>
              of
            </td>
            <td>
              <ul class="my-resource-list">
                <li
                  v-for="(obj, j) in entry[1]"
                  :key="j"
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
  </div>
</template>


<script>
/**
 * @vue
 */
import ENDPOINTS from '@/scripts/endpoints.json'
import LoadingBar from '@/components/LoadingBar'
import FlexiInput from '@/components/FlexiInput'
import RdfResource from '@/components/RdfResource'
import { DEFAULT_SPARQL_ENDPOINT } from '@/components/settings.js'

export default {
  components: {
    LoadingBar,
    FlexiInput,
    RdfResource,
  },

  data() {
    return {
      endpoints: ENDPOINTS,
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
  },

  watch: {
    '$route': function(to) {
      this.processUrlQuery(to.query);
    },
  },

  created() {
    this.processUrlQuery(this.$route.query);
  },

  methods: {
    processUrlQuery(query) {
      this.endpoint = query.e || DEFAULT_SPARQL_ENDPOINT;
      this.resource = query.r;

      if (this.endpoint && this.resource) {
        this.fetchQuery();
      } else {
        this.subjectOf = [];
        this.objectOf = [];
      }
    },

    fetchQuery(endpoint, query) {
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
      return `SELECT ?s ?p ?o WHERE {
        {
          SELECT ?p ?o WHERE {
            <${resource}> ?p ?o.
            FILTER(!isLiteral(?o) || !lang(?o) || lang(?o) = 'en')
          } LIMIT 50
        } UNION {
          SELECT ?s ?p WHERE {
            ?s ?p <${resource}>.
          } LIMIT 50
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
  },
}
</script>


<style lang="scss" scoped>
.my-resource-browser {
  position: relative;
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
  font-size: 1.5em;

  .prefix {
    color: #ccc;
  }
}
</style>
