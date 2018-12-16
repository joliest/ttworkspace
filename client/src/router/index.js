import Vue from 'vue'
import Router from 'vue-router'
import Register from '@/components/Register'
import UserTable from '@/components/UserTable'
import AddUser from '@/components/AddUser'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/users',
      name: 'User Table',
      component: UserTable
    },
    {
      path: '/register',
      name: 'register',
      component: Register
    },
    {
      path: '/addUser',
      name: 'Add User',
      component: AddUser
    }
  ]
})
