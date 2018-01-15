<template>
  <div class="container-fluid footer">
    <div class="row">
        <div class="col-xs-8">
          This work is licensed under <a href="https://raw.githubusercontent.com/armeninants/ai-semantic-browser/master/LICENSE">Apache License 2.0</a>.
        </div>
        <div class="col-xs-4 my-footer-menu">
            <ul class="list-inline">
              <li><router-link :to="{ name: 'useful-links' }">useful links</router-link></li>
              <li><router-link :to="{ name: 'contact-us' }">contact us</router-link></li>
            </ul>
        </div>
    </div>
  </div>
</template>


<script>
/**
 * @vue
 * @author Armen Inants <armen@inants.com>
 */
export default {
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

.footer ul {
  margin: 0;
}

.my-footer-menu {
  text-align: right;
}

a, a:link, a:active, a:focus, a:hover {
  color: #777;
}
</style>
