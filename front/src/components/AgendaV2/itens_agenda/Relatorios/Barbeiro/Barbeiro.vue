<template>
	<v-row justify="center">
		<v-container>
			<v-layout row wrap justify>
				<v-col cols="12" md="4" sm="4" lg="4" xs="4" xl="4">
					Total de serviços: 20
				</v-col>
				<v-col cols="12" md="4" sm="4" lg="4" xs="4" xl="4"
					>serviços cancelados: 5
				</v-col>
				<v-col cols="12" md="4" sm="4" lg="4" xs="4" xl="4"
					>serviços finalizados: 7
				</v-col>
				<v-col cols="12" md="4" sm="4" lg="4" xs="4" xl="4"
					>serviços agendados: 3
				</v-col>

				<v-col cols="12" md="4" sm="4" lg="4" xs="4" xl="4"
					>serviços finalizados: 5
				</v-col>

				<v-col cols="12" md="4" sm="4" lg="4" xs="4" xl="4"
					>total de ganhos: R$550,00
				</v-col>
				<v-col cols="12" md="4" sm="4" lg="4" xs="4" xl="4"
					>Avaliação média: 4,3
				</v-col>
			</v-layout>
		</v-container>
	</v-row>
</template>
<script>
import { http } from "../../../../../services/config";
export default {
	data() {
		name: "component_Agenda_confirmados";
		return {
			confirmados: {},
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
