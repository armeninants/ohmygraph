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
          <img src="/static/images/logo.png" :alt="SITE_NAME" class="my-logo">
        </router-link>
      </div>
      <div class="collapse navbar-collapse" id="app-navbar-collapse">
        <ul class="nav navbar-nav my-nav-main">
          <li><router-link :to="{ name: 'resource-browser' }">browse</router-link></li>
          <li><router-link :to="{ name: 'query-browser' }">query</router-link></li>
        </ul>
        <ul class="nav navbar-nav navbar-right">
          <li class="dropdown">
            <div class="my-lang-select-container">
              <language-selector></language-selector>
            </div>
          </li>
        </ul>
      </div>
    </div>
  </nav>
</template>


<script>
/**
 * @vue
 * @author Armen Inants <armen@inants.com>
 */
import LanguageSelector from '@/components/LanguageSelector'

export default {
  components: {
    LanguageSelector,
  },

  data() {
    return {
      SITE_NAME: CONF.SITE_NAME,
    }
  },
}
</script>

<style lang="scss" scoped>
@import "../styles/variables";

.navbar {
  box-shadow: 0 0px 1px #888; 
  border: none;
  background: url('../assets/img-noise.png') 0 0 repeat;
  font-size: 1.125rem;
}

.navbar-collapse.in, .navbar-collapse.collapsing {
  background: #fff;
}

$logo-padding-top: 7px;

.my-logo {
  height: $navbar-height - $logo-padding-top * 2;
}

.navbar-brand {
  padding: $logo-padding-top 15px;
}

.my-nav-main {
  font-weight: 700;
}

.my-lang-select-container {
  padding: ($navbar-height - $input-height-base)/2 $navbar-padding-horizontal;
}
</style>
