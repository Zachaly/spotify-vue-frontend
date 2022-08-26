<template>
    <table class="table is-fullwidth">
        <caption>
            <p class="title">
                {{album.name}}
            </p>
            <p class="subtitle">{{album.songCount}}</p>
        </caption>

        <Song :index="index" :song="song" v-for="(song, index) in album.songs" :key="song.id"/>
    </table>
</template>

<script>
import axios from 'axios';
import Song from '@/components/Song.vue';

export default {
    props: {
        id: Number
    },
    data() {
        return {
            album: null
        };
    },
    methods: {
        getAlbum() {
            axios.get("/anon/album/" + this.id)
                .then(res => this.album = res.data)
                .catch(error => console.log(error));
        }
    },
    created(){
        this.getAlbum();
    },
    components: { Song }
}
</script>