<template>
	<v-col cols="9" md="9" sm="9">
		<v-card
			flat
			class="pl-8 pt-5 pb-5 mb-1"
			outlined
			v-for="agenda in cancelados"
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
			</v-layout>
		</v-card>
		<v-card flat class="pl-8 pt-5 pb-5 mb-1" outlined v-if="this.retorno">
			<h2><b>Não ha serviços cancelados no momento</b></h2>
		</v-card>
	</v-col>
</template>

<script>
import { http } from "../../../../../services/config";
export default {
	data() {
		name: "component_Agenda_cancelados";
		return {
			cancelados: {},
			status_c: { status: "confirmado" },
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
		formataData(data) {
			var datePart = data.match(/\d+/g),
				year = datePart[0].substring(0, 4), // get only two digits
				month = datePart[1],
				day = datePart[2];
			return day + "/" + month + "/" + year;
		},
		async getAgenda() {
			try {
				const temp = await http.get(`/agenda-cliente/get-agenda`, {
					headers: { Authorization: `Bearer ${this.token}` },
				});
				this.temporario = temp.data.agenda.agendamentos;
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
							console.log(err.renponse.data.msg);
						});
				}
				console.log(this.temporario);
				this.cancelados = this.temporario.filter(function(retorno) {
					return retorno.status == "cancelado";
				});
				if (this.cancelados.length == 0) {
					this.retorno = true;
				}
			} catch (err) {
				alert(err.response.data.msg);
			}
		},
	},
};
</script>
