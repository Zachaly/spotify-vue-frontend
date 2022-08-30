<template>
    <div class="field">
        <div class="control">
            <input class="input is-fullwidth" v-model="search" />
        </div>
    </div>
    <div class="columns">
        <div class="column" v-if="musicians">
            <table class="table is-fullwidth">
                <caption class="title is-fullwidth">
                    Musicians
                </caption>
                <tr :key="musician.id" v-for="musician in musicians">
                    <td>
                        <figure class="image is-48x48">
                            <img :src="$file('musician', musician.id)" :alt="musician.name" />
                        </figure>
                    </td>
                    <td>
                        <router-link :to="{ name: 'musician', params: {id: musician.id}}">
                            {{musician.name}}
                        </router-link>
                    </td>
                </tr>
            </table>
        </div>
        <div class="column" v-if="users">
            <table class="table is-fullwidth">
                <caption class="title">
                    Users
                </caption>
                <tr :key="user.id" v-for="user in users">
                    <td>
                        <figure class="image is-48x48">
                            <img :src="$file('profile', user.id)" :alt="user.name" />
                        </figure>
                    </td>
                    <td>
                        <router-link :to="{name: 'userprofile', params: {id: user.id}}">
                            {{user.userName}}
                        </router-link>
                    </td>
                </tr>
            </table>
        </div>
        <div class="column" v-if="albums">
            <table class="table is-fullwidth">
                <caption class="title">
                    Albums
                </caption>
                <tr :key="album.id" v-for="album in albums">
                    <td>
                        <figure class="image is-48x48">
                            <img :src="$file('album', album.id)" :alt="album.name" />
                        </figure>
                    </td>
                    <td>
                        <router-link :to="{ name: 'album', params: { id: album.id } }">
                            {{album.name}}
                        </router-link>
                    </td>
                </tr>
            </table>
        </div>
        <div class="column" v-if="songs">
            <table class="table is-fullwidth">
                <caption class="title">
                    Songs
                </caption>
                <tr :key="song.id" v-for="song in songs">
                    <td>
                        <figure class="image is-48x48">
                            <img :src="$file('album', song.albumId)" :alt="song.name" />
                        </figure>
                    </td>
                    <td>
                        <router-link :to="{ name: 'album', params: { id: song.albumId } }">
                            {{song.name}}
                        </router-link>
                    </td>
                </tr>
            </table>
        </div>
        <div class="column" v-if="playlists">
            <table class="table is-fullwidth">
                <caption class="title">
                    Playlists
                </caption>
                <tr :key="playlist.id" v-for="playlist in playlists">
                    <td>
                        <figure class="image is-48x48">
                            <img :src="$file('playlist', playlist.id)" :alt="playlist.name" />
                        </figure>
                    </td>
                    <td>
                        <router-link to="/playlist" :id="playlist.id">
                            {{playlist.name}}
                        </router-link>
                    </td>
                </tr>
            </table>
        </div>
    </div>
</template>

<script>
import axios from 'axios';

export default {
    data() {
        return {
            users: [],
            musicians: [],
            albums: [],
            songs: [],
            playlists: [],
            search: "",
        }
    },
    methods: {
        getSearchInfo(search) {
            axios.get("/search/musicians/" + search).
                then(res =>this.musicians = res.data).
                catch(error => console.log(error));

            axios.get("/search/albums/" + search).
                then(res => this.albums = res.data).
                catch(error => console.log(error));

            axios.get("/search/songs/" + search).
                then(res => this.songs = res.data).
                catch(error => console.log(error));

            axios.get("/search/users/" + search).
                then(res => this.users = res.data).
                catch(error => console.log(error));

            axios.get("/search/playlists/" + search).
                then(res => this.playlists = res.data).
                catch(error => console.log(error));
        }
    },
    watch: {
        search() {
            if (this.search.length < 3) {
                this.users = [];
                this.musicians = [];
                this.albums = [];
                this.songs = [];
                this.playlists = [];
            } else {
                this.getSearchInfo(this.search.replace(" ", "%20"));
            }
        }
    }
}
</script>