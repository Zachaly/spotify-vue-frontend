<template>
    <SongTable :title="album.name" :songs="album.songs" :subtitle="album.songCount" @set-song="emit"/>
</template>

<script>
import axios from 'axios';
import SongTable from '@/components/SongTable.vue';

export default {
    props: {
        id: Number
    },
    data() {
        return {
            album: {
                name: '',
                songCount: 0,
                songs: []
            }
        };
    },
    methods: {
        getAlbum() {
            axios.get("/anon/album/" + this.id)
                .then(res => this.album = res.data)
                .catch(error => console.log(error));
        },
        emit(obj){
            this.$emit('set-song', obj)
        }
    },
    created(){
        this.getAlbum();
    },
    components: { SongTable },
    emits: ['set-song']
}
</script>