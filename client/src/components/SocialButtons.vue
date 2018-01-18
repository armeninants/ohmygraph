<template>
  <ul>
    <li>
      <a href="#" @click.prevent="fbShare" class="my-share my-share-facebook" target="_blank"><i class="fa fa-lg fa-facebook" aria-hidden="true"></i></a>
    </li>
    <li>
      <a href="#" @click.prevent="twitterShare" class="my-share my-share-twitter" target="_blank"><i class="fa fa-lg fa-twitter" aria-hidden="true"></i></a>
    </li>
    <li>
      <a href="#" @click.prevent="linkedinShare" class="my-share my-share-linkedin" target="_blank"><i class="fa fa-lg fa-linkedin" aria-hidden="true"></i></a>
    </li>
    <li>
      <a href="#" @click.prevent="googleShare" class="my-share my-share-google-plus" target="_blank"><i class="fa fa-lg fa-google-plus" aria-hidden="true"></i></a>
    </li>
    <li>
      <a :href="mailShareLink" class="my-share my-share-mail" target="_blank"><i class="fa fa-lg fa-envelope" aria-hidden="true"></i></a>
    </li>
    <li>
      <a class="my-share my-share-github" href="https://github.com/armeninants/semantic-browser" target="_blank" title="GitHub">
        <i class="fa fa-lg fa-github" aria-hidden="true"></i>
      </a>
    </li>
  </ul>
</template>


<script>
/**
 * @vue
 * @author Armen Inants <armen@inants.com>
 */
export default {
  computed: {
    mailShareLink() {
      return `mailto:?subject=${encodeURIComponent(document.title)}&body=${encodeURIComponent(location.href)}`;
    },
  },

  methods: {
    fbShare() {
      FB.ui({
        method: 'share',
        href: location.href,
        mobile_iframe: true,
      }, function(response){});
    },

    twitterShare() {
      const url = `http://twitter.com/intent/tweet?status=${encodeURIComponent(document.title)}+${encodeURIComponent(location.href)}`;
      const width = 550;
      const height = 450;
      this.popupCenter(url, 'shareOnTwitter', width, height);
    },

    linkedinShare() {
      const url = `http://www.linkedin.com/shareArticle?mini=true&url=${encodeURIComponent(location.href)}&title=${encodeURIComponent(document.title)}&source=${encodeURIComponent(location.origin)}`;
      const width = 520;
      const height = 570;

      this.popupCenter(url, 'shareOnLinkedIn', width, height);
    },

    googleShare() {
      const url = `https://plus.google.com/share?url=${encodeURIComponent(location.href)}`;
      const width = 410;
      const height = 598;
      this.popupCenter(url, 'shareOnLinkedIn', width, height);
    },

    popupCenter(url, popupName, w, h) {
      var dualScreenLeft = window.screenLeft != undefined ? window.screenLeft : screen.left;
      var dualScreenTop = window.screenTop != undefined ? window.screenTop : screen.top;

      var width = window.innerWidth ? window.innerWidth : document.documentElement.clientWidth ? document.documentElement.clientWidth : screen.width;
      var height = window.innerHeight ? window.innerHeight : document.documentElement.clientHeight ? document.documentElement.clientHeight : screen.height;

      var left = ((width / 2) - (w / 2)) + dualScreenLeft;
      var top = ((height / 2) - (h / 2)) + dualScreenTop;
      var newWindow = window.open(url, popupName, 'scrollbars=yes, width=' + w + ', height=' + h + ', top=' + top + ', left=' + left);

      // Puts focus on the newWindow
      if (window.focus) {
          newWindow.focus();
      }
    },
  },
}
</script>

<style lang="scss" scoped>
a, a:link, a:active, a:focus, a:hover {
  color: #777;
  background: none !important;
}

.my-share {
  float: left;
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

.my-share-github:hover {
  color: #000 !important;
}
</style>
