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
                    <span class="ml-2" v-if="this.$store.state.authorization.authorized">
                        <button class="button" @click="follow" v-if="followed">Unfollow</button>
                        <button class="button" @click="follow" v-else>Follow</button>
                    </span>
                </h1>
                <h2 class="subtitle">
                    Followed by {{musician.numberOfFollowers}} people
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
            followed: false
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
        },
        follow(){
            axios.post('like/followmusician/' + this.id).then(() => this.followed = !this.followed)
        }
    },
    created() {
        this.getMusician();

        if(this.$store.state.authorization.authorized){
            axios.get('user/ismusicianfollowed/' + this.id).then(res => this.followed = res.data)
        }
    },
    components: { AlbumSection, SongTable },
    emits: ['set-song']
}
</script>
