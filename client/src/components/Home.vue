<template>
  <div class="container-fluid my-home-page">
    <nav class="my-home-topnav">
      <a class="my-share-github" href="https://github.com/armeninants/ohmygraph" target="_blank" title="Fork me on GitHub">
        <i class="fa fa-code-fork fa-rotate-90" aria-hidden="true"></i>
      </a>
    </nav>
    <div class="my-home-content">
      <div class="my-logo-container">
        <img src="/static/images/logo.png" :alt="SITE_NAME" class="my-logo">
      </div>
      <ul class="nav nav-pills my-nav-central">
        <li role="presentation"><router-link :to="{ name: 'resource-browser' }">RDF browser</router-link></li>
        <li role="presentation"><router-link :to="{ name: 'query-browser' }">SPARQL client</router-link></li>
      </ul>
      <div class="my-screencast">
        <img src="/static/images/screencast1.gif">
      </div>
    </div>
  </div>
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

  data() {
    return {
      SITE_NAME: CONF.SITE_NAME,
    }
  },
}
</script>


<style lang="scss" scoped>
@import "../styles/variables";

.my-home-topnav {
}

.my-home-content {
  margin-top: 13%;
  margin-top: 13vh;
  text-align: center;
}

.my-logo-container {
}

@media (max-width: $screen-xs-min - 1) {
  .my-logo {
    width: 316px;
  }
}
@media (min-width: $screen-xs-min) and (max-width: $screen-xs-max) {
  .my-logo {
    width: 450px;
  }
}
@media (min-width: $screen-sm-min) {
  .my-logo {
    width: 602px;
  }
}

.my-nav-central {
  display: inline-block;
  float: none;
  margin-top: 30px;
  font-weight: bold;
  font-size: 20px;

  a, a:link, a:active, a:focus, a:hover {
    color: black;
  }
}

.my-screencast{
  margin-top: 7%;
  margin-top: 7vh;

  img {
    width: 600px;
    max-width: 90%;
    max-width: 90vw;
  }
}

.my-share-github {
  font-size: $font-size-h2;
  float: right;
  padding: 10px;
}
</style>
