<template>
    <div class="card">
        <router-link :to="{ name: 'musician', params: {id: musician.id}}" >
            <div class="card-image">
                <figure class="image is-square">
                    <img :src="image" :alt="musician.name">
                </figure>
            </div>
            <div class="card-content">
                <p class="title is-5 has-text-centered">
                    {{musician.name}}
                </p>
            </div>
        </router-link>
    </div>
</template>

<script>
import axios from 'axios'

export default {
    props: {
        musician: Object
    },
    computed: {
        image(){
            return axios.defaults.baseURL + 'File/Musician/' + this.musician.id
        }
    }
}
</script>

<style scoped>
    .card{
        height: 100%;
    }
</style>