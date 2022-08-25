<template>
    <section class="section">
        <h2 class="title">{{title}}</h2>
        <div class="columns mr-5 horizontal-bar">
            <div class="column is-2" :key="album.id" v-for="album in albums">
                <AlbumCard :album="album"/>
            </div>
        </div>
    </section>
</template>

<script>
import AlbumCard from './AlbumCard.vue';

export default {
    props: {
        title: String,
        albums: Array
    },
    components: {  AlbumCard }
}
</script>