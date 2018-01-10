<template>
  <div class="my-rdf-raw-container">
    <pre>{{ JSON.stringify(model,null,2) }}</pre>
  </div>
</template>

<script>
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

  computed: {
    boolResp() {
      return this.model.hasOwnProperty('boolean');
    }
  },

  data() {
    return {
    }
  },
}
</script>

<style>
.my-rdf-raw-container {
  padding-top: 15px;
}
</style>
