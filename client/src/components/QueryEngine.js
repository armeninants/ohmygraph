/**
 * @file A Vue.js plugin for executing SPARQL queries
 */

const QueryEngine = {
  install(Vue, options) {

    Vue.prototype.$sparqlGet = function(obj) {
      const url = `/proxy?endpoint=${encodeURIComponent(obj.endpoint)}&sparql=${encodeURIComponent(obj.sparql)}`
      this.$emit('busy')

      return jQuery.ajax({
        dataType: 'json',
        url: url,
      })
        .always(() => this.$emit('idle'))
        .fail((xhr, textStatus, errorThrown) => jQuery.notify(errorThrown, 'error'))
    }

    Vue.prototype.$sendMsg = function(data) {
      const url = `/contactus`

      return jQuery.ajax({
        method: 'POST',
        dataType: 'json',
        url: url,
        data: data,
      })
        .fail((xhr, textStatus, errorThrown) => jQuery.notify(errorThrown, 'error'))
    }

  },
}

export default QueryEngine
