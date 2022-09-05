<template>
  <Navbar/>
  <div class="container">
    <router-view @set-song="setSong"/>
    <AudioBar ref="audio"/>
    <div style="height: 300px"></div>
  </div>
</template>

<script>
import Navbar from './components/Navbar.vue';
import AudioBar from './components/AudioBar.vue';

export default {
  components: { Navbar, AudioBar },
  methods: {
    setSong(){
      setTimeout(() => {
        this.$refs.audio.playSong()
      }, 100);
    },
  }
}
</script>