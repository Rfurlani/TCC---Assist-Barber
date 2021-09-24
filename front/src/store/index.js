import Vue from "vue";
import Vuex from "vuex";
import createPersistedState from "vuex-persistedstate";

Vue.use(Vuex);

const store = new Vuex.Store({
	plugins: [createPersistedState()],
	state: {
		usuario: JSON.parse(localStorage.getItem("usuario")),
		token: JSON.parse(localStorage.getItem("usuario")),
		barbeiroId: {},
		servicos: {},
		cliente: {},
		busca_barbeiros: {},
		barbeiro_userId: {},
		idAgenda_barbeiro: {},
		idAgenda_cliente: {},
	},
	mutations: {
		//guardar as informaçoes basicas dos usuarios para mostrar depois
		add_barbeiroId(state, payload) {
			state.barbeiroId = payload;
		},
		add_servicos(state, payload) {
			state.servicos = payload;
		},
		add_cliente(state, payload) {
			state.cliente = payload;
		},
		//guarda barbeiro da pagina depesquisa de barbeiros
		add_busca_barbeiros(state, payload) {
			state.busca_barbeiros = payload;
		},
		//usado para pesquisar as informações do barbeiro na pagina de busca
		add_barbeiro_userId(state, payload) {
			state.barbeiro_userId = payload;
		},
		// usado para agendamento
		add_idAgenda_barbeiro(state, payload) {
			state.idAgenda_barbeiro = payload;
		},
		add_idAgenda_cliente(state, payload) {
			state.idAgenda_cliente = payload;
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
		get_busca_barbeiros(state) {
			return state.busca_barbeiros;
		},
		get_cliente_userId(state) {
			return state.cliente.data.cliente._id;
		},
		get_barbeiro_userId(state) {
			return state.barbeiro_userId;
		},
		get_idAgenda_barbeiro(state) {
			return state.idAgenda_barbeiro;
		},
		get_idAgenda_cliente(state) {
			return state.idAgenda_cliente;
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
		passa_busca_barbeiros(context, payload) {
			context.commit("add_busca_barbeiros", payload);
		},
		passa_barbeiro_userId(context, payload) {
			context.commit("add_barbeiro_userId", payload);
		},
		passa_idAgenda_cliente(context, payload) {
			context.commit("add_idAgenda_cliente", payload);
		},
		passa_idAgenda_barbeiro(context, payload) {
			context.commit("add_idAgenda_barbeiro", payload);
		},
	},
	modules: {},
});

export { store };
