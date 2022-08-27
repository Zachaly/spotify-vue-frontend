<template>
<div class="columns is-centered mt-1">
    <div class="column is-4">
        <div class="field">
            <label class="label">Email</label>
            <div class="control">
                <input class="input" v-model="credentials.email" placeholder="Email"/>
                <span class="help is-warning" v-if="error">{{error}}</span>
            </div>
        </div>
        <div class="field">
            <label class="label">Password</label>
            <div class="control">
                <input class="input" type="password" v-model="credentials.password" placeholder="Password"/>
            </div>
        </div>
        <div class="field is-centered">
            <div class="control">
                <button class="button is-success" @click="login">Login</button>
            </div>
        </div>
    </div>
</div>
</template>

<script>
import axios from 'axios';

export default {
    data(){
        return {
            credentials: {
                email: "",
                password: ""
            },
            error: null
        }
    },
    methods: {
        login(){
            axios.post('User/Login/' + this.credentials.email + '/' + this.credentials.password)
            .then(res => {
                axios.defaults.headers.common.Authorization = 'Bearer ' + res.data.auth_token
                this.$emit('authorize');
            }).then(() => this.$router.push('/'))
            .catch(error => this.error = error.response.data)
        }
    },
    emits: ['authorize']
}
</script>