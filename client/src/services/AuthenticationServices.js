import Api from '@/services/Api';

export default {
    register (credentials) {
        return Api().post('register', credentials);
    },
    getUsers () {
        return Api().get('users');
    },
    addUser (user) {
        return Api().post('add', user);
    },
    updateUser (user) {
        return Api().post('update', user);
    },
    deleteUser (user) {
        return Api().post('delete', user);
    }
}