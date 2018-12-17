<template>
  <div class="table-responsive">
    <div class="user-table">
    <h1>User Management App</h1>
      <table class="table table-bordered">
        <thead>
            <tr>
                <th>User Information</th>
                <th>Action</th>
            </tr>
        </thead>
        <tbody>
            <tr  :key="user.user_id"
                 v-for="user in users"
                 @click="selectRow(user)">

                 <td>
                   <p class="user-full-name">
                     {{user.firstname}} {{ user.lastname}} | {{ user.age }} | {{ user.gender }} <br>
                      <span class="user-info"> 
                        {{user.email}} | {{ user.telephone }}
                      </span>
                   </p>
                 </td>
                 <td>
                   <span @click="showEditComponent()">Edit </span> |
                   <span @click="deleteRow(user)">Delete </span>
                 </td>
            </tr>
        </tbody>
    </table>
    </div>
  </div>
</template>

<script>
import AuthenticationServices from '@/services/AuthenticationServices'
export default {
  data() {
    return {
      users: [],
      selectedUserId: '',
    }
  },
  methods: {
    async getUsers() {
      const response = await AuthenticationServices.getUsers();
      this.users = response.data.allUser;
    },
    selectRow(userObj) {
      this.selectedUserId = userObj;
      this.$emit('selectedUserObj', userObj);
    },
    showEditComponent() {
      this.$emit('showEditUser', true);
      this.$emit('hideAddUser', false);
    },
    async deleteRow(user) {
        let confirmation = confirm("Are you sure you want to delete " + user.firstname + " " + user.lastname + "?");
        if (confirmation) {
          const response = await AuthenticationServices.deleteUser(user);
          if (response.data.status !== "200") {
              this.responseError = response.data.message;
              console.log(this.responseError);
          } else {
              this.$forceUpdate();
              alert(response.data.message);
          }
        }
    }
  },
  created() {
      this.getUsers();
  }
}
</script>
<style scoped>
.user-full-name {
  text-transform: capitalize;
  font-size: 15px;
}

.user-info {
  font-size: 12px;
}

.table {
  width: 440px;
}

</style>
