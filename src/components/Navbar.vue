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
                        <div class="buttons" v-if="authorization">
                            <button class="button is-danger" @click="logout">
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
    data(){
        return{
            authorization: false
        }
    },
    emits: ['logout']
}
</script>
