<template>
    <table class="table is-fullwidth">
        <caption>
            <p class="title mb-2">
                {{title}}
            </p>
            <p v-if="subtitle" class="subtitle mt-2">{{subtitle}}</p>
        </caption>

        <Song :index="index" :song="song" v-for="(song, index) in songs" :key="song.id" @set-song="this.$emit('set-song', {index, songs})"/>
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
    
}
</script>