<template>
	<v-card class="mt-5 px-10 py-10">
		<v-row justify="center">
			<v-container>
				<v-layout row wrap justify>
					<v-col cols="12" md="4" sm="4" lg="4" xs="4" xl="4">
						<h3>Serviços</h3>
						<div class="mt-5">
							<li>Total de serviços: {{ this.temporario.length }}</li>
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
							<li>
								Possíveis ganhos: {{ this.relatorio.possivel_ganho }}
								<span>(não finalizados)</span>
							</li>
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
import { http } from "../../../../../services/config";
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
			temporario: {},
			tempo: {
				dia: "",
				hora: "",
			},
		};
	},
	computed: {
		idAgenda_barbeiro() {
			return this.$store.getters.get_idAgenda_barbeiro;
		},
		token() {
			return this.$store.getters.get_token;
		},
		// agendamentos() {
		// 	return this.$store.getters.get_agendamentos;
		// },
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
		async filtrar_relatorio() {
			try {
				for (let i = 0; i < this.temporario.length; i++) {
					if (this.temporario[i].status == "confirmado") {
						this.relatorio.qtd_confirmados++;
						this.relatorio.possivel_ganho += this.temporario[i].total;
					}
					if (this.temporario[i].status == "cancelado") {
						this.relatorio.qtd_cancelados++;
					}
					if (this.temporario[i].status == "finalizado") {
						this.relatorio.qtd_finalizados++;
						this.relatorio.total += this.temporario[i].total;
						this.temp_media += this.temporario[i].avaliacao;
					}
					if (this.temporario[i].status == "solicitacao") {
						this.relatorio.qtd_solicitados++;
						this.relatorio.possivel_ganho += this.temporario[i].total;
					}
				}
				this.relatorio.avaliacao_media =
					this.temp_media / this.relatorio.qtd_finalizados;

				let temp = this.relatorio.total / this.relatorio.qtd_finalizados;

				this.relatorio.valor_medio = temp.toFixed(2);
				console.log("fim filtro relatório");
			} catch (error) {
				console.log("algo de errado ocorreu!");
			}
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
							var tempData = this.teste.dataHora.substring(0, 10);
							this.tempo.dia = this.formataData(tempData);
							var tempHora = this.teste.dataHora.substring(11, 16);
							this.tempo.hora = tempHora;
							this.temporario[i].dataHora = this.tempo;
							this.temporario[i].total = this.teste.total;
							this.temporario[i].status = this.teste.status;
						})
						.catch((err) => {
							console.log(err.renponse.data.msg);
							alert(err.renponse.data.msg);
						});
				}
				console.log(this.temporario);
				this.filtrar_relatorio();
			} catch (err) {
				console.log(err);
				alert(err.response.data.msg);
				console.log(err);
			}
		},
	},
};
</script>
