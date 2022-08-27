<template>
    <section class="section audio-bar" v-if="songs.length > 0">
        <div class="p-4 main-div">
            <p class="title" id="audio-song-name">
                {{currentSong.name}}
                <span class="subtitle"> - {{currentSong.creatorName}}</span>
            </p>
            <div>
                <button class="button" @click="prevSong">Prev</button>
                <button class="button" @click="onPlayButtonClick">Play</button>
                <button class="button" @click="nextSong">Next</button>
            </div>
        </div>
    </section>
</template>

<script>
import axios from 'axios';

export default {
    props:{
        songs: Array,
    },
    data(){
        return {
            currentIndex: 0,
            player: new Audio(),
            isPlaying: true
        }
    },
    computed:{
        file(){
            return axios.defaults.baseURL + 'File/Song/' + this.currentSong.id
        },
        currentSong(){
            return this.songs[this.currentIndex]
        }
    },
    methods: {
        nextSong(){
            this.currentIndex++;
            if(this.currentIndex >= this.songs.length)
                this.currentIndex--;
            
            this.playSong()
        },
        prevSong(){
            this.currentIndex--;
             if(this.currentIndex < 0)
                this.currentIndex = 0
            
            this.playSong()
        },
        playSong(){
            this.player.src = this.file
            this.player.play();

            axios.post('User/AddPlay/' + this.currentSong.id)
        },
        onPlayButtonClick(){
            this.isPlaying = !this.isPlaying
            if(this.isPlaying)
                this.player.play();
            else
                this.player.pause();
        }
    },
}
</script>

<style scoped>
    .audio-bar{
        position: fixed;
        bottom: 0;
        width: 100%;
        max-width: 1360px;
    }
    .main-div{
        border-radius: 20px;
        background: rgb(55, 54, 54);
    }
</style>