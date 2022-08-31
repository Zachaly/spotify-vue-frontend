<template>
    <section class="section">
        <h2 class="title">{{title}}</h2>
        <div class="columns mr-5 horizontal-bar">
            <div class="column is-2" :key="playlist.id" v-for="playlist in playlists">
                <PlaylistCard :playlist="playlist"/>
            </div>
        </div>
    </section>
</template>

<script>
import PlaylistCard from './PlaylistCard.vue';

export default{
    components: { PlaylistCard },
    props:{
        playlists: Array,
        title: String
    }
}
</script>