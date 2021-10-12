<template>
	<v-container>
		<v-container mt-n2 mb-n3>
			<v-radio-group v-model="link" row>
				<v-spacer></v-spacer>
				<v-radio label="Relatórios" value="relatorio"></v-radio>
				<v-spacer></v-spacer>
				<v-radio label="Histórico" value="historico"> </v-radio>
				<v-spacer></v-spacer>
				<v-radio label="Solicitações" value="solicitacao"> </v-radio>
				<v-spacer></v-spacer>
			</v-radio-group>
		</v-container>

		<v-container>
			<component v-bind:is="link"></component>
		</v-container>
	</v-container>
</template>

<script>
import { http } from "../../services/config";
import solicitacao from "./itens_agenda/Solicitacoes/Solicitacoes.vue";
import historico from "./itens_agenda/Historico/Historico.vue";
import relatorio from "./itens_agenda/Relatorios/Relatorio.vue";
export default {
	name: "agenda_Barbeiro",
	data() {
		return {
			link: "solicitacao",
		};
	},
	components: {
		solicitacao,
		historico,
		relatorio,
	},
	mounted() {
		this.getAgenda();
	},
	computed: {
		idAgenda_barbeiro() {
			return this.$store.getters.get_idAgenda_barbeiro;
		},
		token() {
			return this.$store.getters.get_token;
		},
		agendamentos() {
			return this.$store.getters.get_agendamentos;
		},
	},
	methods: {
		getAgenda() {
			http
				.get(`/agenda-barbeiro/get-agendamento/61574a065be67f0cb02130d3`, {
					headers: { Authorization: `Bearer ${this.token}` },
				})
				.then((resposta) => {
					console.log(resposta);
				})
				.catch((err) => {
					console.log(err.message);
				});
		},
		// async getAgenda() {
		// 	try {
		// 		const temp = await http.get(`/agenda-barbeiro/get-agenda`, {
		// 			headers: { Authorization: `Bearer ${this.token}` },
		// 		});
		// 		this.temporario = temp.data.agenda.agendamentos;
		// 		console.log(this.temporario);

		// 		for (var i = 0; i < this.temporario.length; i++) {
		// 			await http
		// 				.get(`/agenda-barbeiro/get-agendamento/${this.temporario[i]._id}`, {
		// 					headers: { Authorization: `Bearer ${this.token}` },
		// 				})
		// 				.then((resposta) => {
		// 					this.teste = resposta.data.agendamento;
		// 					// console.log(this.teste);
		// 					this.temporario[i].dataHora = this.teste.dataHora;
		// 					this.temporario[i].total = this.teste.total;
		// 					this.temporario[i].status = this.teste.status;
		// 				})
		// 				.catch((err) => {
		// 					console.log(err.renponse.data.msg);
		// 				});
		// 		}
		// 		console.log(this.temporario);
		// 	} catch (error) {}
		// },
		// async getAgenda() {
		// 	try {
		// 		const temp = await http.get(`/agenda-barbeiro/get-agenda`, {
		// 			headers: { Authorization: `Bearer ${this.token}` },
		// 		});
		// 		// console.log(temp);
		// 		this.temporario = temp.data.agenda.agendamentos;
		// 		// console.log(this.temporario);

		// 		for (var i = 0; i < this.temporario.length; i++) {
		// 			await http
		// 				.get(`/agenda-barbeiro/get-agendamento/${this.temporario[i]._id}`, {
		// 					headers: { Authorization: `Bearer ${this.token}` },
		// 				})
		// 				.then((resposta) => {
		// 					this.teste = resposta.data.agendamento;
		// 					// console.log(this.teste);
		// 					this.temporario[i].dataHora = this.teste.dataHora;
		// 					this.temporario[i].total = this.teste.total;
		// 					this.temporario[i].status = this.teste.status;
		// 				})
		// 				.catch((err) => {
		// 					console.log(err.renponse.data.msg);
		// 				});
		// 		}
		// 		console.log(this.temporario);
		// 		this.$store.dispatch("passa_agendamentos", this.temporario);
		// 	} catch (err) {
		// 		alert(err.response.data.msg);
		// 	}
		// },
	},
};
</script>
