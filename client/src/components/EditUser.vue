<template>
  <div class="container">
    <h1>Edit User</h1>
    <form>
        <div class="form-group">
            <label class="label-align-left" for="firstname">First Name</label>
            <input type="firstname" maxlength="50" class="form-control" v-model="userObj.firstname">
        </div>
        <div class="form-group">
            <label class="label-align-left" for="lastname">Last Name</label>
            <input type="lastname" maxlength="50" class="form-control" v-model="userObj.lastname">
        </div>
        <div class="form-group">
            <label class="label-align-left" for="email">Email Address</label>
            <input type="email" maxlength="50" class="form-control" v-model="userObj.email">
        </div>
        <div class="form-group">
            <label class="label-align-left" for="telephone">Contact Number</label>
            <input type="telephone" maxlength="20" class="form-control" v-model="userObj.telephone">
        </div>
        <div class="form-group">
            <label class="label-align-left" for="age">Age</label>
            <input type="text" maxlength="2" class="form-control" v-model.number="userObj.age">
        </div>

        <label class="label-align-left" for="gender">Gender</label> <br>
        <label class="radio-inline">
            <input type="radio" value="Male" v-model="userObj.gender"> Male
        </label>
        <label class="radio-inline">
            <input type="radio" value="Female" v-model="userObj.gender"> Female
        </label>
    </form>
    <p class="bg-danger">{{ responseError }}</p>
    <button type="button" class="btn primary" @click="save()">Save</button>
    <button type="button" class="btn primary" @click="cancel()">Cancel</button>
  </div>
</template>

<script>
import AuthenticationServices from '@/services/AuthenticationServices'
export default {
  data(){
    return {
      responseError: ''
    }
  },
  props: ['userObj'],
  methods: {
    async save() {
        const response = await AuthenticationServices.updateUser(this.userObj);
        if (response.data.status !== "200") {
            this.responseError = response.data.message;
            console.log(this.responseError);
        } else {
            this.$emit('hideEditUser', false);
            alert(response.data.message);
        }
    },
    cancel() {
      this.$emit('hideEditUser', false);
    }
  }
}
</script>

<style scoped>
div {
    text-align: left;
}

.container {
    width: 400px;
}

</style>
