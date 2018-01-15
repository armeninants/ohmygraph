<template>
  <div id="app" class="my-app-wrapper">
    <router-view/>
    <the-footer></the-footer>
  </div>
</template>


<script>
/**
 * @vue
 * @author Armen Inants <armen@inants.com>
 */
import TheFooter from '@/components/TheFooter'

export default {
  name: 'app',

  components: {
    TheFooter,
  },
}
</script>

<style lang="scss">
@import "./styles/variables";

.my-app-wrapper {
  position: relative;
  padding-bottom: 6rem;
  min-height: 100%;
}
</style>
