<template>
  <div class="input-group-btn">
    <button
      id="langSelector"
      class="btn btn-default dropdown-toggle my-lang-selector"
      type="button"
      data-toggle="dropdown"
      aria-haspopup="true"
      aria-expanded="false"
    >
      <i class="fa fa-fw fa-globe" aria-hidden="true"></i>
      {{ label }}
      <span class="caret"></span>
    </button>
    <ul class="dropdown-menu pre-scrollable my-lang-dropdown" aria-labelledby="langSelector">
      <li>
        <a href="#" @click="selectOptionHandler()" >{{ unselectedLabel }}</a>
      </li>
      <li v-for="(lang, i) in languages" :key="i">
        <a href="#" @click="selectOptionHandler(i)" >{{ lang.local }}</a>
      </li>
    </ul>
  </div>
</template>


<script>
/**
 * @vue
 * @author Armen Inants <armen@inants.com>
 */
import langs from 'langs'
import { mapGetters, mapActions } from 'vuex'

export default {
  data() {
    return {
      languages: [],
      selectedIndex: undefined,
      unselectedLabel: 'all languages',
    }
  },

  computed: {
    label() {
      return this.selectedIndex === undefined
        ? this.unselectedLabel
        : this.languages[this.selectedIndex].local
    },

    ...mapGetters([
      'language',
    ]),
  },

  watch: {
    selectedIndex(index) {
      if (index === undefined) {
        this.setLanguage('');
      } else {
        this.setLanguage(this.languages[index][1]);
      }
    },
  },

  created() {
    this.languages = langs.all()
  },

  methods: {
    selectOptionHandler(index) {
      this.selectedIndex = index
    },

    ...mapActions([
      'setLanguage',
    ]),
  },
}
</script>


<style lang="scss" scoped>
.my-lang-selector {
  border-radius: 0;
  border-right: 0;
  border-left: 0;
}

.my-lang-dropdown {
  z-index: 1001;
}
</style>
