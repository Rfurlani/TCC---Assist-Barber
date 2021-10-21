<template>
	<v-form v-model="valid" lazy-validation ref="form">
		<v-row justify="center">
			<v-dialog persistent v-model="dialogtela" max-width="600px">
				<template v-slot:activator="{ on, attrs }">
					<v-btn color="primary" dark v-bind="attrs" v-on="on"> Agendar </v-btn>
				</template>
				<v-card>
					<v-card-title>
						<h3>Agendamento</h3>
					</v-card-title>

					<v-card-text>
						<h2>Data e Hora</h2>

						<v-container>
							<v-row>
								<v-col cols="12" sm="6" md="4">
									<!-- inicio relogio -->
									<v-dialog
										ref="dialog"
										v-model="modal2"
										:return-value.sync="hora"
										persistent
										width="290px"
									>
										<template v-slot:activator="{ on, attrs }">
											<v-text-field
												v-model="hora"
												label="esccolha a hora"
												prepend-icon="mdi-clock-time-four-outline"
												readonly
												required
												v-bind="attrs"
												v-on="on"
											></v-text-field>
										</template>
										<v-time-picker
											v-if="modal2"
											v-model="hora"
											full-width
											format="24hr"
											min="8:30"
											max="22:00"
											:allowed-minutes="allowedStep"
										>
											<v-spacer></v-spacer>
											<v-btn text color="primary" @click="modal2 = false">
												Cancel
											</v-btn>
											<v-btn
												text
												color="primary"
												@click="$refs.dialog.save(hora)"
											>
												OK
											</v-btn>
										</v-time-picker>
									</v-dialog>
									<!-- final relogio -->
								</v-col>
								<v-col cols="12" sm="6" md="4">
									<!-- inicio data -->
									<v-dialog
										ref="dialog1"
										v-model="modal"
										:return-value.sync="dia"
										persistent
										width="290px"
									>
										<template v-slot:activator="{ on, attrs }">
											<v-text-field
												v-model="dia"
												label="escolha a data"
												prepend-icon="mdi-calendar"
												readonly
												required
												v-bind="attrs"
												v-on="on"
											></v-text-field>
										</template>
										<v-date-picker v-model="dia" scrollable min="2021-10-21">
											>
											<v-spacer></v-spacer>
											<v-btn text color="primary" @click="modal = false">
												Cancel
											</v-btn>
											<v-btn
												text
												color="primary"
												@click="$refs.dialog1.save(dia)"
											>
												OK
											</v-btn>
										</v-date-picker>
									</v-dialog>
									<!-- final data -->
								</v-col>
							</v-row>
						</v-container>
						<h2>Serviços</h2>

						<!-- tabela -->
						<v-data-table
							v-model="selected"
							:headers="headers"
							:items="servico"
							item-key="_id"
							show-select
							class="elevation-1"
						>
							>
						</v-data-table>
						<!-- tabela -->
					</v-card-text>
					<v-card-actions>
						<v-spacer></v-spacer>
						<v-btn color="red darken-1" text @click="fechaTelaDialog()">
							Fechar
						</v-btn>
						<v-dialog persistent v-model="dialog" width="500">
							<template v-slot:activator="{ on, attrs }">
								<v-btn
									color="blue darken-1"
									text
									:v-if="!valid"
									v-bind="attrs"
									v-on="on"
									@click="avancar()"
								>
									Avançar
								</v-btn>
							</template>

							<v-card>
								<v-card-title class="text-h5 blue darken-4">
									Confirmar Itens
								</v-card-title>

								<v-card-text class="my-2 pt-5">
									<v-layout row wrap>
										<v-flex xs12 sm12 md12 xl12>
											<h2 class=" black--text">Serviços</h2>
											<div class="mt-3 mb-3">
												<ul>
													<li
														class="black--text"
														v-for="servico in this.agendamento.servicos"
														:key="servico._id"
													>
														{{ servico.nome }}
													</li>
												</ul>
											</div>
										</v-flex>
										<v-flex xs3 sm4 md3>
											<h3 class=" black--text">Hora</h3>
											<div class=" black--text">
												{{ hora }}
											</div>
										</v-flex>
										<v-flex xs3 sm4 md3>
											<h3 class=" black--text">Data</h3>
											<div class="black--text">{{ dia }}</div>
										</v-flex>
										<v-flex xs6 sm4 md6>
											<h3 class="black--text">Total</h3>
											<div class="black--text">
												{{ this.agendamento.total }}
											</div>
										</v-flex>
									</v-layout></v-card-text
								>

								<v-card-actions>
									<v-spacer></v-spacer>
									<v-btn color="red darken-1" text @click="fecha()">
										Fechar
									</v-btn>
									<v-btn color="primary" text @click="agendar()">
										confirmar Atendimento
									</v-btn>
								</v-card-actions>
								<!-- fim tela de confirmar -->
							</v-card>
						</v-dialog>
					</v-card-actions>
				</v-card>
			</v-dialog>
		</v-row>
	</v-form>
