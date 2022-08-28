<template>
    <div class="card">
        <router-link :to="{ name: 'musician', params: {id: musician.id}}" >
            <div class="card-image">
                <figure class="image is-square">
                    <img :src="$image('musician', musician.id)" :alt="musician.name">
                </figure>
            </div>
            <div class="card-content">
                <p class="title is-5 has-text-centered">
                    {{musician.name}}
                </p>
            </div>
        </router-link>
    </div>
</template>

<script>

export default {
    props: {
        musician: Object
    },
}
</script>

<style scoped>
    .card{
        height: 100%;
    }
</style>