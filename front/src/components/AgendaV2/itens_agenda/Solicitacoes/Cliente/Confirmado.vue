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
						<h2><b>Barbeiro</b></h2>
					</div>
					<div>{{ agenda.agendaBarbeiroId.usuarioId.nome }}</div>
				</v-flex>
				<v-flex xs5 sm5 md5>
					<div class="caption black--text">
						<h2><b>Contato</b></h2>
					</div>
					<div>{{ agenda.agendaBarbeiroId.usuarioId.email }}</div>
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
					<div>{{ agenda.agendaBarbeiroId.usuarioId.telefone }}</div>
				</v-flex>

				<v-flex xs12 sm12 md12>
					<v-card-actions>
						<span class="mt-1 mr-3">Ações:</span>
						<v-btn color="error" @click="cancelarAgendamento(agenda._id)"
							>Cancelar</v-btn
						>
						<v-tooltip bottom>
							<template v-slot:activator="{ on, attrs }">
								<v-img
									class="ml-4 mb-2"
									@click="
										redirecionar(agenda.agendaBarbeiroId.usuarioId.telefone)
									"
									max-height="50"
									max-width="50"
									contain
									color="primary"
									v-bind="attrs"
									v-on="on"
									src="https://cdn-icons-png.flaticon.com/512/220/220236.png"
								></v-img>
							</template>
							<span>Fale com o Barbeiro</span>
						</v-tooltip>
					</v-card-actions>
				</v-flex>
			</v-layout>
		</v-card>
		<v-card flat class="pl-8 pt-5 pb-5 mb-1" outlined v-if="this.retorno">
			<h2><b>Não ha a solicitações em espera no momento</b></h2>
		</v-card>
	</v-col>
</template>

<script>
import { http } from "../../../../../services/config";
export default {
	data() {
		name: "component_Agenda_Confirmados";
		return {
			confirmados: {},
			status_c: { status: "cancelado" },
			retorno: false,
			tempo: {
				dia: "",
				hora: "",
			},
		};
	},
	computed: {
		idAgenda_cliente() {
			return this.$store.getters.get_idAgenda_cliente;
		},
		token() {
			return this.$store.getters.get_token;
		},
	},
	mounted() {
		this.getAgenda();
	},
	methods: {
		redirecionar(userId) {
			var newtel = userId.replace(/[^0-9]/g, "");
			const prefix = "55";
			var fullTel = prefix.concat(newtel);
			window.open(`https://wa.me/${fullTel}`, "_blank");
		},
		formataData(data) {
			var datePart = data.match(/\d+/g),
				year = datePart[0].substring(0, 4), // get only two digits
				month = datePart[1],
				day = datePart[2];

			return day + "/" + month + "/" + year;
		},
		cancelarAgendamento(atendimentoId) {
			http
				.patch(
					`/agenda-cliente/agendamento/${atendimentoId}/cancelar-agendamento`,
					this.status_c,
					{
						headers: { Authorization: `Bearer ${this.token}` },
					}
				)
				.then((resposta) => {
					console.log(resposta);
					alert("agendamento cancelado com sucesso");
					this.getAgenda();
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
				this.temporario = temp.data.agenda.agendamentos;
				// console.log(this.temporario);

				for (var i = 0; i < this.temporario.length; i++) {
					await http
						.get(`/agenda-cliente/get-agendamento/${this.temporario[i]._id}`, {
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
							console.log(err.response.data.msg);
						});
				}
				// console.log(this.temporario);
				this.confirmados = this.temporario.filter(function(retorno) {
					return retorno.status == "confirmado";
				});
				if (this.confirmados.length == 0) {
					this.retorno = true;
				}
				console.log(this.confirmados);
			} catch (err) {
				alert(err);
			}
		},
	},
};
</script>
