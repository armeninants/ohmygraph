<script>
/**
 * @vue
 * @author Armen Inants <armen@inants.com>
 */
export default {
  mounted() {
    this.$on('requestForQuery', this.dispatchQuery);
  },

  methods: {
    getQuery() {
      console.error('You should implement a "getQuery" method in the extending component');
      return '';
    },

    dispatchQuery() {
      this.$emit('dispatchQuery', this.getQuery());
    },
  },
}
</script>