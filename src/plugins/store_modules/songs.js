export default {
    namespaced: true,
    state(){
        return {
            songs: [],
            currentIndex: 0
        }
    },
    mutations:{
        nextSong(state){
            if(state.currentIndex >= state.songs.length - 1)
                return;
            state.currentIndex++;
        },
        prevSong(state){
            if(state.currentIndex <= 0)
                return;
            
            state.currentIndex--;
        },
        setSongs(state, songsWithIndex){
            state.songs = songsWithIndex.songs;
            state.currentIndex = songsWithIndex.index
        }
    },
    actions:{
        changeSongs({commit}, songsWithIndex){
            commit('setSongs', songsWithIndex);
        },
        nextSong({commit}){
            commit('nextSong')
        },
        prevSong({commit}){
            commit('prevSong')
        }
    }
}