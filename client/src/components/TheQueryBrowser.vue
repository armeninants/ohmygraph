<template>
  <div class="container-fluid my-query-browser">
    <div class="my-interface-picker">
      <ul class="nav nav-tabs">
        <li role="presentation" :class="{active: queryInterfaceId === 'sparql'}">
          <a href="#" @click.prevent="switchToInterface('sparql')">
            query in SPARQL
          </a>
        </li>
        <li role="presentation" class="disabled">
          <a href="#" @click.prevent="" title="Will become available in future releases">
            query in English
          </a>
        </li>
      </ul>
    </div>
    <div
      v-if="!!currentInterface"
      class="my-interface-container"
    >
      <component
        :is="currentInterface"
        @dispatchQuery="queryDispatchedHandler"
        ref="interface"
      >
        <button
          @click="runQueryHandler"
          :class="['btn btn-primary my-run-button', { disabled: viewerBusy }]"
          :disabled="viewerBusy"
        >
          <span v-if="viewerBusy" key="runButtonState">
            <i class="fa fa-spinner fa-spin"></i>
            busy...
          </span>
          <span v-else key="runButtonState">
            <i class="fa fa-play" aria-hidden="true"></i>
            run
          </span>
        </button>
      </component>
    </div>
    <div class="my-viewer-picker">
      <span class="form-control-static my-show-label">Show results as a</span>

      <div class="btn-group">
        <button
          @click="setQueryViewer('table')"
          :class="['btn btn-default', { active: queryViewerId === 'table' }]"
        >
          <i class="fa fa-table" aria-hidden="true"></i> table
        </button>
        <button
          disabled
          title="Will become available in future releases"
          @click="setQueryViewer('rdfgraph')"
          :class="['btn btn-default', { active: queryViewerId === 'rdfgraph' }]"
        >
          <i class="fa fa-share-alt fa-rotate-90" aria-hidden="true"></i> graph
        </button>
      </div>
    </div>
    <div
      ref="viewerContainer"
      :class="['my-viewer-container', { busy: viewerBusy }]"
    >
      <component
        v-if="showViewer"
        :is="currentViewer"
        :query-object="queryObject"
        @busy="viewerBusyHandler"
        @idle="viewerIdleHandler"
      ></component>
    </div>
  </div>
</template>


<script>
/**
 * @vue
 * @todo Consolidate.
 */
import TableView from '@/components/TableView'
import SparqlEditor from '@/components/SparqlEditor'
// import RdfGraphViewer from '@/components/RdfGraphViewer'

export default {
  components: {
    TableView,
    SparqlEditor,
    // RdfGraphViewer,
  },

  data() {
    return {
      QUERY_INTERFACES: {
        sparql: 'SparqlEditor',
      },
      QUERY_VIEWERS: {
        table: 'TableView',
        // rdfgraph: 'RdfGraphViewer',
      },
      queryInterfaceId: '',
      queryViewerId: '',
      queryObject: {},
      viewerBusy: false,
    }
  },

  computed: {
    /**
     * Get Query Interface Component by its ID.
     *
     * @return {mixed} Vue Component or undefined.
     */
    currentInterface() {
      return this.QUERY_INTERFACES[this.queryInterfaceId];
    },

    /**
     * Get Query Viewer Component by its ID.
     *
     * @return {mixed} Vue Component or undefined.
     */
    currentViewer() {
      return this.QUERY_VIEWERS[this.queryViewerId];
    },

    showViewer() {
      return Object.keys(this.queryObject).length > 0;
    },
  },

  watch: {
    '$route': function(to) {
      this.chooseActiveInterface(to.query);
    },
  },

  created() {
    this.chooseActiveInterface(this.$route.query);
  },

  mounted() {
  },

  methods: {
    /**
     * Chooses the active interface based on the interface ID coming from the URL query.
     *
     * @param {object} query - URL query.
     */
    chooseActiveInterface(query) {
      // if (query.e && query.q) {
      this.queryInterfaceId = 'sparql';
      // }
      this.queryViewerId = this.QUERY_VIEWERS.hasOwnProperty(query.v) ? query.v : 'table';
    },

    runQueryHandler() {
      if (this.viewerBusy) return;
      this.$refs.interface.$emit('requestForQuery');
    },

    queryDispatchedHandler(queryObject) {
      this.queryObject = queryObject;
    },

    viewerBusyHandler() {
      this.viewerBusy = true;
    },

    viewerIdleHandler() {
      this.viewerBusy = false;
      const offsetTarget = $(this.$refs.viewerContainer).offset().top;
      if (window.scrollY > offsetTarget ) {
        $('html, body').animate({ scrollTop: offsetTarget }, 'slow');
      }
    },

    switchToInterface(interfaceId) {
      this.queryInterfaceId = interfaceId;
    },

    setQueryViewer(viewerId) {
      this.$router.replace({
        query: this.getNewQuery({v: viewerId})
      });
      // this.$route.query.v = viewerId;
    },
  },

}
</script>


<style lang="scss" scoped>
.my-viewer-picker {
  margin-top: 25px;
  margin-bottom: 15px;
}

.my-interface-container {
  // border: 1px #ddd solid;
  // border-top: 0;
  padding: 15px;
  // background: #fff;
  // position: relative;

  // &:before, &:after {
  //   z-index: -1;
  //   position: absolute;
  //   content: "";
  //   bottom: 15px;
  //   left: 10px;
  //   width: 50%;
  //   top: 80%;
  //   max-width:300px;
  //   background: #777;
  //   box-shadow: 0 15px 10px #777;
  //   transform: rotate(-3deg);
  // }

  // &:after {
  //   transform: rotate(3deg);
  //   right: 10px;
  //   left: auto;
  // }

}

.my-run-button {
  margin-right: 15px;
}

.my-viewer-container.busy {
  opacity: 0.5;
}

.my-show-label {
  margin-right: 5px;
}
</style>
