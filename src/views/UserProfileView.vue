<template>
    <section class="section">
        <div class="columns">
            <div class="column is-2">
                <figure class="image is-4by3">
                    <img :src="$file('profile', this.id)"/>
                </figure>
            </div>
            <div class="column">
                <h1 class="title">
                    {{user.name}}
                </h1>
                <h2 class="subtitle">
                    Liked Albums: {{user.likedAlbums.length}} <br />
                    Followed Musicians: {{user.followedMusicians.length}} <br />
                    Liked Songs: {{user.likedSongsCount}} 
                </h2>
            </div>
        </div>
    </section>
    
    <AlbumSection :albums="user.likedAlbums" title="Liked albums"/>
    <MusicianSection title="Followed Musicians" :musicians="user.followedMusicians"/>
    <PlaylistSection title="User playlists" :playlists="user.playlists"/>
    
    <section class="section">
        <button v-if="id === this.$store.state.authorization.userId && !addingPlaylist" class="button is-success" @click="addingPlaylist = true">Add new playlist</button>
        
        <AddPlaylist v-if="addingPlaylist" @cancel="addingPlaylist = false" @add-playlist="addPlaylist"/>
    </section>
</template>

<script>
import AlbumSection from '@/components/AlbumSection.vue';
import MusicianSection from '@/components/MusicianSection.vue';
import axios from 'axios';
import PlaylistSection from '@/components/PlaylistSection.vue';
import AddPlaylist from '../components/AddPlaylist.vue'

export default{
    props:{
        id: String
    },
    data() {
        return {
            user: {
                name: "",
                id: "",
                likedSongsCount: 0,
                followedMusicians: [],
                likedAlbums: [],
                playlists: []
            },
            addingPlaylist: false
        };
    },
    components: { AlbumSection, MusicianSection, PlaylistSection, AddPlaylist },
    methods: {
        getUser(){
            axios.get('user/profile/' + this.id)
                .then(res => 
                { 
                    this.user = res.data
                    axios.get('anon/playlist/user/' + this.id)
                    .then(res => this.user.playlists = res.data)
                }).catch(error => console.log(error))
        },
        addPlaylist(playlist){
            this.user.playlists.push(playlist)
            this.addingPlaylist = false;
        }
    },
    created(){
        this.getUser()
    },
}
</script>