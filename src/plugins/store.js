import { createStore } from "vuex";
import authorization from "./store_modules/authorization";
import songs from './store_modules/songs'

export default createStore({
    modules:{
        authorization,
        songs
    }
})
