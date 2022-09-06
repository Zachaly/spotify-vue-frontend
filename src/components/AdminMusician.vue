<template>
    <div v-if="!editing">
        <table class="table">
            <tr>
                <th>Id</th>
                <th>Name</th>
                <th>Number of followers</th>
                <th>Number of songs</th>
                <th>Number of plays</th>
                <th></th>
                <th></th>
            </tr>
            <tr v-for="(musician, index) in musicians" :key="musician.id">
                <td>{{musician.id}}</td>
                <td>{{musician.name}}</td>
                <td>{{musician.numberOfFollowers}}</td>
                <td>{{musician.numberOfSongs}}</td>
                <td>{{musician.numberOfPlays}}</td>
                <td><button class="button is-warning" @click="editMusician(musician, index)">Edit</button></td>
                <td><button class="button is-danger" @click="deleteMusician(musician.id, index)">Delete</button></td>
            </tr>
        </table>

        <button @click="newMusician" class="button is-success">Add new</button>
    </div>

    <div v-else>
        <div class="field">
            <label class="label">Name</label>
            <div class="control">
                <input class="input" v-model="musicianModel.name" />
            </div>
        </div>
        <div class="field">
            <label class="label">Description</label>
            <div class="control">
                <input class="input" v-model="musicianModel.description" />
            </div>
        </div>
        
        <div class="field" v-if="musicianModel.id == 0">
            <div class="control">
                <input class="input" type="file" @change="fileChange($event)" />
            </div>
        </div>

        <button @click="addMusician" class="button is-success" v-if="musicianModel.id == 0">Add</button>
        <button @click="updateMusician" class="button is-success" v-else>Update</button>
        <button @click="editing = false" class="button is-danger ml-2">Cancel</button>
    </div>
</template>

<script>
import axios from "axios";

export default {
    data() {
        return {
            editing: false,
            loading: false,
            musicianIndex: 0,
            musicians: [],
            musicianModel: { id: 0, name: "", description: "", fileName: "placeholder.jpg" },
            file: null,
            claim: 'manager'
        }
    },
    mounted() {
        this.claim = this.$store.state.authorization.claim;
        this.getMusicians();
    },
    methods: {
        getMusicians() {
            this.loading = true;
            axios.get('/' + this.claim + '/musician').
                then(res => this.musicians = res.data).
                catch(error => console.log(error)).
                then(() => this.loading = false);
        },
        getMusicianForEdit(id) {
            this.loading = true;
            axios.get('/' + this.claim + '/musician/' + id).
                then(res => {
                    console.log(res);
                    this.musicianModel = {
                        id: res.data.id,
                        name: res.data.name,
                        description: res.data.description
                    }
                }).
                catch(error => console.log(error)).
                then(() => this.loading = false);
        },
        addMusician() {
            this.loading = true;
            this.uploadFile().then(() => {
                axios.post('/' + this.claim + '/musician', this.musicianModel).
                    then(res => {
                        this.musicians.push(res.data);
                        this.editing = false;
                    }).catch(error => console.log(error)).
                    then(() => this.loading = false)
            })
        },
        newMusician() {
            this.editing = true;
            this.musicianModel.id = 0;
            this.musicianModel.name = "";
            this.musicianModel.description = "";
            this.musicianModel.fileName = "placeholder.jpg"
        },
        editMusician(musician, index) {
            this.musicianIndex = index;
            this.getMusicianForEdit(musician.id);
            this.editing = true;
        },
        updateMusician() {
            this.loading = true;
            axios.put('/' + this.claim + '/musician', this.musicianModel).
                then(res => {
                    this.editing = false;
                    this.musicians.splice(this.musicianIndex, 1, res.data)
                }).
                catch(error => console.log(error)).
                then(() => this.loading = false);
        },
        deleteMusician(id, index) {
            axios.delete('/' + this.claim + '/musician/' + id).
                then(() => this.musicians.splice(index, 1)).
                catch(error => console.log(error)).
                then(() => this.loading = false);

            axios.delete('/RemoveFile/Musician/' + id).catch(error => console.log(error));
        },
        fileChange(event) {
            this.file = event.target.files[0];
        },
        uploadFile() {
            if(this.file == null){
                return axios.get('upload/placeholder').then(res => this.musicianModel.fileName = res.data)
            }

            const formData = new FormData();
            formData.append('file', this.file);

            return axios.post('/upload/MusicianFile', formData, {
                headers: {
                    'Content-type': 'multipart/form-data'
                }
            }).then(res => {
                this.musicianModel.fileName = res.data;
            })
        },
    }
}
</script>
