<template>
    <tr>
        <td class="has-text-centered is-vcentered">
            {{index + 1}}
        </td>

        <td class="has-text-centered is-vcentered">
            <button class="button is-success" @click="this.$emit('set-song', index)">Play</button>
        </td>

        <td>
            <figure class="image is-48x48">
                <img :src="$file('album', song.albumId)" :alt="song.name" />
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

        <td class="has-text-centered is-vcentered" v-if="this.authorized">
            <button class="button is-danger" v-if="liked" @click="likeSong">Dislike</button>
            <button class="button is-success" v-else @click="likeSong">Like</button>
        </td>

        <td class="has-text-centered is-vcentered" v-if="this.authorized">
            <AddToPlaylist :songId="song.id"/>
        </td>
    </tr>
</template>

<script>
import axios from 'axios'
import AddToPlaylist from './AddToPlaylist.vue'
import { mapState } from 'vuex';

export default {
    name: "song-comp",
    props: {
        index: Number,
        song: Object
    },
    computed: mapState({
        authorized: state => state.authorization.authorized
    }),
    data() {
        return { liked: false };
    },
    created() {
        if (this.authorized) {
            axios.get("user/isSongLiked/" + this.song.id)
                .then(res => this.liked = res.data);
        }
    },
    emits: ["set-song"],
    methods: {
        likeSong() {
            axios.post("like/likesong/" + this.song.id).
                then(() => this.liked = !this.liked);
        },
    },
    components: { AddToPlaylist }
}
</script>