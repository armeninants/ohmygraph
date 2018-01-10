<template>
  <div class="my-sparql-editor">
    <div class="row">
      <div class="col-sm-6">
        <flexi-input
          :model.sync="endpoint"
          :data-source="endpoints"
          key-token="url"
          label-token="name"
          placeholder="SPARQL endpoint"
        ></flexi-input>
      </div>
      <div class="col-sm-6 form-inline">
        <div class="form-group my-examples-container">
          <div class="dropdown">
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
        </div>
        <div class="form-group">
          <slot></slot>
        </div>
      </div>
    </div>
    <div ref="editorContainer" class="my-sparql-editor-container"></div>
  </div>
</template>


<script>
/**
 * @vue
 */
import FlexiInput from '@/components/FlexiInput'
import QueryInterface from '@/components/QueryInterface'
import YASQE from 'yasgui-yasqe/dist/yasqe.bundled.min.js'
import SPARQL_EXAMPLES from '@/scripts/sparql-examples.json'
import ENDPOINTS from '@/scripts/endpoints.json'
export default {
  components: {
    FlexiInput,
  },

  extends: QueryInterface,

  data() {
    return {
      endpoints: ENDPOINTS,
      endpoint: '',
      examples: SPARQL_EXAMPLES,
    }
  },

  watch: {
    '$route': function(to) {
        this.setFields(to.query);
    },
  },

  mounted() {
    this.yasqe = YASQE(this.$refs.editorContainer);
    this.setFields(this.$route.query);
    $('.dropdown-toggle').dropdown()
  },

  methods: {
    getQuery() {
      return {
        endpoint: this.endpoint,
        sparql: this.yasqe.getValue(),
      }
    },

    setExample(index) {
      this.yasqe.setValue(this.examples[index].sparql);
    },

    getSparql(query) {
      return query.q || 'select distinct ?Concept where {[] a ?Concept} LIMIT 100';
    },

    getEndpoint(query) {
      return query.e || 'https://dbpedia.org/sparql';
    },

    setFields(query) {
      this.endpoint = this.getEndpoint(query);
      this.yasqe.setValue(this.getSparql(query));

      if (query.e && query.q) {
        this.dispatchQuery();
      }
    },
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
.form-group:last-child {
  margin-bottom: 0;
}

.my-sparql-editor-container {
  margin-top: 15px;
}

.my-examples-container {
  margin-right: 28px;
}
</style>