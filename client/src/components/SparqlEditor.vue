<template>
  <div class="my-sparql-editor">
    <div class="row">
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
 * @author Armen Inants <armen@inants.com>
 */
import EndpointSelector from '@/components/EndpointSelector'
import QueryInterface from '@/components/QueryInterface'
import YASQE from 'yasgui-yasqe/dist/yasqe.bundled.min.js'
import SPARQL_EXAMPLES from '@/scripts/sparql-examples.json'

export default {
  components: {
    EndpointSelector,
  },

  extends: QueryInterface,

  data() {
    return {
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
.my-examples {
  display: inline-block;
  margin-right: 12px;
}
</style>