<template>
  <div class="container my-contactus-page">
    <h1>Contact Us</h1>
 
    <p>Send an email to <a href="mailto:semanticweb.rocks@gmail.com">semanticweb.rocks@gmail.com</a> or leave a comment here.</p>

    <div class="form-group" :class="{'has-error': errorCondition('name') }">
      <input
        type="text"
        class="form-control"
        placeholder="Your name (optional)"
        name="name"
        v-model="name"
        v-validate="'max:30'"
        @blur="blurred('name')"
      >
      <p class="text-danger" v-if="errorCondition('name')">{{ errors.first('name') }}</p>
    </div>
    <div class="form-group" :class="{'has-error': errorCondition('msg') }">
      <textarea
        class="form-control"
        rows="5"
        placeholder="Your message"
        name="msg"
        v-model="msg"
        v-validate="'required|min:3|max:500'"
        @blur="blurred('msg')"
      ></textarea>
      <p class="text-danger" v-if="errorCondition('msg')">{{ errors.first('msg') }}</p>
    </div>
    <div class="form-group">
      <button
        class="btn btn-primary"
        :disabled="errors.any()"
        @click="validateBeforeSubmit"
      >Send</button>
    </div>
  </div>
</template>


<script>
/**
 * @vue
 * @author Armen Inants <armen@inants.com>
 */
import { focus } from 'vue-focus'
 
export default {
  directives: { focus },

  data() {
    return {
      name: '',
      msg: '',
      blurredOnce: {},
      submitAttempted: false,
    }
  },

  methods: {
    validateBeforeSubmit() {
      this.submitAttempted = true;
      this.$validator.validateAll()
        .then((result) => {
          if (result) {
            this.submitForm();
          } else {
            
          }
        });
    },

    submitForm() {
      this.$sendMsg({
        name: this.name,
        msg: this.msg,
      })
      .done(res => jQuery.notify(res.message, 'success'));
    },

    blurred(field) {
      this.blurredOnce[field] = true;
    },

    errorCondition(field) {
      return (this.blurredOnce.hasOwnProperty(field) || this.submitAttempted) && this.errors.has(field);
    },
  },
}
</script>


<style lang="scss" scoped>
</style>
