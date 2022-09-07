<template>
        <div class="columns mt-1">
        <div class="column is-2">
            <table class="table is-fullwidth">
                <caption class="title">Musicians</caption>
                <tr v-for="musician in musicians" :key="musician.id">
                    <td>{{musician.id}}</td>
                    <td @click="selectMusician(musician)">{{musician.name}}</td>
                </tr>
            </table>
        </div>
        <div class="column is-4" v-if="selectedMusician">
            <table class="table is-fullwidth">
                <caption class="title">Albums</caption>
                <tr v-for="(album, index) in selectedMusician.albums" :key="album.id">
                    <td>{{album.id}}</td>
                    <td><a>{{album.name}}</a></td>
                    <td>{{album.songCount}}</td>
                    <td>
                        <button class="button is-danger is-fullwidth" @click="deleteAlbum(album.id, index)">
                        Delete
                        </button>
                    </td>
                    <td>
                        <button class="button is-warning is-fullwidth" @click="selectAlbum(album, index)">
                            Update
                        </button>
                    </td>
                </tr>
            </table>

            <div class="columns">
                <div class="column is-half">
                    <div class="field">
                        <div class="control">
                            <input class="input" v-model="albumModel.name" />
                        </div>
                    </div>
                    <div class="field">
                        <div class="control">
                            <input class="input" type="file" @change="fileChange($event)" />
                        </div>
                    </div>
                </div>
                    
                <div class="column is-half">
                    <button class="button is-success" @click="addAlbum">Add new album</button>
                </div>
            </div>
        </div>

        <div class="column is-3" v-if="updatedAlbum">
            <p class="title">Update Album</p>
            <div class="columns">
                <div class="column is-half">
                    <div class="field">
                        <div class="control">
                            <input class="input" v-model="updatedAlbum.name" />
                        </div>
                    </div>
                </div>
                <div class="column is-half">
                    <button class="button is-warning" @click="updateAlbum">Update</button>
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
            loading: false,
            musicians: [],
            selectedMusician: null,
            albumModel: { musicianId: 0, name: "", fileName: "placeholder.jpg" },
            updatedAlbum: null,
            selectedAlbumIndex: 0,
            file: null,
            apiPath: ''
        }
    },
    mounted() {
        this.apiPath = `${this.$store.state.authorization.claim}/album/`
        this.getAlbums();
    },
    methods: {
        getAlbums() {
            this.loading = true;
            axios.get(this.apiPath).
                then(res => this.musicians = res.data).
                catch(error => console.log(error)).
                then(() => this.loading = false);
        },
        addAlbum() {
            this.loading = true;

            this.uploadFile().then(() => {
                axios.post(this.apiPath, this.albumModel).
                    then(res => this.selectedMusician.albums.push(res.data)).
                    catch(error => console.log(error)).
                    then(() => {
                        this.loading = false;
                        this.albumModel.name = "";
                    })
            })
            
        },
        selectMusician(musician) {
            this.selectedMusician = musician;
            this.albumModel.musicianId = musician.id;
            this.updatedAlbum = null;
        },
        deleteAlbum(id, index) {
            this.loading = true;
            axios.delete(this.apiPath + id).
                then(() => this.selectedMusician.albums.splice(index, 1)).
                catch(error => console.log(error)).
                then(() => this.loading = false)

            axios.delete('/RemoveFile/Album/' + id).catch(error => console.log(error));
        },
        selectAlbum(album, index) {
            this.updatedAlbum = {
                albumId: album.id,
                name: album.name
            };
            this.selectedAlbumIndex = index;
        },
        updateAlbum() {
            this.loading = true;
            axios.put(this.apiPath, this.updatedAlbum).
                then(res => this.selectedMusician.albums.splice(this.selectedAlbumIndex, 1, res.data)).
                catch(error => console.log(error)).
                then(() => {
                    this.loading = false;
                    this.updatedAlbum = null
                })
        },
        fileChange(event) {
            this.file = event.target.files[0];
        },
        uploadFile() {
            if(this.file == null){
                return axios.get('upload/placeholder').then(res => this.albumModel.fileName = res.data)
            }
            const formData = new FormData();
            formData.append('file', this.file);

            return axios.post('/upload/AlbumFile', formData, {
                headers: {
                    'Content-type': 'multipart/form-data'
                }
            }).then(res => {
                console.log(res);
                this.albumModel.fileName = res.data;
            })
        },
    },
}
</script>