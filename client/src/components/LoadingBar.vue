<template>
  <div style="height: 4px;"><div class="loader" v-show="loading"></div></div>
</template>

<script>
/**
 * @vue
 */
export default {
  props: {
    loading: {
      type: Boolean,
      default: false,
    },
  },
}
</script>

<style lang="scss" scoped>
.loader {
  height: 4px;
  width: 100%;
  position: relative;
  overflow: hidden;
  background-color: #ddd;

  &:before {
    display: block;
    position: absolute;
    content: "";
    left: -200px;
    width: 200px;
    height: 4px;
    background-color: mix(#db2042, #663399); //#663399;
    animation: loading 2s linear infinite;
  }
}

@keyframes loading {
    from {left: -200px; width: 30%;}
    50% {width: 30%;}
    70% {width: 70%;}
    80% { left: 50%;}
    95% {left: 120%;}
    to {left: 100%;}
}
</style>