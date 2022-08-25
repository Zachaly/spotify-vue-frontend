<template>
  <MusicianSection title="Most popular artists" :musicians='topMusicians'/>
  <MusicianSection title="Newest artists" :musicians="newMusicians"/>
  <AlbumSection title="Most popular albums" :albums="topAlbums"/>
  <AlbumSection title="Newest albums" :albums="newAlbums"/>
</template>

<script>
import axios from 'axios'
import MusicianSection from '../components/MusicianSection.vue'
import AlbumSection from '@/components/AlbumSection.vue';

export default {
    name: "HomeView",
    data() {
        return {
            musicians: [],
            albums: []
        };
    },
    methods: {
        getMusicians() {
            axios.get("/Anon/Musician").then(res => this.musicians = res.data)
            .catch(error => console.log(error))
        },
        getAlbums(){
          axios.get('Anon/Album').then(res => this.albums = res.data)
          .catch(error => console.log(error))
        },
        comparePlays(a, b){
          return b.plays - a.plays
        },
        compareAge(a, b){
          return b.id - a.id
        }
    },
    created() {
        this.getMusicians();
        this.getAlbums();
    },
    components: { MusicianSection, AlbumSection },
    computed: {
      topMusicians(){
        return this.musicians.slice(0).sort(this.comparePlays);
      },
      newMusicians(){
        return this.musicians.slice(0).sort(this.compareAge);
      },
      topAlbums(){
        return this.albums.slice(0).sort(this.comparePlays);
      },
      newAlbums(){
        return this.albums.slice(0).sort(this.compareAge);
      },
    }
}
</script>
