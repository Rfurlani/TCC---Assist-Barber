import Vue from "vue";
import Vuex from "vuex";
import createPersistedState from "vuex-persistedstate";

Vue.use(Vuex);

const store = new Vuex.Store({
	plugins: [createPersistedState()],
	state: {
		usuario: JSON.parse(localStorage.getItem("usuario")),
		token: JSON.parse(localStorage.getItem("usuario")),
		barbeiroId: "",
	},
	mutations: {
		//inserir id do barbeiro no barbeiroId
		add_barbeiroId(state, payload) {
			state.barbeiroId = payload;
		},
	},
	getters: {
		//retornar id do barbeiro somente usado na busca
		get_barbeiroId(state) {
			return state.barbeiroId;
		},
		get_token(state) {
			return state.usuario.data.token;
		},
		get_usuario(state) {
			return state.usuario.data.usuario.id;
		},
	},
	actions: {
		passa_id(context, payload) {
			context.commit("add_barbeiroId", payload);
		},
	},
	modules: {},
});

export { store };
