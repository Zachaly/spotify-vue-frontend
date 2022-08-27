<template>
  <Navbar ref="navbar" />
  <div class="container">
    <router-view @set-song="setSongs" @authorize="authorize"/>
    <AudioBar ref="audio" :songs="songs"/>
    <div style="height: 200px"></div>
  </div>
  
</template>

<script>
import Navbar from './components/Navbar.vue';
import AudioBar from './components/AudioBar.vue';
import axios from 'axios';

export default {
  components: { Navbar, AudioBar },
  data(){
    return{
      songs: [],
      songIndex: 0
    }
  },
  methods: {
    setSongs(obj){
      this.songs = obj.songs;
      this.$refs.audio.currentIndex = obj.index;
      setTimeout(() => {
        this.$refs.audio.playSong()
      }, 100);
    },
    authorize(){
      this.$refs.navbar.authorization = true;
    },
    logout(){
      this.$refs.navbar.authorization = false;
      axios.defaults.headers.common.Authorization = ''
    }
  }
}
</script>