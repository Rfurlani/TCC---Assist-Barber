<template>
	<v-card class="mt-5 px-10 py-10">
		<v-row justify="center">
			<v-container>
				<v-layout row wrap justify>
					<v-col cols="12" md="4" sm="4" lg="4" xs="4" xl="4">
						<h3>Serviços</h3>
						<div class="mt-5">
							Total de serviços: {{ this.agendamentos.length }}
							<br />
							serviços cancelados: {{ this.relatorio.qtd_cancelados }}
							<br />
							serviços finalizados: {{ this.relatorio.qtd_finalizados }}
							<br />
							serviços agendados: {{ this.relatorio.qtd_confirmados }}
							<br />
							serviços solicitados: {{ this.relatorio.qtd_solicitados }}
						</div>
					</v-col>

					<v-col cols="12" md="4" sm="4" lg="4" xs="4" xl="4">
						<h3>Ganhos</h3>
						<div class="mt-5">
							total de ganhos: {{ this.relatorio.total }}
							<br />
							Possíveis ganhos: {{ this.relatorio.possivel_ganho }}
						</div>
					</v-col>
					<v-col cols="12" md="4" sm="4" lg="4" xs="4" xl="4">
						<h3>Porcentagem</h3>
						<div class="mt-5"></div>
					</v-col>
					<v-col cols="12" md="12" sm="12" lg="12" xs="12" xl="12">
						<h3>Avaliação Média</h3>
						<h1>{{ this.relatorio.avaliacao_media }}</h1>
					</v-col>
					<v-col>
						<a href="geo:50,10">Location 50/10</a>
					</v-col>
				</v-layout>
			</v-container>
		</v-row>
	</v-card>
</template>
<script>
export default {
	data() {
		name: "component_Agenda_confirmados";
		return {
			relatorio: {
				qtd_cancelados: 0,
				qtd_finalizados: 0,
				qtd_solicitados: 0,
				qtd_confirmados: 0,
				total: 0,
				avaliacao_media: 0,
				porcentagem_de_servico_realizado: 0,
				possivel_ganho: 0,
			},
			temp_media: 0,
			// confirmados: {},
			// cancelados: {},
			// Solicitacao: {},
			// finalizados: {},
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
		// this.confirmados = this.agendamentos.filter(function(retorno) {
		// 	return retorno.status == "confirmado";
		// });
		// this.cancelados = this.agendamentos.filter(function(retorno) {
		// 	return retorno.status == "cancelado";
		// });
		// this.solicitacao = this.agendamentos.filter(function(retorno) {
		// 	return retorno.status == "solicitacao";
		// });
		// this.finalizados = this.agendamentos.filter(function(retorno) {
		// 	return retorno.status == "finalizado";
		// });
		// console.log(this.confirmados);
		// console.log(this.cancelados);
		// console.log(this.solicitacao);
		// console.log(this.finalizados);
		// this.filtro_total();
		this.filtrar_relatorio();
	},
	methods: {
		async filtrar_relatorio() {
			try {
				// this.confirmados = this.agendamentos.filter(function(retorno) {
				// 	return retorno.status == "confirmado";
				// });
				// this.cancelados = this.agendamentos.filter(function(retorno) {
				// 	return retorno.status == "cancelado";
				// });
				// this.solicitacao = this.agendamentos.filter(function(retorno) {
				// 	return retorno.status == "solicitacao";
				// });
				// this.finalizados = this.agendamentos.filter(function(retorno) {
				// 	return retorno.status == "finalizado";
				// });
				// console.log(this.confirmados);
				// console.log(this.cancelados);
				// console.log(this.solicitacao);
				// console.log(this.finalizados);
				// let total = 0;

				for (let i = 0; i < this.agendamentos.length; i++) {
					// total += this.cancelados[i].total;
					if (this.agendamentos[i].status == "confirmado") {
						this.relatorio.qtd_confirmados++;
						this.relatorio.possivel_ganho += this.agendamentos[i].total;
					}
					if (this.agendamentos[i].status == "cancelado") {
						this.relatorio.qtd_cancelados++;
					}
					if (this.agendamentos[i].status == "finalizado") {
						this.relatorio.qtd_finalizados++;
						this.relatorio.total += this.agendamentos[i].total;
						this.temp_media += this.agendamentos[i].avaliacao;
					}
					if (this.agendamentos[i].status == "solicitacao") {
						this.relatorio.qtd_solicitados++;
						this.relatorio.possivel_ganho += this.agendamentos[i].total;
					}
				}
				this.relatorio.avaliacao_media =
					this.temp_media / this.relatorio.qtd_finalizados;
				// console.log(this.relatorio.qtd_finalizados);
				// console.log(this.relatorio.total);
				// console.log(total);
				// this.cancelados.totalSoma = total;
			} catch (error) {
				console.log("algo de errado ocorreu!");
			}
		},
	},
};
</script>
