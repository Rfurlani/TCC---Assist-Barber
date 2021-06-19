import Vue from "vue";
import Vuex from "vuex";

Vue.use(Vuex);

const store = new Vuex.Store({
	state: {

		usuario: JSON.parse(localStorage.getItem("usuario")),
		token: JSON.parse(localStorage.getItem("usuario"))
	},
});

export {
	store,
};