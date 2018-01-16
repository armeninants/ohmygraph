<template>
  <div class="container-fluid my-home-page">
    <div class="my-home-nav">
      <social-buttons class="nav nav-pills my-home-topnav"></social-buttons>
    </div>
    <div class="my-home-content">
      <div class="my-logo-container">
        <img src="../assets/logo.png" alt="SemanticWeb.rocks" class="my-logo">
      </div>
      <div class="my-motto">
        An <span class="my-m1">open collaborative effort</span> to unleash the <span class="my-m3">full potential</span> of <span class="my-m2">Linked Open Data</span>.
      </div>
      <ul class="nav nav-pills my-nav-central">
        <li role="presentation"><router-link :to="{ name: 'resource-browser' }">Browse</router-link></li>
        <li role="presentation"><router-link :to="{ name: 'query-browser' }">Query</router-link></li>
        <li role="presentation"><router-link :to="{ name: 'about' }">About</router-link></li>
      </ul>
      <div class="my-screencast">
        <img src="../assets/screencast1.gif">
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
}
</script>


<style lang="scss" scoped>
@import "../styles/variables";

.my-home-topnav {
  float: right;
  margin-right: -5px;
  margin-top: 10px;
}

.my-home-content {
  margin-top: 13%;
  margin-top: 13vh;
  text-align: center;

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
    text-transform: lowercase;
  }
}

.my-motto {
  color: $text-color;
  font-size: 18px;
  font-weight: 300;

  .my-m1, .my-m2, .my-m3 {
    // color: black;
    text-decoration: underline;
    // font-weight: bold;
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
</style>
