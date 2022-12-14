import axios from "axios";

export default {
    // eslint-disable-next-line no-unused-vars
    install: (app, options) => {
        app.config.globalProperties.$file = (type, id) => {
            return `${axios.defaults.baseURL}File/${type}/${id}`
        }
    }
}