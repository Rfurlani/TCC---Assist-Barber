<template>
	<v-col cols="9" md="9" sm="9">
		<v-card
			flat
			class="pl-8 pt-5 pb-5 mb-1"
			outlined
			v-for="agenda in solicitados"
			:key="agenda._id"
		>
			<v-layout row wrap class="pt-4 pr-4">
				<v-flex xs3 sm3 md3>
					<div class="caption black--text">
						<h2><b>Cliente</b></h2>
					</div>
					<div>{{ agenda.agendaClienteId.usuarioId.nome }}</div>
				</v-flex>
				<v-flex xs3 sm3 md3>
					<div class="caption black--text">
						<h2><b>Contato</b></h2>
					</div>
					<div>{{ agenda.agendaClienteId.usuarioId.email }}</div>
				</v-flex>
				<v-flex xs3 sm3 md3>
					<div class="caption black--text">
						<h2><b>Data</b></h2>
					</div>
					<div>{{ agenda.dataHora.dia }}</div>
				</v-flex>
				<v-flex xs1 sm1 md1>
					<div class="caption black--text">
						<h2><b>Hora</b></h2>
					</div>
					<div>{{ agenda.dataHora.hora }}</div>
				</v-flex>
				<v-flex xs3 sm3 md3>
					<div class="caption black--text">
						<h2><b>Telefone</b></h2>
					</div>
					<div>{{ agenda.agendaClienteId.usuarioId.telefone }}</div>
				</v-flex>
				<div>
					<v-card-actions>
						<v-btn color="error" @click="cancelarAgendamento(agenda._id)"
							>Cancelar</v-btn
						>
						<v-btn color="blue" @click="aceitarAgendamento(agenda._id)"
							>Aceitar</v-btn
						>
					</v-card-actions>
				</div>
			</v-layout>
		</v-card>
		<v-card flat class="pl-8 pt-5 pb-5 mb-1" outlined v-if="this.retorno">
			<h2><b>Não ha a gendamentos a serem aceitos no momento</b></h2>
		</v-card>
	</v-col>
</template>

<script>
import { http } from "../../../../../services/config";
export default {
	data() {
		name: "component_Agenda_solicitados";
		return {
			solicitados: {},
			status_a: { status: "confirmado" },
			status_c: { status: "cancelado" },
			solicitados: {},
			tempo: { dia: "", hora: "" },
			retorno: false,
		};
	},
	computed: {
		idAgenda_barbeiro() {
			return this.$store.getters.get_idAgenda_barbeiro;
		},
		token() {
			return this.$store.getters.get_token;
		},
		// agendamentos() {
		// 	return this.$store.getters.get_agendamentos;
		// },
	},
	mounted() {
		this.getAgenda();
	},
	methods: {
		formataData(data) {
			var datePart = data.match(/\d+/g),
				year = datePart[0].substring(0, 4), // get only two digits
				month = datePart[1],
				day = datePart[2];

			return day + "/" + month + "/" + year;
		},
		aceitarAgendamento(atendimentoId) {
			http
				.patch(
					`/agenda-barbeiro/${this.idAgenda_barbeiro}/agendamento/${atendimentoId}/confirmar-agendamento`,
					this.status_a,
					{
						headers: { Authorization: `Bearer ${this.token}` },
					}
				)
				.then((resposta) => {
					console.log(resposta);
					this.getAgenda();
				})
				.catch((err) => {
					alert(err.response.data.msg);
					console.log(err.response.data);
				});
		},
		cancelarAgendamento(atendimentoId) {
			http
				.patch(
					`/agenda-barbeiro/${this.idAgenda_barbeiro}/agendamento/${atendimentoId}/cancelar-agendamento`,
					this.status_c,
					{
						headers: { Authorization: `Bearer ${this.token}` },
					}
				)
				.then((resposta) => {
					console.log(resposta);
					this.getAgenda();
				})
				.catch((err) => {
					alert(err.response.data.msg);
					console.log(err.response.data);
				});
		},
		async getAgenda() {
			try {
				const temp = await http.get(`/agenda-barbeiro/get-agenda`, {
					headers: { Authorization: `Bearer ${this.token}` },
				});
				this.temporario = temp.data.agenda.agendamentos;
				// console.log(this.temporario);

				for (var i = 0; i < this.temporario.length; i++) {
					await http
						.get(`/agenda-barbeiro/get-agendamento/${this.temporario[i]._id}`, {
							headers: { Authorization: `Bearer ${this.token}` },
						})
						.then((resposta) => {
							this.teste = resposta.data.agendamento;
							var tempData = this.teste.dataHora.substring(0, 10);
							this.tempo.dia = this.formataData(tempData);
							var tempHora = this.teste.dataHora.substring(11, 16);
							this.tempo.hora = tempHora;
							// console.log(this.teste);
							this.temporario[i].dataHora = this.tempo;
							this.temporario[i].total = this.teste.total;
							this.temporario[i].status = this.teste.status;
						})
						.catch((err) => {
							alert(err.renponse.data.msg);
							console.log(err.renponse.data.msg);
						});
				}
				this.solicitados = this.temporario.filter(function(retorno) {
					return retorno.status == "solicitacao";
				});
				if (this.solicitados.length == 0) {
					this.retorno = true;
				}
				console.log(this.solicitados);
			} catch (error) {
				alert(err.response.data.msg);
			}
		},
	},
};
</script>
