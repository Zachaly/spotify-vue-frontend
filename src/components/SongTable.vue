<template>
    <table class="table is-fullwidth">
        <caption>
            <p class="title mb-2">
                {{title}}
            </p>
            <p v-if="subtitle" class="subtitle mt-2">{{subtitle}}</p>
        </caption>

        <Song :index="index" :song="song" v-for="(song, index) in songs" :key="song.id" @set-song="setSong"/>
    </table>
</template>

<script>
import Song from './Song.vue';

export default {
    props: {
        songs: Array,
        title: String,
        subtitle: String
    },
    components: { Song },
    emits: ['set-song'],
    methods:{
        setSong(index){
            this.$store.dispatch('songs/changeSongs', { index: index, songs: this.songs })
            this.$emit('set-song')
        }
    }
}
</script>