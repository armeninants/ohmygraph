<template>
  <div class="my-layout">
    <main-navigation></main-navigation>
    <router-view/>
  </div>
</template>


<script>
/**
 * @vue
 * @author Armen Inants <armen@inants.com>
 */
import MainNavigation from '@/components/MainNavigation'
import TheFooter from '@/components/TheFooter'

export default {
  components: {
    MainNavigation,
    TheFooter,
  },
}
</script>

<style lang="scss" scoped>
</style>
