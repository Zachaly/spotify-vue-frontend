<template>
    <div class="sized">
        <div class="field">
            <label class="label">Playlist name</label>
            <div class="control">
                <input class="input" v-model="playlistModel.name" />
            </div>
        </div>
        
        <div class="field">
            <label class="label">Cover picture</label>
            <div class="control">
                <input class="input" type="file" @change="fileChange($event)" />
            </div>
        </div>

        <button class="button is-success" @click="addPlaylist">Add playlist</button>
        <button class="button is-warning ml-2" @click="$emit('cancel')">Cancel</button>
    </div>
</template>

<script>
import axios from 'axios';

export default {
    data(){
        return {
            playlistModel: {
                name: 'New playlist',
                coverPicture: null
            }
        }
    },
    methods:{
        fileChange(event){
            this.playlistModel.coverPicture = event.target.files[0]
        },
        addPlaylist(){
            const data = new FormData();

            data.append('coverPicture', this.playlistModel.coverPicture)
            data.append('name', this.playlistModel.name)

            axios.post('playlist/addplaylist', data, {
                headers: {
                    'Content-type': 'multipart/form-data'
                }
            })
            .then(res => this.$emit('add-playlist', res.data))
            .catch(error => console.log(error))
        }
    },
    emits: ['add-playlist', 'cancel']
}
</script>

<style scoped>
    .sized{
        height: 100px;
        width: 300px;
    }
</style>