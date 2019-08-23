import Vue from 'vue'
import Vuex from 'vuex'
import app from './modules/app'
import errorLog from './modules/errorLog'
import permission from './modules/permission'
import tagsView from './modules/tagsView'
import user from './modules/user'
import socketData from './modules/socketData'
import getters from './getters'

Vue.use(Vuex);

const store = new Vuex.Store({
    modules: {
        app,
        errorLog,
        permission,
        tagsView,
        user,
        socketData
    },
    getters
})

export default store
