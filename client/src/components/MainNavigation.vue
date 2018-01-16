<template>
  <nav class="navbar navbar-default navbar-static-top">
    <div class="container-fluid">
      <div class="navbar-header">
        <button type="button" class="navbar-toggle collapsed" data-toggle="collapse" data-target="#app-navbar-collapse">
          <span class="sr-only">Toggle Navigation</span>
          <span class="icon-bar"></span>
          <span class="icon-bar"></span>
          <span class="icon-bar"></span>
        </button>
        <span class="visible-xs filter-menu"></span>
        <router-link :to="{ name: 'home' }" class="navbar-brand">
          <span class="my-logo"><span class="my-logo-color1">SemanticWeb</span><span class="my-logo-color2">.rockS</span> <span class="my-logo-sup">alpha</span></span>
        </router-link>
      </div>
      <div class="collapse navbar-collapse" id="app-navbar-collapse">
        <ul class="nav navbar-nav my-nav-main">
          <li><router-link :to="{ name: 'resource-browser' }">Browse</router-link></li>
          <li><router-link :to="{ name: 'query-browser' }">Query</router-link></li>
          <li><router-link :to="{ name: 'about' }">About</router-link></li>
        </ul>
        <social-buttons class="nav navbar-nav navbar-right"></social-buttons>
      </div>
    </div>
  </nav>
</template>


<script>
/**
 * @vue
 * @author Armen Inants <armen@inants.com>
 */
import SocialButtons from '@/components/SocialButtons'

export default {
  components: {
    SocialButtons,
  },
}
</script>

<style lang="scss" scoped>
.navbar {
  box-shadow: 0 0px 1px #888; 
  border: none;
  background: url('../assets/img-noise.png') 0 0 repeat;
}

.navbar-collapse.in, .navbar-collapse.collapsing {
  background: #fff;
}

.my-logo {
  font-size: 30px;
}

.my-nav-main {
  text-transform: lowercase;
  font-weight: 700;
  font-size: 18px;

  a {
    color: gray;

    &.active {
      color:  #000;
    }
  }
}
</style>
