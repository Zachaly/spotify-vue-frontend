<template>
    <section class="section">
        <div class="columns">
            <div class="column is-2">
                <figure class="image is-4by3">
                    <img :src="$file('musician', id)" :alt="musician.name" />
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
        <SongTable :songs="musician.topSongs" title="Popular" @set-song="emit"/>
    </section>

    <AlbumSection title="Popular albums" :albums="musician.topAlbums"/>
</template>

<script>
import axios from 'axios';
import AlbumSection from '../components/AlbumSection.vue';
import SongTable from '@/components/SongTable.vue';

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
        },
        emit(obj){
            this.$emit('set-song', obj)
        }
    },
    created() {
        this.getMusician();
    },
    components: { AlbumSection, SongTable },
    emits: ['set-song']
}
</script>
