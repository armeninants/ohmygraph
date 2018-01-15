<template>
  <ul>
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
