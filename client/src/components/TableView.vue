<template>
  <div class="my-table-view">
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
                :endpoint="queryObject.endpoint"
              ></rdf-resource>
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
import RdfResource from '@/components/RdfResource'
export default {
  components: {
    RdfResource,
  },

  props: {
    queryObject: {
      type: Object,
      required: true,
    },
  },

  data() {
    return {
      response: {},
    }
  },

  computed: {
    boolResp() {
      return this.response.hasOwnProperty('boolean');
    }
  },

  watch: {
    queryObject(to, from) {
      // if (to.endpoint !== from.endpoint || to.sparql !== from.sparql) {
        this.fetchQuery();
      // }
    },
  },

  mounted() {
    this.fetchQuery();
  },

  methods: {
    fetchQuery(endpoint, query) {
      this.$emit('busy');
      const url = '/proxy?endpoint=' +
        encodeURIComponent(this.queryObject.endpoint) +
        '&sparql=' +
        encodeURIComponent(this.queryObject.sparql);

      $.getJSON(url)
      .then(this.processResp, err => {
        this.response = {};
        $.notify(err, 'error');
        this.$emit('idle');
      });
    },

    processResp(resp) {
      this.response = resp;
      this.$emit('idle');
      this.$router.push({ 
        query: this.getNewQuery({ e: this.queryObject.endpoint, q: this.queryObject.sparql, v: 'table' }, ['r'])
      });
    },
  },
}
</script>


<style lang="scss" scoped>
.my-table-view {
  position: relative;
}

.my-bool-resp {
  text-align: center;
  padding: 20px;
  font-weight: bold;
}
</style>
