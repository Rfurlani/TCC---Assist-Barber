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
									<h2><b>Nome Cliente</b></h2>
								</div>
								<div>{{ agenda.agendaClienteId.usuarioId.nome }}</div>
							</v-flex>
							<v-flex xs3 sm4 md2>
								<div class="caption black--text">
									<h2><b>Data</b></h2>
								</div>
								<div>{{ agenda.dataHora }}</div>
							</v-flex>

							<v-flex xs3 sm4 md2>
								<div class="caption black--text">
									<h2><b>Endereço</b></h2>
								</div>
								<div>
									{{ agenda.endereco.cidade }}, {{ agenda.endereco.rua }},
									{{ agenda.endereco.bairro }}, Nº:{{
										agenda.endereco.numero
									}},{{ agenda.endereco.estado }}
								</div>
							</v-flex>
							<v-flex xs3 sm4 md2>
								<div class="caption black--text">
									<h2><b>Telefone</b></h2>
								</div>
								<div>
									<v-img
										@click="
											redirecionar(agenda.agendaClienteId.usuarioId.telefone)
										"
										max-height="25"
										max-width="25"
										contain
										src="https://cdn-icons-png.flaticon.com/512/220/220236.png"
									></v-img>
									{{ agenda.agendaClienteId.usuarioId.telefone }}
								</div>
							</v-flex>
							<v-flex xs3 sm4 md2>
								<div class="caption black--text">
									<h2><b>E-mail</b></h2>
								</div>
								<div>{{ agenda.agendaClienteId.usuarioId.email }}</div>
							</v-flex>
							<!-- <v-flex xs3 sm4 md2>
								<div class="caption black--text">
									<h2><b>Serviços</b></h2>
								</div>
								<ul v-for="agenda in agendamentos" :key="agenda._id">
									{{
										agenda.agendaClienteId.usuarioId.email
									}}
								</ul>
							</v-flex> -->

							<v-flex xs3 sm4 md2>
								<div class="caption black--text">
									<h2><b>Valor dos Serviços</b></h2>
								</div>
								<div>{{ agenda.total }}</div>
							</v-flex>
							<v-card-actions>
								<v-btn
									color="blue darken-3 white--text"
									class="dark"
									@click="finalizarAgendamento(agenda._id)"
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
			status: "",
		};
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
		redirecionar(tel) {
			console.log(tel);
			var newtel = tel.replace(/[^0-9]/g, "");
			const prefix = "55";
			var fullTel = prefix.concat(newtel);
			console.log(fullTel);
			window.location = `https://wa.me/${fullTel}`;
		},
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
							this.temporario[i].endereco = this.teste.endereco;
						})
						.catch((err) => {
							console.log(err.renponse.data.msg);
						});
				}
				console.log(this.temporario);
				this.$store.dispatch("passa_agendamentos", this.temporario);
			} catch (err) {
				alert.log(err.response.data.msg);
			}
		},
		cancelarAgendamento(idAgendamento) {
			this.status = "cancelado";
			http
				.patch(
					`/agenda-barbeiro/${this.idAgenda_barbeiro}/agendamento/${idAgendamento}/gerenciar-agendamento`,
					this.status,
					{
						headers: { Authorization: `Bearer ${this.token}` },
					}
				)
				.then((resposta) => {
					console.log(resposta);
					alert(resposta.data.msg);
				})
				.catch((err) => {
					alert(err.response.data.msg);
				});
		},
		finalizarAgendamento(idAgendamento) {
			this.status = "finalizado";
			http
				.patch(
					`/agenda-barbeiro/${this.idAgenda_barbeiro}/agendamento/${idAgendamento}/gerenciar-agendamento`,
					this.status,
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
