<template>
  <div id="app" class="app">
      <!-- <router-view/>  -->
      <div class="row">
        <div v-if="userListIsVisible" class="col-sm-4">
          
          <user-table @selectedUserObj = "selectedUserObj = $event"
                      @showEditUser = "editUserIsVisible = $event"
                      @hideAddUser = "addUserIsVisible = $event"></user-table>
                      
        <button type="button"
                class="btn btn-primary add-btn"
                @click="showAddUserComponent()">Add</button>
        </div>
        <div v-if="addUserIsVisible" class="col-sm-4">
          <add-user @hideAddUser = "addUserIsVisible = $event"></add-user>
        </div>
        <div v-if="editUserIsVisible" class="col-sm-4">
          <edit-user :userObj="selectedUserObj"
                     @hideEditUser = "editUserIsVisible = $event"></edit-user>
        </div>
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
      this.addUserIsVisible = true;
      this.editUserIsVisible = false;
    }
  }
}
</script>

<style>
.add-btn {
  width: 440px;
}
</style>
