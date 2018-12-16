<template>
  <div class="container">
    <h1>Add User</h1>
    <form>
        <div class="form-group">
            <label class="label-align-left" for="firstname">First Name</label>
            <input type="firstname" maxlength="50" class="form-control" v-model="user.firstname">
        </div>
        <div class="form-group">
            <label class="label-align-left" for="lastname">Last Name</label>
            <input type="lastname" maxlength="50" class="form-control" v-model="user.lastname">
        </div>
        <div class="form-group">
            <label class="label-align-left" for="email">Email Address</label>
            <input type="email" maxlength="50" class="form-control" v-model="user.email">
        </div>
        <div class="form-group">
            <label class="label-align-left" for="telephone">Contact Number</label>
            <input type="telephone" maxlength="20" class="form-control" v-model="user.telephone">
        </div>
        <div class="form-group">
            <label class="label-align-left" for="age">Age</label>
            <input type="text" maxlength="2" class="form-control" v-model.number="user.age">
        </div>

        <label class="label-align-left" for="gender">Gender</label> <br>
        <label class="radio-inline">
            <input type="radio" value="Male" v-model="user.gender"> Male
        </label>
        <label class="radio-inline">
            <input type="radio" value="Female" v-model="user.gender"> Female
        </label>
    </form>
    <p class="bg-danger">{{ responseError }}</p>
    <button type="button" class="btn primary" @click="add()">Add</button>
    <button type="button" class="btn primary">Cancel</button>
  </div>
</template>

<script>
import AuthenticationServices from '@/services/AuthenticationServices'
export default {
  data(){
    return {
      user: {
          firstname: '',
          lastname: '',
          email: '',
          contact: '',
          age: '',
          gender: ''
      },
      responseError: ''
    }
  },
  methods: {
    async add() {
        const response = await AuthenticationServices.addUser(this.user);
        if (response.data.status !== "200") {
            this.responseError = response.data.message;
        } else {
            alert(response.data.message);
        }
    }
  }
}
</script>

<style scoped>
div {
    text-align: left;
}
</style>
