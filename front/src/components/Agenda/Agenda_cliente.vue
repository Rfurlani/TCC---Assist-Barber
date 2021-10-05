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
									<h2><b>Barbeiro</b></h2>
								</div>
								<div>{{ agenda.agendaBarbeiroId.usuarioId.nome }}</div>
							</v-flex>
							<v-flex xs3 sm4 md2>
								<div class="caption black--text">
									<h2><b>Contato</b></h2>
								</div>
								<div>e-mail: {{ agenda.agendaBarbeiroId.usuarioId.email }}</div>
								<div>
									Tel.: {{ agenda.agendaBarbeiroId.usuarioId.telefone }}
								</div>
							</v-flex>
							<v-flex xs3 sm4 md2>
								<div class="caption black--text">
									<h2><b>Data</b></h2>
								</div>
								<div>{{ agenda }}</div>
							</v-flex>
							<v-flex xs3 sm4 md2>
								<div class="caption black--text">
									<h2><b>Hora</b></h2>
								</div>
								<div>{{ agenda }}</div>
							</v-flex>
							<v-flex xs3 sm4 md2>
								<div class="caption black--text">
									<h2><b>Telefone</b></h2>
								</div>
								<div>{{ agenda.telefone }}</div>
							</v-flex>
							<div>
								<v-card-actions>
									<v-btn color="error" @click="cancelarAgendamento(agenda._id)"
										>Cancelar</v-btn
									>
								</v-card-actions>
							</div>
						</v-layout>
					</v-card>
				</v-container>
			</div>
		</v-card>
	</v-container>
</template>

<script>
import { http } from "../../services/config";
export default {
	data() {
		return {
			cancelado: "cancelado",
			temporario: {},
		};
	},
	mounted() {
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
		async getAgenda() {
			try {
				const temp = await http.get(`/agenda-cliente/get-agenda`, {
					headers: { Authorization: `Bearer ${this.token}` },
				});
				console.log(temp);
				this.temporario = temp.data.agenda.agendamentos;
				console.log(this.temporario);

				for (var i = 0; i < this.temporario.length; i++) {
					await http
						.get(`/agenda-cliente/get-agendamento/${this.temporario[i]._id}`, {
							headers: { Authorization: `Bearer ${this.token}` },
						})
						.then((resposta) => {
							this.teste = resposta.data.agendamento;
							console.log(this.teste);
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
			} catch (err) {
				alert(err.response.data.msg);
			}
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
					alert(err.response.data.msg);
				});
		},
	},
};
</script>
