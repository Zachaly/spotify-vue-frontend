import { createStore } from "vuex";
import authorization from "./store_modules/authorization";

export default createStore({
    modules:{
        authorization,
    }
})
