<template>
    <tr>
        <td class="has-text-centered is-vcentered">
            {{index + 1}}
        </td>

        <td>
            <figure class="image is-48x48">
                <img :src="image" :alt="song.name" />
            </figure>
        </td>

        <td class="has-text-centered is-vcentered">
            <router-link :to="{ name: 'album', params: { id: song.albumId } }">
                {{song.name}}
            </router-link>
        </td>

        <td class="has-text-centered is-vcentered">
            <router-link :to="{ name: 'musician', params: {id: song.creatorId}}">
                {{song.creatorName}}
            </router-link>
        </td>

        <td class="has-text-centered is-vcentered">
            {{song.plays}}
        </td>
    </tr>
</template>

<script>
import axios from 'axios'

export default {
    name: 'song-comp',
    props:{
        index: Number,
        song: Object
    },
    computed:{
        image(){
            return axios.defaults.baseURL + 'File/Album/' + this.song.albumId
        }
    }
}
</script>