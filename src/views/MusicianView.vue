<template>
    <section class="section">
        <div class="columns">
            <div class="column is-2">
                <figure class="image is-4by3">
                    <img :src="image" :alt="musician.name" />
                </figure>
            </div>
            <div class="column">
                <h1 class="title">
                    {{musician.name}} 
                </h1>
                <h2 class="subtitle">
                    Followed by {{musician.numberOfFollowers}}
                </h2>
                <div class="content">
                    {{musician.description}}
                </div>
            </div>
        </div>
    </section>
    <section class="section">
        <table class="table is-striped is-fullwidth">
            <caption class="title">Popular</caption>
            <Song :index="index" :song="song" v-for="(song, index) in musician.topSongs" :key="song.id"/>
        </table>
    </section>

    <AlbumSection title="Popular albums" :albums="musician.topAlbums"/>
</template>

<script>
import axios from 'axios';
import AlbumSection from '../components/AlbumSection.vue';
import Song from '../components/Song.vue'

export default {
    props: {
        id: Number
    },
    data() {
        return {
            musician: {
                topSongs: [],
                topAlbums: [],
                name: "",
                description: "",
                numberOfFollowers: 0
            },
        };
    },
    methods: {
        getMusician() {
            return axios.get("/anon/musician/" + this.id)
                .then(res => {
                    this.musician = res.data

                    function comparePlays(a, b){
                        return b.plays - a.plays
                    }

                    this.musician.topAlbums.sort(comparePlays)
                    this.musician.topSongs.forEach(song => {
                        song.creatorId = this.id
                        song.creatorName = this.musician.name
                    })

                    this.musician.topAlbums.forEach(album => {
                        album.creatorId = this.id
                        album.creatorName = this.musician.name
                    })
                }).catch(error => console.log(error));
        }
    },
    created() {
        this.getMusician();
    },
    computed: {
        image() {
            return axios.defaults.baseURL + "file/musician/" + this.id;
        }
    },
    components: {  AlbumSection, Song }
}
</script>
