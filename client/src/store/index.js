import Vue from 'vue'
import Vuex from 'vuex'
import { DEFAULT_LANG } from '@/components/settings.js'

Vue.use(Vuex)

export default new Vuex.Store({
  strict: process.env.NODE_ENV !== 'production',
  state: {
    lang: '',
  },
  mutations: {
    SET_LANG(state, lang) {
      state.lang = lang;
      Vue.ls.set('omg-lang', lang);
    },
  },

  actions: {
    initState({ commit }) {
      let lang = Vue.ls.get('omg-lang');
      if (lang === null) { lang = navigator.language; }
      if (!lang) { lang = DEFAULT_LANG; }

      commit('SET_LANG', lang);
    },

    setLanguage({ commit }, lang) {
      commit('SET_LANG', lang);
    },
  },

  getters: {
    language: state => {
      return state.lang;
    },
  },
});
