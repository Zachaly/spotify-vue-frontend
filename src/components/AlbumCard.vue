<template>
    <div class="card">
        <router-link to="/album" :id="album.id">
            <div class="card-image">
                <figure class="image is-square">
                    <img :src="image" :alt="album.name">
                </figure>
            </div>
            <div class="card-content">
                <p class="title is-5 has-text-centered">
                    {{album.name}}
                </p>
                <p class="subtitle has-text-centered">
                    {{album.creatorName}}
                </p>
            </div>
        </router-link>
    </div>
</template>

<script>
import axios from 'axios';

export default {
    props:{
        album: Object
    },
    computed: {
        image(){
            return axios.defaults.baseURL + 'File/Album/' + this.album.id
        }
    }
}
</script>

<style scoped>
    .card{
        height: 100%;
    }
</style>