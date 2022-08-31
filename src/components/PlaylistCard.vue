<template>
<div class="card" >
    <router-link :to="{name: 'playlist', params: { id: playlist.id}}">
        <div class="card-image">
            <figure class="image is-square">
                <img :src="$file('playlist', playlist.id)" :alt="playlist.name">
            </figure>
        </div>
        <div class="card-content">
            <p class="title is-5 has-text-centered">
                {{playlist.name}}
            </p>
            <p class="subtitle has-text-centered">
                {{playlist.songCount}} Songs
            </p>
            <p class="subtitle has-text-centered">
                {{playlist.creatorName}}
            </p>
        </div>
    </router-link>
</div>
</template>

<script>
export default {
    props: {
        playlist: Object
    },
}
</script>

<style scoped>
    .card{
        height: 100%;
    }
</style>