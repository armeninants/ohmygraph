import Vue from 'vue'
import Vuex from 'vuex'
import { DEFAULT_LANG } from '@/components/settings.js'

Vue.use(Vuex)

export default new Vuex.Store({
  strict: process.env.NODE_ENV !== 'production',

  state: {
    language: '',
    resource: '',
    sparqlQuery: '',
    sparqlEndpoint: '',
  },

  mutations: {
    SET_LANG(state, lang) {
      state.language = lang;
      Vue.ls.set('omg-lang', lang || '');
    },

    SET_SPARQL_ENDPOINT(state, endpoint) {
      state.sparqlEndpoint = endpoint;
      Vue.ls.set('omg-sparql-endpoint', endpoint || '');
    },

    SET_SPARQL_QUERY(state, sparqlQuery) {
      state.sparqlQuery = sparqlQuery;
      Vue.ls.set('omg-sparql-query', sparqlQuery || '');
    },

    SET_RESOURCE(state, resource) {
      state.resource = resource;
      Vue.ls.set('omg-resource', resource || '');
    },
  },

  actions: {
    initState({ commit }) {
      commit('SET_LANG', Vue.ls.get('omg-lang') || navigator.language.split('-')[0].toLowerCase());
    },

    setLanguage({ commit, state }, lang) {
      if (state.language != lang) {
        commit('SET_LANG', lang);
      }
    },

    setSparqlEndpoint({ commit, state }, endpoint) {
      if (state.sparqlEndpoint != endpoint) {
        commit('SET_SPARQL_ENDPOINT', endpoint);
      }
    },

    setSparqlQuery({ commit, state }, sparqlQuery) {
      if (state.sparqlQuery != sparqlQuery) {
        commit('SET_SPARQL_QUERY', sparqlQuery);
      }
    },

    setResource({ commit, state }, resource) {
      if (state.resource != resource) {
        commit('SET_RESOURCE', resource);
      }
    },
  },

  getters: {
    language: state => {
      return state.language || DEFAULT_LANG;
    },

    sparqlEndpoint: state => {
      return state.sparqlEndpoint;
    },

    sparqlQuery: state => {
      return state.sparqlQuery;
    },

    resource: state => {
      return state.resource;
    },
  },
});
