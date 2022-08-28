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
                        <div class="buttons" v-if="this.$store.state.authorized">
                            <router-link v-if="this.$store.state.userId" class="button" :to="{ name: 'userprofile', params: {id: this.$store.state.userId}}">
                                Profile
                            </router-link>
                            <button class="button is-danger" @click="this.$store.dispatch('logout')" >
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
export default {
    name: 'navbar-comp',
}
</script>
