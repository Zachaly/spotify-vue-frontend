import axios from "axios";

export default {
    namespaced: true,
    state(){
        return{
            authorized: false,
            userId: '',
            claim: ''
        }
    },
    mutations: {
        changeUserId(state, id){
            state.userId = id
        },
        changeAuthorization(state, value){
            state.authorized = value
        },
        changeUserClaim(state, value){
            state.claim = value
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
                    
                    axios.get('user/claim').then(res => commit('changeUserClaim', res.data))
                });
        },
        logout({ commit }){
            commit('changeAuthorization', false);
            commit('changeUserId', '')
            commit('changeUserClaim', '')
            axios.defaults.headers.common.Authorization = ''
        }
    }
}