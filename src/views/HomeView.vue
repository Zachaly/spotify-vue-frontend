<template>
  <h1>Home</h1>
  <p :key="musician.id" v-for="musician in musicians">
    {{musician.name}}
  </p>
</template>

<script>
import axios from 'axios'

export default {
  name: 'HomeView',
  data(){
    return {
      musicians: []
    }
  },
  methods: {
    getMusicians(){
      axios.get('/Anon/Musician').then(res => this.musicians = res.data)
    }
  },
  created(){
    this.getMusicians();
  }
}
</script>
