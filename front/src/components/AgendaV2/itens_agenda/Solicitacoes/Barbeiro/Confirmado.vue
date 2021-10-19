<template>
	<v-col cols="9" md="9" sm="9">
		<v-card
			flat
			class="pl-8 pt-5 pb-5 mb-1"
			outlined
			v-for="agenda in confirmados"
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
						<h2><b>Data/Hora</b></h2>
					</div>
					<div>{{ agenda.dataHora }}</div>
				</v-flex>
				<v-flex xs3 sm3 md3>
					<div class="caption black--text">
						<h2><b>Telefone</b></h2>
					</div>
					<div>{{ agenda.agendaClienteId.usuarioId.telefone }}</div>
				</v-flex>
				<div class="d-flex">
					<span class="mt-3">Ações:</span>
					<v-card-actions>
						<v-btn
							color="error"
							class="ont-weight-light white--text"
							@click="cancelarAgendamento(agenda._id)"
							>Cancelar</v-btn
						>
						<v-btn
							color="blue darken-2"
							class="ont-weight-light white--text"
							@click="iniciarAtendimento(agenda.endereco)"
							>iniciar</v-btn
						>
						<v-btn
							color="blue darken-2"
							class="ont-weight-light white--text"
							@click="finalizarAtendimento(agenda._id)"
							>Finalizar</v-btn
						>
					</v-card-actions>
				</div>
			</v-layout>
		</v-card>
	</v-col>
</template>

<script>
import { http } from "../../../../../services/config";
export default {
	data() {
		name: "component_Agenda_confirmados";
		return {
			confirmados: {},
			status_a: { status: "confirmado" },
			status_c: { status: "cancelado" },
			status_f: { status: "finalizado" },
		};
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
	mounted() {
		this.getAgenda();
		this.confirmados = this.agendamentos.filter(function(retorno) {
			return retorno.status == "confirmado";
		});
		console.log(this.confirmados);
	},
	methods: {
		iniciarAtendimento(endereco) {
			window.open(
				`https://www.google.com/maps/dir/?api=1&destination=${endereco.rua}+${endereco.numero}`,
				"_blank"
			);
			console.log(endereco);
		},
		finalizarAtendimento(atendimentoId) {
			http
				.patch(
					`/agenda-barbeiro/${this.idAgenda_barbeiro}/agendamento/${atendimentoId}/finalizar-agendamento`,
					this.status_f,
					{ headers: { Authorization: `Bearer ${this.token}` } }
				)
				.then((resposta) => {
					console.log(resposta);
					alert("Agendamento Finalizado com sucesso");
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
							// console.log(this.teste);
							this.temporario[i].dataHora = this.teste.dataHora;
							this.temporario[i].total = this.teste.total;
							this.temporario[i].status = this.teste.status;
						})
						.catch((err) => {
							console.log(err.renponse.data.msg);
						});
				}
				console.log(this.temporario);
				this.$store.dispatch("passa_agendamentos", this.temporario);
			} catch (error) {
				alert(err.response.data.msg);
			}
		},
	},
};
</script>