</template>

<script>
import { http } from "../services/config";
export default {
	data() {
		return {
			valid: false,
			hora: null,
			dia: null,
			fuso_horario: "-00:00",
			formato: "dd/MM/yyyy",
			block: Date(Date.now()),
			disabledDates: {
				ranges: [],
			},
			selected: [],
			erros: [],

			modal2: false,
			modal: false,
			menu2: false,
			dialogtela: false,
			dialog: false,
			headers: [
				{
					align: "center",
					sortable: false,
					value: "name",
				},
				{ text: "Serviço", value: "nome" },
				{ text: "Descrição", value: "descricao" },
				{ text: "Valor R$", value: "preco" },
			],

			agendamento: {
				servicos: [],
				total: null,
				endereco: null,
				avaliacao: 0,
				dataHora: null,
			},
		};
	},
	computed: {
		token() {
			return this.$store.getters.get_token;
		},
		servico() {
			return this.$store.getters.get_servicos;
		},
		cliente() {
			return this.$store.getters.get_cliente;
		},
		cliente_userId() {
			return this.$store.getters.get_cliente_userId;
		},
		barbeiro_userId() {
			return this.$store.getters.get_barbeiro_userId;
		},
		idAgenda_cliente() {
			return this.$store.getters.get_idAgenda_cliente;
		},
		idAgenda_barbeiro() {
			return this.$store.getters.get_idAgenda_barbeiro;
		},
	},
	mounted() {
		this.defaultDateRange();
	},
	methods: {
		defaultDateRange() {
			let tzoffset = new Date().getTimezoneOffset() * 60000;
			let today = new Date(Date.now() - tzoffset);

			let oldToday = new Date(today.getTime()); // AS DATES ARE REFRENCE COOPIED I HAD TO COPY THE VALUE OF TODAY
			oldToday.setDate(oldToday.getDate() - 1);

			today.setMonth(today.getMonth() + 1); // GETTING NEXT MONTHS DATE

			let max = new Date(); // YOU CAN REMOVE THIS MAX VARIABLE I JUST PUT IT FOR YOUR REFRENCE
			let obj = {};
			max.setDate(max.getDate() + 30);
			let max_date = max;

			obj["from"] = new Date(0, 0, 0); // FOR DISABLING ALL PREVIOUS DATES I PUT THIS IN RANGES ARRAY INSIDE DISABLEDDATES OBJECT
			obj["to"] = oldToday;

			this.disabledDates["ranges"].push(obj);
			this.disabledDates["from"] = today;
			console.log("disableDates is ");
			console.log(this.disabledDates);
		},
		allowedStep: (m) => m % 15 === 0,
		converteStrDate(dia, hora, fuso_horario) {
			return new Date(dia + "T" + hora + fuso_horario);
		},
		fecha() {
			this.agendamento.total = 0;
			this.dialog = false;
		},
		fechaTelaDialog() {
			this.dialogtela = false;
			this.dia = "";
			this.hora = "";
			this.selected = [];
		},
		avancar() {
			this.agendamento.barbeiro_userId = this.barbeiro_userId;
			this.agendamento.cliente_userId = this.cliente_userId;
			this.agendamento.servicos = this.selected;
			this.agendamento.endereco = this.cliente.data.cliente.endereco;
			const dataHora = this.converteStrDate(
				this.dia,
				this.hora,
				this.fuso_horario
			);
			this.agendamento.dataHora = dataHora;
			console.log(dataHora);

			for (var i = 0; i < this.agendamento.servicos.length; i++) {
				this.agendamento.total += this.agendamento.servicos[i].preco;
			}

			console.log(this.agendamento);
		},
		agendar() {
			if (confirm("Deseja agendar o serviço?")) {
				http
					.post(
						`/agenda-cliente/${this.idAgenda_cliente}/agenda-barbeiro/${this.idAgenda_barbeiro}/solicitar-agendamento`,
						this.agendamento,
						{
							headers: { Authorization: `Bearer ${this.token}` },
						}
					)
					.then((resposta) => {
						console.log(resposta);
						alert(resposta.data.msg);
						this.dialogtela = false;
						this.dialog = false;
					})
					.catch((err) => {
						alert(err.response.data.msg);
						console.log(err.response.data);
					});
			} else {
				console.log("agendamento cancelado");
			}
		},
	},
};
</script>
