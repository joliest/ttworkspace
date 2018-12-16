<template>
  <div class="table-responsive">
    <table class="table table-bordered">
        <thead>
            <tr>
                <th>First Name</th>
                <th>Last Name</th>
                <th>Email</th>
                <th>Contact No.</th>
                <th>Gender</th>
                <th>Age</th>
            </tr>
        </thead>
        <tbody>
            <tr  :key="user.user_id"
                 v-for="user in users"
                 @click="selectRow(user)">
                <td> {{user.firstname}} </td>
                <td> {{user.lastname}} </td>
                <td> {{user.email}} </td>
                <td> {{user.telephone}} </td>
                <td> {{user.gender}} </td>
                <td> {{user.age}} </td>
            </tr>
        </tbody>
    </table>
  </div>
</template>

<script>
import AuthenticationServices from '@/services/AuthenticationServices'
export default {
  data() {
    return {
      users: [],
      selectedUserId: ''
    }
  },
  methods: {
    async getUsers() {
      const response = await AuthenticationServices.getUsers();
      this.users = response.data.allUser;
    },
    selectRow(userObj) {
      console.log(userObj);
      this.selectedUserId = userObj;
      this.$emit('selectedUserObj', userObj);
    }
  },
  created() {
      this.getUsers();
  }
}
</script>
