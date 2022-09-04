<template>
    <div class="dropdown is-hoverable ">
        <div class="dropdown-trigger">
            <button class="button" aria-haspopup="true" aria-controls="dropdown-menu4">
                <span>Add to playlist</span>
            </button>
        </div>
        <div class="dropdown-menu" id="dropdown-menu" role="menu">
            <div class="dropdown-content">
                <div class="dropdown-item">
                    <div class="columns">
                        <div class="column" v-for="playlist in playlists" :key="playlist.id">
                            <button v-if="playlist.containsSong" class="button is-warning is-fullwidth" @click="removeSong(playlist)">
                                Remove from '{{playlist.name}}'
                            </button>
                            <button v-else class="button is-fullwidth" @click="addSong(playlist)">
                                {{playlist.name}}
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import axios from 'axios';

export default {
    props:{
        songId: Number
    },
    data(){
        return {
            playlists: []
        }
    },
    methods:{
        getPlaylists(){
            axios.get('anon/playlist/user/' + this.$store.state.authorization.userId)
            .then(res => {
                this.playlists = res.data
                this.playlists.forEach(
                    playlist => 
                    axios.get(`playlist/isSongInPlaylist/${playlist.id}/${this.songId}`)
                    .then(res => playlist.containsSong = res.data))
            })
        },
        addSong(playlist){
            console.log(playlist)
            axios.post(`playlist/addSong/${playlist.id}/${this.songId}`).then(() => playlist.containsSong = true)
        },
        removeSong(playlist){
            axios.delete(`playlist/removeSong/${playlist.id}/${this.songId}`).then(() => playlist.containsSong = false)
        }
    },
    created(){
        this.getPlaylists()
    }
}
</script>