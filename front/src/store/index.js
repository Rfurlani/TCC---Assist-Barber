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
		servicos: "",
		cliente: "",
	},
	mutations: {
		//inserir id do barbeiro no barbeiroId
		add_barbeiroId(state, payload) {
			state.barbeiroId = payload;
		},
		add_servicos(state, payload) {
			state.servicos = payload;
		},
		add_cliente(state, payload) {
			state.cliente = payload;
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
		get_servicos(state) {
			return state.servicos;
		},
		get_cliente(state) {
			return state.cliente;
		},
	},
	actions: {
		passa_id(context, payload) {
			context.commit("add_barbeiroId", payload);
		},
		passa_servicos(context, payload) {
			context.commit("add_servicos", payload);
		},
		passa_cliente(context, payload) {
			context.commit("add_cliente", payload);
		},
	},
	modules: {},
});

export { store };
