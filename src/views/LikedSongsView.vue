<template>
    <SongTable title="Liked songs" :songs="songs" class="mt-2" @set-song="emit"/>
</template>

<script>
import SongTable from "@/components/SongTable.vue";
import axios from 'axios';

export default {
    props:{
        id: Number
    },
    components: { SongTable },
    data(){
        return {
            songs: []
        }
    },
    methods: {
        getData() {
            axios.get('user/userlikedsongs/' + this.id)
            .then(res => this.songs = res.data)
            .catch(error => console.log(error))
        },
        emit(obj){
            this.$emit('set-song', obj)
        }
    },
    created(){
        this.getData()
    },
    emits: ['set-song']
}

</script>