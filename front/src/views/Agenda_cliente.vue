<template>
	<v-container>
		<v-card class="elevation-15 mx-auto" width="95%">
			<v-card-title class="blue darken-4">
				<div>
					<span class="font-weight-light white--text">AGENDA</span>
				</div>
			</v-card-title>
			<div class="AgendaBarb">
				<h3 class="ml-3">Agendamentos Confirmado</h3>
				<v-container class="my-2">
					<v-card
						flat
						class="pl-8 pt-3 pb-4 mb-1"
						outlined
						v-for="agenda in agendamentos"
						:key="agenda._id"
					>
						<v-layout row wrap class="pt-4 pr-4">
							<v-flex xs3 sm4 md2>
								<div class="caption black--text">
									<h2><b>Nome</b></h2>
								</div>
								<div>{{ agenda.nome }}</div>
							</v-flex>
							<v-flex xs3 sm4 md2>
								<div class="caption black--text">
									<h2><b>Data</b></h2>
								</div>
								<div>{{ agenda.dataHora }}</div>
							</v-flex>
							<v-flex xs3 sm4 md2>
								<div class="caption black--text">
									<h2><b>Hora</b></h2>
								</div>
								<div>{{ agenda.hora }}</div>
							</v-flex>
							<v-flex xs3 sm4 md2>
								<div class="caption black--text">
									<h2><b>Endereço</b></h2>
								</div>
								<div>
									{{ agenda.endereco.cidade }}, {{ agenda.endereco.rua }},
									{{ agenda.endereco.bairro }}, {{ agenda.endereco.numero }}.
								</div>
							</v-flex>
							<v-flex xs3 sm4 md2>
								<div class="caption black--text">
									<h2><b>Telefone</b></h2>
								</div>
								<div>{{ agenda.telefone }}</div>
							</v-flex>
							<v-card-actions>
								<v-btn color="success" @click="finalizarAgendamento(agenda._id)"
									>Finalizar</v-btn
								>
								<v-btn color="error" @click="cancelarAgendamento(agenda._id)"
									>Cancelar</v-btn
								>
							</v-card-actions>
						</v-layout>
					</v-card>
				</v-container>
			</div>
		</v-card>
	</v-container>
</template>

<script>
import { http } from "../services/config";
export default {
	data() {
		return {
			finalizado: "finalizado",
			cancelado: "cancelado",
		};
	},
	mounted() {
		this.getAgenda();
	},
	updated() {
		this.getAgenda();
	},
	computed: {
		idAgenda_cliente() {
			return this.$store.getters.get_idAgenda_cliente;
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
				.get(`/agenda-cliente/get-agenda`, {
					headers: { Authorization: `Bearer ${this.token}` },
				})
				.then((resposta) => {
					this.agendamentos = resposta.data.agenda.agendamentos;
					this.$store.dispatch("passa_agendamentos", this.agendamentos);
					console.log(this.agendamentos);
				})
				.catch((err) => {
					console.log(err);
				});
		},
		solicitarCancelamento(idAgendamento) {
			http
				.patch(
					`/agenda-cliente/agendamento/${idAgendamento}/solicitiar-cancelamento`,
					this.cancelado,
					{
						headers: { Authorization: `Bearer ${this.token}` },
					}
				)
				.then((resposta) => {
					console.log(resposta);
				})
				.catch((err) => {
					console.log(err);
				});
		},
	},
};
</script>
