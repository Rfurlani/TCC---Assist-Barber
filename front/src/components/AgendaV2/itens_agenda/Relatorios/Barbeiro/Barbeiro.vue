<template>
	<v-card class="mt-5 px-10 py-10">
		<v-row justify="center">
			<v-container>
				<v-layout row wrap justify>
					<v-col cols="12" md="4" sm="4" lg="4" xs="4" xl="4">
						<h3>Serviços</h3>
						<div class="mt-5">
							<li>Total de serviços: {{ this.agendamentos.length }}</li>
							<li>
								Agendamentos cancelados: {{ this.relatorio.qtd_cancelados }}
							</li>
							<li>
								Agendamentos finalizados: {{ this.relatorio.qtd_finalizados }}
							</li>
							<li>
								Agendamentos agendados: {{ this.relatorio.qtd_confirmados }}
							</li>
							<li>
								Agendamentos solicitados: {{ this.relatorio.qtd_solicitados }}
							</li>
						</div>
					</v-col>

					<v-col cols="12" md="4" sm="4" lg="4" xs="4" xl="4">
						<h3>Ganhos</h3>
						<div class="mt-5">
							<li>total de ganhos: {{ this.relatorio.total }}</li>
							<li>Possíveis ganhos: {{ this.relatorio.possivel_ganho }}</li>
							<li>
								Valor médio por agendamento: R${{ this.relatorio.valor_medio }}
							</li>
						</div>
					</v-col>
					<v-col cols="12" md="4" sm="4" lg="4" xs="4" xl="4">
						<h3>Porcentagem</h3>
						<div class="mt-5">
							<li>
								Agendamento cancelados: {{ this.relatorio.cancelados_percent }}%
							</li>
							<li>
								Agendamentos finalizados:
								{{ this.relatorio.finalizados_percent }}%
							</li>
						</div>
					</v-col>
					<v-col cols="12" md="12" sm="12" lg="12" xs="12" xl="12">
						<h3>Avaliação Média</h3>
						<h1>{{ this.relatorio.avaliacao_media }}</h1>
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
				cancelados_percent: 0,
				finalizados_percent: 0,
				valor_medio: 0,
			},
			temp_media: 0,
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
		this.filtrar_relatorio();
	},
	methods: {
		async filtrar_relatorio() {
			try {
				for (let i = 0; i < this.agendamentos.length; i++) {
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

				let temp = this.relatorio.total / this.relatorio.qtd_finalizados;

				// this.relatorio.cancelados_percent = function funcaoPorcentagem(
				// 	valor,
				// 	totalValor
				// ) {
				// 	return (100 * relatorio.qtd_cancelados) / this.agendamentos.length;
				// };

				this.relatorio.valor_medio = temp.toFixed(2);
			} catch (error) {
				console.log("algo de errado ocorreu!");
			}
		},
	},
};
</script>
