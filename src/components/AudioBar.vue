<template>
    <section class="section audio-bar" v-if="this.songs.length > 0">
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
import { mapState } from 'vuex';

export default {
    data(){
        return {
            player: new Audio(),
            isPlaying: true
        }
    },
    computed:{
        ...mapState({
            songs: state => state.songs.songs,
            currentIndex: state => state.songs.currentIndex
        }),
        // using computed instead of getter bsc it is said in documentation that getters have some problems with reactivness
        currentSong(){
            return this.songs[this.currentIndex]
        },
    },
    methods: {
        nextSong(){
            this.$store.dispatch('songs/nextSong');
            
            this.playSong()
        },
        prevSong(){
            this.$store.dispatch('songs/prevSong');
            
            this.playSong()
        },
        playSong(){
            this.player.src = this.$file('song', this.currentSong.id) 
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