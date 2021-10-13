<template>
	<v-col cols="9" md="9" sm="9">
		<v-card
			flat
			class="pl-8 pt-5 pb-5 mb-1"
			outlined
			v-for="agenda in finalizados"
			:key="agenda._id"
		>
			<v-layout row wrap class="pt-4 pr-4">
				<v-flex xs3 sm3 md3>
					<div class="caption black--text">
						<h2><b>Barbeiro</b></h2>
					</div>
					<div>{{ agenda.agendaBarbeiroId.usuarioId.nome }}</div>
				</v-flex>
				<v-flex xs3 sm3 md3>
					<div class="caption black--text">
						<h2><b>Contato</b></h2>
					</div>
					<div>{{ agenda.agendaBarbeiroId.usuarioId.email }}</div>
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
					<div>{{ agenda.agendaBarbeiroId.usuarioId.telefone }}</div>
				</v-flex>
				<!-- <div>
					<v-card-actions>
						<v-btn
							color="blue darken-2"
							@click="cancelarAgendamento(agenda._id)"
							>Cancelar</v-btn
						>
					</v-card-actions>
				</div> -->
			</v-layout>
		</v-card>
	</v-col>
</template>

<script>
import { http } from "../../../../../services/config";
export default {
	data() {
		name: "component_Agenda_finalizados";
		return {
			finalizados: {},
			status_c: { status: "finalizado" },
		};
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
	mounted() {
		this.getAgenda();
		this.finalizados = this.agendamentos.filter(function(retorno) {
			return retorno.status == "finalizado";
		});
	},
	methods: {
		cancelarAgendamento(servicoId) {
			http
				.patch(
					`/agenda-cliente/agendamento/${servicoId}/cancelar-agendamento`,
					this.status_c,
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
		async getAgenda() {
			try {
				const temp = await http.get(`/agenda-cliente/get-agenda`, {
					headers: { Authorization: `Bearer ${this.token}` },
				});
				// console.log(temp);
				this.temporario = temp.data.agenda.agendamentos;
				// console.log(this.temporario);

				for (var i = 0; i < this.temporario.length; i++) {
					await http
						.get(`/agenda-cliente/get-agendamento/${this.temporario[i]._id}`, {
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
			} catch (err) {
				alert(err.response.data.msg);
			}
		},
	},
};
</script>
