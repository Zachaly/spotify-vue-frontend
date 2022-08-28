<template>
    <section class="section">
        <div class="columns">
            <div class="column is-2">
                <figure class="image is-4by3">
                    <img :src="$image('profile', this.id)"/>
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
    
    <section class="section">
        <AlbumSection :albums="user.likedAlbums" title="Liked albums"/>
    </section>
    <section class="section">
        <MusicianSection title="Followed Musicians" :musicians="user.followedMusicians"/>
    </section>
</template>

<script>
import AlbumSection from '@/components/AlbumSection.vue';
import MusicianSection from '@/components/MusicianSection.vue';
import axios from 'axios';

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
                likedAlbums: []
            }
        };
    },
    components: { AlbumSection, MusicianSection },
    methods:{
        getUser(){
            axios.get('user/profile/' + this.id)
                .then(res => this.user = res.data)
        }
    },
    created(){
        this.getUser
    },
    computed: {
        image(){
            return axios.defaults.baseURL + 'File/Profile/' + this.id
        }
    }
}
</script>