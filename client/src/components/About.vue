<template>
  <div class="container my-usefullinks-page">
    <h1>
      About the project
    </h1>

    <h3>Vision</h3>
    <p>
      SemanticWeb.rocks aimes at making Linked Open Data easier to access and more usable for wider public, not necessarily familiar with such technologies as RDF, OWL or SPARQL.
      We envision it as an open platform where everybody can bring his/her expertise to create a universal tool for accessing Linked Open Data in a "smart" way.
    </p>

    <h3>How</h3>
    <p>
      The platform is written in JavaScript &mdash; the most popular web programming language.
      We use node.js on the back end and Vue.js on the front end as one of the best technologies for creating modern UI/UX.
      The source code is open and available under Apache License 2.0.
    </p>

    <h3>Who</h3>
    <p>
      SemanticWeb.rocks is created by <a href="http://armen.inants.com">Armen Inants</a>.
      UI/UX by <a href="https://www.upwork.com/o/profiles/users/_~01d60548106171fae6">Mery Jagityan</a>.
    </p>
    <p>
      Want to become a contributor?
      Fork the project, improve the code or add new features, and share!
    </p>
    <p>
      For any suggestion or feedback <router-link :to="{ name: 'contact-us' }">drop us a note</router-link>.
      All comments are much appreciated!
    </p>
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

</style>
