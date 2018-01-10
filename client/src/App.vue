<template>
  <div id="app" class="my-app-wrapper">
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
          <router-link :to="{ name: 'home' }" class="navbar-brand my-logo">SemanticWeb<span>.rockS</span></router-link>
        </div>
        <div class="collapse navbar-collapse" id="app-navbar-collapse">
          <ul class="nav navbar-nav my-nav-main">
            <li><router-link :to="{ name: 'query-browser' }">Query</router-link></li>
            <li><router-link :to="{ name: 'resource-browser' }">Browse</router-link></li>
            <li><router-link :to="{ name: 'about' }">About</router-link></li>
            <!-- <li class="dropdown">
              <a href="#" class="dropdown-toggle" data-toggle="dropdown" role="button" aria-haspopup="true" aria-expanded="false">useful links <span class="caret"></span></a>
              <ul class="dropdown-menu">
                <li><a href="http://jena.apache.org/tutorials/sparql.html">SPARQL tutorial</a></li>
              </ul>
            </li> -->
          </ul>
          <ul class="nav navbar-nav navbar-right">
            <li>
              <a :href="fbShareLink" class="my-share my-share-facebook" target="_blank"><i class="fa fa-lg fa-facebook" aria-hidden="true"></i></a>
            </li>
            <li>
              <a :href="twitterShareLink" class="my-share my-share-twitter" target="_blank"><i class="fa fa-lg fa-twitter" aria-hidden="true"></i></a>
            </li>
            <li>
              <a :href="linkedinShareLink" class="my-share my-share-linkedin" target="_blank"><i class="fa fa-lg fa-linkedin" aria-hidden="true"></i></a>
            </li>
            <li>
              <a :href="googleShareLink" class="my-share my-share-google-plus" target="_blank"><i class="fa fa-lg fa-google-plus" aria-hidden="true"></i></a>
            </li>
            <li>
              <a :href="mailShareLink" class="my-share my-share-mail" target="_blank"><i class="fa fa-lg fa-envelope" aria-hidden="true"></i></a>
            </li>
            <li>
              <a href="https://github.com/armeninants/semantic-browser" target="_blank" title="Fork Me On GitHub">
                <i class="fa fa-lg fa-code-fork" aria-hidden="true"></i>
              </a>
            </li>
          </ul>
        </div>
      </div>
    </nav>
    <router-view/>
    <div class="footer">
      <div class="container-fluid">
        <div class="col-sm-6">by <a href="http://armen.inants.com">ai</a></div>
        <div class="col-sm-6"></div>
      </div>
    </div>
  </div>
</template>


<script>
/**
 * @vue
 */
export default {
  name: 'app',

  computed: {
    fbShareLink() {
      return `http://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(location.href)}&title=${encodeURIComponent(document.title)}`;
    },
    twitterShareLink() {
      return `http://twitter.com/intent/tweet?status=${encodeURIComponent(document.title)}+${encodeURIComponent(location.href)}`;
    },
    linkedinShareLink() {
      return `http://www.linkedin.com/shareArticle?mini=true&url=${encodeURIComponent(location.href)}&title=${encodeURIComponent(document.title)}&source=${encodeURIComponent(location.origin)}`;
    },
    googleShareLink() {
      return `https://plus.google.com/share?url=${encodeURIComponent(location.href)}`;
    },
    mailShareLink() {
      return `mailto:?subject=${encodeURIComponent(document.title)}&body=${encodeURIComponent(location.href)}`;
    },
  },
}
</script>

<style lang="scss">
@import url('https://fonts.googleapis.com/css?family=Source+Code+Pro');
// @import url('https://fonts.googleapis.com/css?family=Anonymous+Pro:400,700');
@import url('https://fonts.googleapis.com/css?family=Open+Sans:400,700');
// @import url('https://fonts.googleapis.com/css?family=Cookie');


@font-face {
 font-family: "Covered By Your Grace";
 src: url("/static/fonts/Covered_By_Your_Grace/CoveredByYourGrace.ttf") format("truetype");
}

html {
  height: 100%;
  box-sizing: border-box;
}

body {
  height: 100%;
  // font-family: 'Source Code Pro', monospace;
  // font-family: 'Ubuntu Mono', monospace;
  font-family: 'Open Sans', monospace;
}

.my-app-wrapper {
  position: relative;
  padding-bottom: 6rem;
  min-height: 100%;
}

.footer {
  position: absolute;
  right: 0;
  bottom: 0;
  left: 0;
  padding: 1rem;
  background-color: #efefef;
}

.my-share-facebook:hover {
  color: #3B5998 !important;
}

.my-share-twitter:hover {
  color: #55ACEE !important;
}

.my-share-linkedin:hover {
  color: #0082CA !important;
}

.my-share-google-plus:hover {
  color: #DD4B39 !important;
}

.my-share-mail:hover {
  color: #4B515D !important;
}

.nav-tabs > li.active > a {
  &, &:active, &:hover, &:focus {
    background: url('assets/img-noise2.png') 0 0 repeat;
    border-color: transparent;
  }
}
.my-interface-container {
  background: url('assets/img-noise2.png') 0 0 repeat;
}

.nav-tabs {
  border: none;
}
</style>

<style lang="scss" scoped>
nav {
  background: url('assets/img-noise.png') 0 0 repeat;
  // background: #efefef;
  border: none;
}

.my-nav-main a {
  // &:hover {
  //   animation: shake 0.82s cubic-bezier(.36,.07,.19,.97) both;
  //   transform: translate3d(0, 0, 0);
  //   backface-visibility: hidden;
  //   perspective: 1000px;
  // }
  &:hover { 
    animation-name: shake;
    animation-duration: 0.2s;
    transform-origin:50% 50%;
    // animation-iteration-count: infinite;
    animation-timing-function: linear;
  }
}

.my-logo {
  font-size: 30px;

  &, &:link, &:active, &:focus, &:hover {
    color: #663399;
    // color: mix(#db2042, #663399, 0%);
  }
  & > span {
    color: #db2042;
  }
  // background: -webkit-linear-gradient(45deg, rebeccapurple,crimson);
  // -webkit-background-clip: text;
  // -webkit-text-fill-color: transparent;

  font-family: 'Covered By Your Grace', cursive;
  // font-family: 'Cookie', cursive;
}

.my-nav-main {
  text-transform: lowercase;
  font-weight: 700;
  font-size: 16px;

  a {
    color: gray;
  }
}

@keyframes shake {
  0% { transform: translate(3px, -3px) rotate(0deg); }
  33% { transform: translate(-2px, 2px) rotate(0deg); }
  66% { transform: translate(1px, -1px) rotate(0deg); }
  100% { transform: translate(0px, 0px) rotate(0deg); }
}
</style>
