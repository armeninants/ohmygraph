export default {
  methods: {
    /**
     * Returns a query object based on the current URL query by adding and removing some parameters.
     *
     * @param {object} newFragment - The parameters to add/overwrite.
     * @param {array} removeFragment - An array of parameters to remove.
     * @return {object} The new query.
     */
    getNewQuery(newFragment, removeFragment) {
      let newQuery = Object.assign({}, this.$route.query, newFragment)

      if (removeFragment instanceof Array) {
        for (let i = 0; i < removeFragment.length; i++) {
          if (newQuery.hasOwnProperty(removeFragment[i])) {
            delete newQuery[removeFragment[i]]
          }
        }
      }
      return newQuery
    },

    isDescendant(parent, child) {
      var node = child.parentNode;
      while (node != null) {
        if (node == parent) { return true; }
        node = node.parentNode;
      }
      return false;
    },

    doubleEscapeRegExp(str) {
      return str.replace(/[\"\-\[\]\/\{\}\(\)\*\+\?\.\\\^\$\|]/g, "\\\\$&");
    },
  },
}