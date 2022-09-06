<template>
    <nav class="navbar" role="navigation" aria-label="main-navigation">
        <div class="container">
            <div class="navbar-menu">
                <div class="navbar-start">
                    <router-link to="/" class="navbar-item">
                        Back to home page
                    </router-link>
                    <router-link to="/search" class="navbar-item">
                        Search
                    </router-link>
                </div>
                <div class="navbar-end">
                    <div class="navbar-item">
                        <div class="buttons" v-if="auth">
                            <router-link v-if="claim === 'Admin' || claim === 'Manager'" class="button is-warning" to="/admin">
                                Admin panel
                            </router-link>
                            <router-link v-if="userId" class="button" :to="{ name: 'userprofile', params: {id: userId}}">
                                Profile
                            </router-link>
                            <button class="button is-danger" @click="this.$store.dispatch('authorization/logout'); $router.push('/')" >
                                Logout
                            </button>
                        </div>
                        <div class="buttons" v-else>
                            <router-link to="/login" class="button is-info">
                                Login
                            </router-link>
                            <router-link to="/register" class="button is-primary">
                                Register
                            </router-link>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </nav>
</template>

<script>
import { mapState } from 'vuex';

export default {
    name: 'navbar-comp',
    computed: mapState({
        auth: state => state.authorization.authorized,
        userId: state => state.authorization.userId,
        claim: state => state.authorization.claim
    })
}
</script>
