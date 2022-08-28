import axios from "axios";
import { createStore } from "vuex";

export default createStore({
    state(){
        return{
            authorized: false,
            userId: ''
        }
    },
    mutations: {
        changeUserId(state, id){
            state.userId = id
        },
        changeAuthorization(state, value){
            state.authorized = value
        }
    },
    actions: {
        login({ commit }, credentials){
            return axios.post(`User/Login/${credentials.email}/${credentials.password}`)
                .then(res => {
                    axios.defaults.headers.common.Authorization = 'Bearer ' + res.data.auth_token
                    commit('changeAuthorization', true)
                    axios.get('user/id')
                        .then(res => commit('changeUserId', res.data));
                });
        },
        logout({commit}){
            commit('changeAuthorization', false);
            commit('changeUserId', '')
            axios.defaults.headers.common.Authorization = ''
        }
    }
})