<template>
  <div class="my-rdf-resource">
    <span
      class="my-uri"
      v-if="isUri"
      :style="'color: ' + color + ';'"
      tabindex="0"
      ref="link"
      @click="showDropdown"
      @blur="hideDropdown"
    >
      <small class="my-ns" v-if="prefix">{{ns + ':'}}</small><span class="my-postfix">{{postfix}}</span>
    </span>
    <span v-else>{{model.value}}</span>

    <ul
      class="dropdown-menu my-dropdown"
      role="menu"
      aria-labelledby="dropdownMenu"
      v-if="dropdownViz"
      :style="`left: ${relOffset.left}px; top: ${relOffset.top}px;`"
    >
      <li><router-link tabindex="-1" :to="{ name: 'resource-browser', query: { e: endpoint, r: model.value }}"><strong>Describe</strong></router-link></li>
      <li><a tabindex="-1" :href="model.value" target="_blank">Open link</a></li>
    </ul>
  </div>
</template>


<script>
/**
 * @vue
 */
import { focus } from 'vue-focus'
import PREFIXES from "@/scripts/prefixes.json"

export default {
  props: {
    model: {
      type: Object,
      required: true,
    },
    endpoint: {
      type: String,
      default: '',
    },
  },

  directives: { focus },

  data() {
    return {
      isUri: false,
      ns: '',
      prefix: '',
      postfix: '',
      color: '',
      dropdownViz: false,
    }
  },

  computed: {
    relOffset() {
      return this.getRelOffset();
    },
  },

  created() {
    const type = this.model.type;
    const val = this.model.value;

    this.isUri = type === 'uri';
    this.isLiteral = type === 'literal';
    this.isBlank = type === 'blank';

    if (this.isUri) {
      this.color = '#145eb8';
      this.postfix = val;
      for (let i = PREFIXES.length - 1; i >= 0; i--) {
        if (val.startsWith(PREFIXES[i][0])) {
          this.ns = PREFIXES[i][1];
          this.prefix = PREFIXES[i][0];
          this.color = `hsl(${PREFIXES[i][2]}, 80%, 40%)`;
          this.postfix = val.substring(PREFIXES[i][0].length);
          break;
        }
      }
      if (this.prefix && !this.postfix) {
        this.postfix = this.prefix;
        this.prefix = '';
      }
    }
  },

  mounted() {
    this.$forceUpdate();
  },

  methods: {
    getRelOffset() {
      if (this.isUri) { 
        const $link = $(this.$refs.link);
        const absOffset = $link.offset();
        const parentsOffset = $link.offsetParent().offset();
        return {
          left: absOffset.left - parentsOffset.left + $link.width() + 5,
          top: absOffset.top - parentsOffset.top - 5, // + $link.height()/2
        };
      } else {
        return {};
      }
    },

    showDropdown() {
      this.dropdownViz = true;
    },

    hideDropdown() {
      const h = () => this.dropdownViz = false;
      setTimeout(h.bind(this), 500);
    },
  },

}
</script>


<style lang="scss">
.my-rdf-resource {
  display: inline;
}

.my-uri {
  cursor: pointer;
  white-space: nowrap;

}

.my-ns {
  color: gray;
}

.my-dropdown {
  position: absolute;
  z-index: 1010;
  margin: 0;
  display: block;
}
</style>
