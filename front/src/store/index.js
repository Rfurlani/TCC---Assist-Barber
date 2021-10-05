import Vue from "vue";
import Vuex from "vuex";
import createPersistedState from "vuex-persistedstate";

Vue.use(Vuex);

const store = new Vuex.Store({
	plugins: [createPersistedState()],
	state: {
		// usuario: JSON.parse(localStorage.getItem("usuario")),
		// token: JSON.parse(localStorage.getItem("usuario")),
		usuario: {},
		token: {},
		barbeiroId: {},
		servicos: {},
		cliente: {},
		usuario_cargo: {},
		busca_barbeiros: {},
		barbeiro_userId: {},
		idAgenda_barbeiro: {},
		idAgenda_cliente: {},
		agendamentos: {},
	},
	mutations: {
		add_token(state, payload) {
			state.token = payload;
		},
		add_usuario(state, payload) {
			state.usuario = payload;
		},
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
		add_agendamentos(state, payload) {
			state.agendamentos = payload;
		},
		add_usuario_cargo(state, payload) {
			state.usuario_cargo = payload;
		},
	},
	getters: {
		//retornar id do barbeiro somente usado na busca
		get_barbeiroId(state) {
			return state.barbeiroId;
		},
		get_token(state) {
			return state.token;
		},
		get_usuario(state) {
			return state.usuario;
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
		get_agendamentos(state) {
			return state.agendamentos;
		},
		get_usuario_cargo(state) {
			return state.usuario_cargo;
		},
	},
	actions: {
		passa_token(context, payload) {
			context.commit("add_token", payload);
		},
		passa_usuario(context, payload) {
			context.commit("add_usuario", payload);
		},
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
		passa_agendamentos(context, payload) {
			context.commit("add_agendamentos", payload);
		},
		passa_usuario_cargo(context, payload) {
			context.commit("add_usuario_cargo", payload);
		},
	},
	modules: {},
});

export { store };
