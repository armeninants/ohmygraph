<template>
  <div class="my-flexiinput-wrapper">
    <input
      type="text"
      class="form-control my-flexiinput"
      autocomplete="off"
      v-model="valueInternal"
      v-focus="focusOnInput"
      :placeholder="placeholder"
      @focus="focusOnInputHandler"
      @keydown.up="upHandler"
      @keydown.esc="hideDropdown"
      @keydown.down="downHandler"
      @keydown.enter="toggleDropdown"
    >
    <i class="fa fa-caret-down my-flexi-icon" aria-hidden="true"></i>
    <ul 
      class="dropdown-menu pre-scrollable my-flexiinput-dropdown"
      v-show="dropdownVisible"
      @keydown.down="downHandler"
      @keydown.up="upHandler"
    >
      <li v-for="(item, i) in dataSource" :key="dataSource[i][keyToken]">
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
          <span class="my-flexiinput-label">{{dataSource[i][labelToken]}}</span>
          <span :class="['my-flexiinput-key', {parentheses: dataSource[i][labelToken] }]">{{dataSource[i][keyToken]}}</span>
        </a>
      </li>
    </ul>
  </div>  
</template>

<script>
/**
 * @vue
 */
import { focus } from 'vue-focus'

export default {
  name: 'flexi-input',

  props: {
    dataSource: {
      type: Array,
      default: () => [],
    },

    keyToken: {
      type: String,
      default: 'id',
    },

    labelToken: {
      type: String,
      default: 'label',
    },

    model: {
      type: String,
      default: '',
    },

    placeholder: {
      type: String,
      default: '',
    },
  },

  directives: { focus },

  data() {
    return {
      valueInternal: '',
      currentOptionIndex: undefined,
      focusOnInput: false,
      dropdownVisible: false,
    }
  },

  watch: {
    model(val) {
      this.valueInternal = val;
    },

    valueInternal(val) {
      this.$emit('update:model', val);
    },
  },

  created() {
    this.valueInternal = this.model;
  },

  mounted() {
    $(window).on('click.flexiinput', event => {
      if (!$.contains(this.$el, event.target)) {
        this.focusOnInput = false;
        this.hideDropdown();
      }
    });
  },

  beforeDestroy() {
    $(window).off('click.flexiinput');
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
      if (this.dataSource.length) {
        this.showDropdown();
      }
    },

    focusOnItemHandler(index) {
      this.currentOptionIndex = index;
    },

    itemSelectHandler(index) {
      this.valueInternal = this.dataSource[index][this.keyToken];
      this.focusOnInput = false;
      this.hideDropdown();
    },

    downHandler() {
      if (!this.dropdownVisible) {
        this.showDropdown();
      }
      this.focusOnInput = false;
      var idx = typeof this.currentOptionIndex !== 'undefined' ? this.currentOptionIndex : -1;
      this.currentOptionIndex = (idx + 1) % this.dataSource.length;
    },

    upHandler() {
      if (!this.dropdownVisible) return;
      this.focusOnInput = false;
      var idx = typeof this.currentOptionIndex !== 'undefined' ? this.currentOptionIndex : 0;
      this.currentOptionIndex = (idx - 1 + this.dataSource.length) % this.dataSource.length;
    },
  },
}
</script>

<style lang="scss" scoped>
.my-flexiinput-wrapper {
  position: relative;
}

.my-flexiinput {
  padding-right: 20px;
}

.my-flexiinput-dropdown {
  position: absolute;
  display: block;
}

.my-flexiinput-label {
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
  right: 6px;
  top: calc(50% - 9px);
  line-height: 20px;
  color: gray;
}
</style>