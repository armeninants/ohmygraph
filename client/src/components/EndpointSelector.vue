<template>
  <div class="my-endpoint-selector-wrapper">
    <div class="input-group">
      <span class="input-group-addon"><i class="fa fa-database" aria-hidden="true"></i></span>
      <i class="fa fa-caret-down my-flexi-icon" aria-hidden="true"></i>
      <input
        type="text"
        class="form-control my-endpoint-selector"
        autocomplete="off"
        v-model="valueInternal"
        v-focus="focusOnInput"
        placeholder="SPARQL endpoint"
        @focus="focusOnInputHandler"
        @keydown.up="upHandler"
        @keydown.esc="hideDropdown"
        @keydown.down="downHandler"
        @keydown.enter="toggleDropdown"
      >
    </div>

    <ul 
      class="dropdown-menu pre-scrollable my-endpoint-selector-dropdown"
      v-show="dropdownVisible"
      @keydown.down="downHandler"
      @keydown.up="upHandler"
    >
      <li v-for="(item, i) in endpoints" :key="item.url">
        <a
          href="#"
          tabindex="0"
          @click.prevent="itemSelectHandler(i)"
          @keydown.enter="itemSelectHandler(i)"
          @keydown.space="itemSelectHandler(i)"
          @keydown.esc="hideDropdown"
          @focus="focusOnItemHandler(i)"
          v-focus="!focusOnInput && dropdownVisible && currentOptionIndex === i"
        >
          <span class="my-endpoint-selector-label">{{item.name}}</span>
          <span :class="['my-endpoint-selector-key', {parentheses: item.name }]">{{item.url}}</span>
        </a>
      </li>
    </ul>
  </div>  
</template>


<script>
/**
 * @vue
 * @author Armen Inants <armen@inants.com>
 */
import ENDPOINTS from '@/scripts/endpoints.json'
import { focus } from 'vue-focus'
import { mapGetters, mapActions } from 'vuex'

export default {
  name: 'endpoint-selector',

  directives: { focus },

  data() {
    return {
      endpoints: ENDPOINTS,
      valueInternal: '',
      currentOptionIndex: undefined,
      focusOnInput: false,
      dropdownVisible: false,
    }
  },

  computed: {
    ...mapGetters([
      'sparqlEndpoint',
    ]),
  },

  watch: {
    sparqlEndpoint(to) {
      this.valueInternal = to;
    },

    valueInternal(to) {
      this.setSparqlEndpoint(this.valueInternal);
    },
  },

  created() {
    this.valueInternal = this.sparqlEndpoint;
  },

  mounted() {
    $(window).on('click.endpoint-selector', event => {
      if (!$.contains(this.$el, event.target)) {
        this.focusOnInput = false;
        this.hideDropdown();
      }
    });
  },

  beforeDestroy() {
    $(window).off('click.endpoint-selector');
  },

  methods: {
    showDropdown() {
      this.dropdownVisible = true;
    },

    hideDropdown() {
      this.dropdownVisible = false;
    },

    toggleDropdown() {
      this.dropdownVisible = !this.dropdownVisible;
    },

    focusOnInputHandler() {
      this.focusOnInput = true;
      if (this.endpoints.length) {
        this.showDropdown();
      }
    },

    focusOnItemHandler(index) {
      this.currentOptionIndex = index;
    },

    itemSelectHandler(index) {
      this.valueInternal = this.endpoints[index].url;
      this.setSparqlEndpoint(this.valueInternal);
      this.focusOnInput = false;
      this.hideDropdown();
    },

    downHandler() {
      if (!this.dropdownVisible) {
        this.showDropdown();
      }
      this.focusOnInput = false;
      var idx = typeof this.currentOptionIndex !== 'undefined' ? this.currentOptionIndex : -1;
      this.currentOptionIndex = (idx + 1) % this.endpoints.length;
    },

    upHandler() {
      if (!this.dropdownVisible) return;
      this.focusOnInput = false;
      var idx = typeof this.currentOptionIndex !== 'undefined' ? this.currentOptionIndex : 0;
      this.currentOptionIndex = (idx - 1 + this.endpoints.length) % this.endpoints.length;
    },

    ...mapActions([
      'setSparqlEndpoint',
    ]),
  },
}
</script>


<style lang="scss" scoped>
.my-endpoint-selector-wrapper {
  position: relative;
}

.my-endpoint-selector {
  padding-right: 26px;
}

.my-endpoint-selector-dropdown {
  position: absolute;
  display: block;
}

.my-endpoint-selector-label {
  font-weight: bold;
}

.parentheses {
  &:before {
    content: '(';
  }
  &:after {
    content: ')';
  }
}

.my-flexi-icon {
  position: absolute;
  right: 12px;
  top: calc(50% - 9px);
  line-height: 20px;
  color: gray;
  z-index: 4;
}
</style>