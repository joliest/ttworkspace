<template>
  <div>
    <h1>Register</h1>
    <input type="text" 
           placeholder="Email"
           v-model="email"> <br>
    <input type="text"
           placeholder="Password" 
          v-model="password"> <br>
    <button type="button" @click="register">Register</button>
  </div>
</template>

<script>
import AuthenticationServices from '@/services/AuthenticationServices'
export default {
  data() {
    return {
      email: '',
      password: ''
    }
  },
  methods: {
    async register() {
    const response = await AuthenticationServices.register({
      email: this.email,
      password: this.password
    });
    console.log(response.data);
    }
  }
}
</script>

<style>
</style>
