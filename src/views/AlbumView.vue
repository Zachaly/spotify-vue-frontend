<template>
    <section class="section has-text-centered">
        <p class="title mb-2">
            {{album.name}}
            <span class="ml-2" v-if="this.$store.state.authorization.authorized">
                <button class="button" @click="like" v-if="liked">Unlike</button>
                <button class="button" @click="like" v-else>Like</button>
            </span>
        </p>
        <p class="subtitle mt-2">{{album.songCount}} songs</p>
    </section>
    
    <SongTable :songs="album.songs" @set-song="emit"/>
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
            },
            liked: false
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
        },
        like(){
            axios.post('like/likealbum/' + this.id).then(() => this.liked = !this.liked)
        }
    },
    created(){
        this.getAlbum();
        if(this.$store.state.authorization.authorized){
            axios.get('user/isalbumliked/' + this.id).then(res => this.liked = res.data)
        }
    },
    components: { SongTable },
    emits: ['set-song']
}
</script>