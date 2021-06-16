import Vue from 'vue'
import Vuex from 'vuex'
import usuario from "./usuario"

Vue.use(Vuex);

export const store = new Vuex.Store({
modules:{

    usuario,
}
});



const actions = {},
const mutations = {},