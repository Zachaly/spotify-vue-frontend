<template>
    <div class="card">
        <router-link :to="{ name: 'album', params: { id: album.id } }">
            <div class="card-image">
                <figure class="image is-square">
                    <img :src="$file('album', album.id)" :alt="album.name">
                </figure>
            </div>
            <div class="card-content">
                <p class="title is-5 has-text-centered">
                    {{album.name}}
                </p>
                <p class="subtitle has-text-centered">
                    {{album.creatorName}}
                </p>
            </div>
        </router-link>
    </div>
</template>

<script>
export default {
    props:{
        album: Object
    },
}
</script>

<style scoped>
    .card{
        height: 100%;
    }
</style>