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
				<div class="d-flex" v-if="agenda.avaliacao == null">
					<v-card-actions>
						<!-- ////////// avaliação \\\\\\\\\\\\-->
						<v-row justify="center">
							<v-dialog v-model="dialog" width="60%" :retain-focus="false">
								<template v-slot:activator="{ on, attrs }">
									<v-btn
										color="primary"
										dark
										v-bind="attrs"
										v-on="on"
										@click="Avaliacao(agenda._id)"
									>
										Avaliar
									</v-btn>
								</template>
								<v-card>
									<v-toolbar dark color="primary">
										<v-toolbar-title>Avaliar serviço</v-toolbar-title>
										<v-spacer></v-spacer>
										<v-btn icon dark @click="dialog = false">
											<v-icon>mdi-close</v-icon>
										</v-btn>
									</v-toolbar>
									<v-spacer></v-spacer>

									<v-container>
										<template>
											<v-form
												ref="form"
												v-model="valid"
												lazy-validation
												class=""
											>
												<div class="text-center mt-5">
													<v-rating
														v-model="avaliacao.nota"
														background-color="blue"
														color="red accent-4"
														dense
														required
														half-increments
														size="50"
													></v-rating>
													<span class="red--text ">{{ avaliacao.nota }}</span>
												</div>
												<v-text-field
													width="350px"
													class="mt-2"
													type="text"
													clearable
													v-model="avaliacao.descricao"
													label="Descrição"
													:rules="Rules"
													placeholder="Descrição"
													outlined
													:counter="350"
													required
												></v-text-field>

												<v-card-actions>
													<v-btn
														dark
														:disabled="!valid"
														color="primary"
														class=""
														@click="avaliarAgendamento()"
													>
														salvar
													</v-btn>
												</v-card-actions>
											</v-form>
										</template>
									</v-container>
								</v-card>
							</v-dialog>
						</v-row>
						<!-- ////////// avaliação final \\\\\\\\\\\\-->
					</v-card-actions>
				</div>
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
		name: "component_Agenda_finalizados";
		return {
			finalizados: {},
			status_c: { status: "finalizado" },
			Rules: [(v) => !!v || "não pode ser deixado em branco"],
			valid: true,
			dialog: false,
			avaliacao: {
				descricao: "",
				nota: null,
			},
			agendamentoId: "",
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
		fechar() {
			this.avaliacao.nota = 0;
			this.avaliacao.descricao = "";
			this.getAgenda();
			this.dialog = false;
		},
		Avaliacao(id) {
			this.agendamentoId = id;
		},
		avaliarAgendamento() {
			http
				.post(
					`/agenda-cliente/agendamento/${this.agendamentoId}/criar-avaliacao/`,
					this.avaliacao,
					{ headers: { Authorization: `Bearer ${this.token}` } }
				)
				.then((resposta) => {
					console.log(resposta);
					this.fechar();
				})
				.catch((err) => {
					console.log(err);
				});
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
				this.finalizados = this.temporario.filter(function(retorno) {
					return retorno.status == "finalizado";
				});
				if (this.finalizados.length == 0) {
					this.retorno = true;
				}
			} catch (err) {
				alert(err.response.data.msg);
			}
		},
	},
};
</script>
