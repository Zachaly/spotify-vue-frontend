<template>
    <section class="section">
        <div class="columns">
            <div class="column is-4">
                <figure class="image is-4by3">
                    <img :src="$file('playlist', id)"/>
                </figure>
            </div>
            <div class="column has-text-left">
                <h1 class="title">
                    {{playlist.name}}
                    <button 
                    v-if="playlist.creatorId === this.$store.state.authorization.userId" 
                    class="button is-danger ml-5"
                    @click="remove">
                        Delete
                    </button>
                </h1>
                <h2 class="subtitle mt-2">
                    <router-link :to="{name: 'userprofile', params: {id: playlist.creatorId}}">
                        {{playlist.creatorName}}
                    </router-link>
                </h2>
                <h2 class="subtitle">{{playlist.songCount}}</h2>
            </div>
        </div>
    </section>
    <SongTable :songs="playlist.songs" @set-song="emit"/>
</template>

<script>
import axios from 'axios'
import SongTable from '@/components/SongTable.vue'

export default {
    props:{
        id: Number
    },
    components: { SongTable },
    data(){
        return {
            playlist: {
                name: '',
                creatorId: 0,
                creatorName: '',
                songCount: 0,
                songs: []
            }
        }
    },
    methods:{
        getPlaylist(){
            axios.get('anon/playlist/' + this.id)
            .then(res => this.playlist = res.data)
            .catch(error => console.log(error))
        },
        remove(){
            axios.delete('playlist/removePlaylist/' + this.id)
            .then(() => this.$router.push('/userprofile/' + this.playlist.creatorId))
            .catch(error => console.log(error))
        },
        emit(obj){
            this.$emit('set-song', obj)
        },
    },
    created(){
        this.getPlaylist()
    }
}
</script>