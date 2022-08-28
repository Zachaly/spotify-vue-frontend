<template>
    <div class="columns is-centered mt-1">
        <div class="column is-4">
            <div class="field">
                <label class="label">Username</label>
                <div class="control">
                    <input class="input" v-model="registerModel.username" placeholder="Username"/>
                    <span class="help is-warning" v-for="error in usernameErrors" :key="error">{{error}}</span>
                </div>
            </div>
            <div class="field">
                <label class="label">Email</label>
                <div class="control">
                    <input class="input" v-model="registerModel.email" placeholder="Email"/>
                    <span class="help is-warning" v-for="error in emailErrors" :key="error"> {{error}}</span>
                </div>
            </div>
            <div class="field">
                <label class="label">Password</label>
                <div class="control">
                    <input class="input" type="password" v-model="registerModel.password" placeholder="Password"/>
                    <span class="help is-warning" v-for="error in passwordErrors" :key="error">{{error}}</span>
                </div>
            </div>
            <div class="field">
                <label class="label">Confirm Password</label>
                <div class="control">
                    <input class="input" type="password" v-model="confirmPassword" placeholder="Confirm Password"/>
                    <span class="help is-warning" v-if="!passwordMatch">S</span>
                </div>
            </div>
            <div class="field ">
                <div class="control">
                    <button class="button is-success" @click="register">Register</button>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import axios from 'axios';

export default{
    data(){
        return{
            registerModel: {
                username: '',
                email: '',
                password: ''
            },
            confirmPassword: '',
            emailErrors: [],
            passwordErrors: [],
            usernameErrors: [],
            passwordMatch: true
        }
    },
    methods: {
        register(){
            if(!this.passwordMatch)
                return;

            axios.post('User/Register/', this.registerModel)
            .then(() => this.$router.push('/login')).
            catch(error => {
                this.usernameErrors = error.response.data.errors.Username;
                this.passwordErrors = error.response.data.errors.Password;
                this.emailErrors = error.response.data.errors.Email;
            })
        }
    }
}
</script>
