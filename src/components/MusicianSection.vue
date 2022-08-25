<template>
    <section class="section">
        <h2 class="title">{{title}}</h2>
        <div class="columns mr-5 horizontal-bar">
            <div class="column is-2" :key="musician.id" v-for="musician in musicians">
                <MusicianCard :musician="musician"/>
            </div>
        </div>
    </section>
</template>

<script>
import MusicianCard from './MusicianCard.vue';

export default {
    props: {
        title: String,
        musicians: Array
    },
    components: { MusicianCard }
}
</script>
