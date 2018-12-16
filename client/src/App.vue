<template>
  <div id="app">
    
    <h1>User Management App</h1>
    <h6>By: Joliver Estampador</h6>

    <!-- <router-view/>  -->
    
    <div v-show="addUserIsVisible">
      <add-user></add-user>
    </div>
    <div v-show="editUserIsVisible">
      <edit-user :userObj="selectedUserObj"></edit-user>
    </div>
    <div v-show="userListIsVisible">
      <user-table @selectedUserObj = "selectedUserObj = $event"></user-table>
    </div>
    <div>
      <button type="button"
              @click="showAddUserComponent()">Add</button>
      <button type="button"
              @click="showEditUserComponent()">Edit</button>
      <button type="button"
              @click="deleteUser()">Delete</button>
    </div>
  </div>
</template>

<script>
import UserTable from '@/components/UserTable'
import AddUser from '@/components/AddUser'
import EditUser from '@/components/EditUser'
import AuthenticationServices from '@/services/AuthenticationServices'

export default {
  data() {
    return {
      addUserIsVisible: false,
      editUserIsVisible: false,
      userListIsVisible: true,
      selectedUserObj: ''
    }
  },
  components: {
    userTable: UserTable,
    addUser: AddUser,
    editUser: EditUser
  },
  methods: {
    async deleteUser() {
      let isTrue = confirm("Are you sure you want to delete " + this.selectedUserObj.firstname + " " + this.selectedUserObj.lastname + '?');
      if(isTrue) {
        console.log(this.selectedUserObj.user_id)
        const response = await AuthenticationServices.deleteUser(this.selectedUserObj);
        if (response.data.status !== "200") {
            this.responseError = response.data.message;
        } else {
          alert(response.data.message);
        }
      }
    },
    showAddUserComponent() {
    },
    showEditUserComponent() {
    }
  }
}
</script>

<style>
/* .add-user-position {
  position: absolute;
  top:10px;
  bottom: 0;
  left: 0;
  right: 0;
}  */
</style>
