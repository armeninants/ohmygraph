<template>
  <div class="my-lang-select">
    <a
      v-show="!dropdownVisible"
      id="langSelector"
      href="#"
      class="dropdown-toggle my-lang-toggle"
      aria-haspopup="true"
      aria-expanded="false"
      @keydown.down="showDropdown"
      @click.prevent="toggleDropdown"
    >
      <i class="fa fa-fw fa-globe"></i>
      {{ label }}
      <span class="caret"></span>
    </a>
    <div
      class="my-input-container"
      v-show="dropdownVisible"
    >
      <input
        v-model="searchString"
        v-focus="focusOnInput"
        @keydown.down="inputDownkeyHandler"
        @focus="focusOnInputHandler"
        type="search"
        class="form-control my-lang-search"
        ref="search"
      >
      <i class="fa fa-fw fa-globe my-search-icon"></i>
    </div>
    <ul
      v-show="dropdownVisible && filtered.length > 0"
      class="dropdown-menu pre-scrollable my-lang-dropdown"
      aria-labelledby="langSelector"
      ref="dropdown"
      @keydown.down="downHandler"
      @keydown.up="upHandler"
    >
      <li
        v-for="(lang, i) in filtered"
        :key="i+lang[1]"
      >
        <a
          href="#"
          tabindex="0"
          v-focus="focusOnItem(i)"
          @focus="focusOnItemHandler(i)"
          @click.prevent="selectOptionHandler(i)"

          @keydown.esc="hideDropdown"
        >
          {{ lang.local }}
        </a>
      </li>
    </ul>
  </div>
</template>


<script>
/**
 * Language selector component.
 * There should always be a selected option.
 * Initial selection comes from Vuex store.
 *
 * @vue
 * @author Armen Inants <armen@inants.com>
 */
import langs from 'langs'
import { focus } from 'vue-focus'
import { mapGetters, mapActions } from 'vuex'

export default {
  directives: { focus },

  data() {
    return {
      filtered: [],
      selected: {},
      unselectedLabel: 'all languages',
      searchString: '',
      focusOnInput: false,
      dropdownVisible: false,
      currentOptionIndex: 0,
    }
  },

  computed: {
    label() {
      return this.selected.local;
    },

    ...mapGetters([
      'language',
    ]),
  },

  watch: {
    language(to) {
      this.selected = this.getLangObj(to);
    },

    searchString(to) {
      this.filterOptions(to);
    },
  },

  created() {
    const unselectedOption = {
      local: this.unselectedLabel,
      name: this.unselectedLabel,
      1: '*',
    };

    this.languages = [unselectedOption].concat(langs.all());
    this.filterOptions();
    this.selected = this.getLangObj(this.language);
  },

  mounted() {
    this.clickHandler = event => {
      if (!this.isDescendant(this.$el, event.target)) {
        this.hideDropdown();
      }
    };

    window.addEventListener('click', this.clickHandler);
  },

  beforeDestroy() {
    window.removeEventListener('click', this.clickHandler);
  },


  methods: {
    selectOptionHandler(index) {
      this.selected = this.filtered[index];
      this.setLanguage(this.selected[1]);
      this.hideDropdown();
    },

    toggleDropdown() {
      if (this.dropdownVisible) {
        this.hideDropdown();
      } else {
        this.showDropdown();
      }
    },

    showDropdown() {
      this.dropdownVisible = true;
      this.focusOnInput = true;
      this.searchString = '';
    },

    hideDropdown() {
      this.dropdownVisible = false;
    },

    focusOnItem(i) {
      return !this.focusOnInput && this.dropdownVisible && this.currentOptionIndex === i;
    },

    focusOnInputHandler() {
      this.focusOnInput = true;
    },

    inputDownkeyHandler() {
      this.focusOnInput = false;
    },

    focusOnItemHandler(index) {
      this.focusOnInput = false;
      this.currentOptionIndex = index;
    },

    getLangObj(lang) {
      for (var i = 0; i < this.languages.length; i++) {
        if (lang === this.languages[i][1]) {
          return this.languages[i];
          break;
        }
      }
      return this.languages[0]; //if not found
    },

    filterOptions(keyword) {
      if (!keyword) {
        this.filtered = this.languages;
      } else {
        const keywordEscaped = this.doubleEscapeRegExp(keyword);
        const regex = new RegExp(`^${keywordEscaped}`, 'i');
        this.filtered = this.languages.filter(word => {
          return word.local.match(regex) || word.name.match(regex) || word[1].match(regex);
        });
        this.currentOptionIndex = 0;
      }
    },

    downHandler() {
      this.currentOptionIndex = (this.currentOptionIndex + 1) % this.filtered.length;
    },

    upHandler() {
      this.currentOptionIndex = (this.currentOptionIndex - 1 + this.filtered.length) % this.filtered.length;
    },

    ...mapActions([
      'setLanguage',
    ]),
  },
}
</script>


<style lang="scss" scoped>
@import "../styles/variables";

.my-lang-toggle {
  line-height: $input-height-base;
}

.my-lang-dropdown {
  z-index: 1001;
  display: block;
}

.my-lang-select {
  position: relative;
}

.my-input-container {
  padding-left: 27px;
  position: relative;
}

.my-lang-search {
  width: 10em;
  background: rgba(255, 255, 255, 0.7);
  border: none;
  box-shadow: 1px 1px 0px 0px #ccc inset;
  border-radius: $input-height-base/2;
  opacity: .5;
  -webkit-transition: all .5s ease;
  -moz-transition: all .5s ease;
  transition: all .5s ease;

  &:focus, &:focus+i {
    opacity: 1;
  }
}

.my-search-icon {
  -webkit-transition: all .5s ease;
  -moz-transition: all .5s ease;
  transition: all .5s ease;
  opacity: .5;
  position: absolute;
  top: ($input-height-base - 18px)/2;
  left: 0px;
}
</style>
