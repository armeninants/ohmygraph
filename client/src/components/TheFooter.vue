<template>
  <footer class="container-fluid footer">
    <div class="row">
      <div class="col-xs-4">
        This work is licensed under <a href="https://raw.githubusercontent.com/armeninants/ohmygraph/master/LICENSE">Apache License 2.0</a>.
      </div>
      <div class="col-xs-4 text-center">
        <social-buttons class="list-inline my-footer-list"></social-buttons>
      </div>
      <div class="col-xs-4 my-footer-menu">
        <ul class="list-inline my-footer-list">
          <li><router-link :to="{ name: 'useful-links' }">useful links</router-link></li>
          <li><router-link :to="{ name: 'contributors' }">contributors</router-link></li>
          <li><router-link :to="{ name: 'contact-us' }">contact us</router-link></li>
        </ul>
      </div>
    </div>
  </footer>
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
.footer {
  position: absolute;
  right: 0;
  bottom: 0;
  left: 0;
  padding: 1rem;
  background-color: #efefef;
  color: #999;
}

.my-footer-menu {
  text-align: right;
}

a, a:link, a:active, a:focus, a:hover {
  color: #777;
}
</style>

<style lang="scss">
.my-footer-list {
  margin: 0;
}
</style>
