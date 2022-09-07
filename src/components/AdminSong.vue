<template>
    <div class="columns mt-1">
        <div class="column is-3">
            <table class="table is-fullwidth">
                <caption class="title">Albums</caption>
                <tr v-for="album in albums" :key="album.id">
                    <td>{{album.id}}</td>
                    <td>{{album.creatorName}}</td>
                    <td @click="selectAlbum(album)">{{album.name}}</td>
                </tr>
            </table>
        </div>
        <div class="column is-4" v-if="selectedAlbum">
            <table class="table is-fullwidth">
                <caption class="title">Songs</caption>
                <tr v-for="(song, index) in selectedAlbum.songs" :key="song.id">
                    <td>{{song.id}}</td>
                    <td>{{song.name}}</td>
                    <td>{{song.plays}}</td>
                    <td>
                        <button class="button is-warning is-fullwidth" @click="selectSong(song, index)">Update</button>
                    </td>
                    <td>
                        <button class="button is-danger is-fullwidth" @click="deleteSong(song.id, index)">Delete</button>
                    </td>
                </tr>
            </table>

            <div class="columns">
                <div class="column is-half">
                    <div class="field">
                        <div class="control">
                            <input class="input" v-model="songModel.name" />
                        </div>
                    </div>
                    <div class="field">
                        <div class="control">
                            <input class="input" type="file" @change="fileChange($event)" />
                        </div>
                    </div>
                </div>
                <div class="column is-half">
                    <button class="button is-success" @click="addSong">Add new</button>
                </div>
            </div>
        </div>

        <div class="column is-3" v-if="updatedSong">
            <p class="title">Update Song</p>
            <div class="columns">
                <div class="column is-half">
                    <div class="field">
                        <div class="control">
                            <input class="input" v-model="updatedSong.name" />
                        </div>
                    </div>
                </div>
                <div class="column is-half">
                    <button class="button is-warning" @click="updateSong">Update</button>
                </div>
            </div>
        </div>
    </div>   
</template>

<script>
import axios from 'axios';

export default {
    data() {
        return {
            editing: false,
            loading: false,
            albums: [],
            selectedAlbum: null,
            songModel: { name: "", albumId: 0, creatorId: 0, fileName: "" },
            updatedSong: null,
            songIndex: 0,
            file: null,
            apiPath: ''
        }
    },
    mounted() {
        this.apiPath = `${this.$store.state.authorization.claim}/song/`
        this.getSongs();
    },
    methods: {
        getSongs() {
            this.loading = true;
            axios.get(this.apiPath).
                then(res => this.albums = res.data).
                catch(error => console.log(error)).
                then(() => this.loading = false)
        },
        selectAlbum(album) {
            this.selectedAlbum = album;
            this.songModel.albumId = album.id;
            this.songModel.creatorId = album.creatorId;
            this.updatedSong = null;
        },
        addSong() {
            this.loading = true;

            if(this.file == null){
                this.loading = false;
                return;
            }

            this.uploadFile().then(() => {
                axios.post(this.apiPath, this.songModel).
                    then(res => this.selectedAlbum.songs.push(res.data)).
                    catch(error => console.log(error)).
                    then(() => {
                        this.loading = false;
                        this.songModel.name = "";
                    })
            });
        },
        uploadFile() {
            const formData = new FormData();
            formData.append('file', this.file);

            return axios.post('/upload/SongFile', formData, {
                headers: {
                    'Content-type': 'multipart/form-data'
                }
            }).then(res => {
                console.log(res);
                this.songModel.fileName = res.data;
            })
        },
        selectSong(song, index) {
            this.updatedSong = {
                id: song.id,
                name: song.name
            }
            this.songIndex = index;
        },
        updateSong() {
            this.loading = false;
            axios.put(this.apiPath, this.updatedSong).
                then(res => this.selectedAlbum.songs.splice(this.songIndex, 1, res.data)).
                catch(error => console.log(error)).
                then(() => {
                    this.loading = false;
                    this.updatedSong = null;
                })
        },
        deleteSong(id, index) {
            this.loading = false;
            axios.delete(this.apiPath + id).
                then(() => this.selectedAlbum.songs.splice(index, 1)).
                catch(error => console.log(error)).
                then(() => this.loading = false)

            axios.delete('/RemoveFile/Song/' + id).catch(error => console.log(error));
        },
        fileChange(event) {
            this.file = event.target.files[0];
        }
    }
}
</script>