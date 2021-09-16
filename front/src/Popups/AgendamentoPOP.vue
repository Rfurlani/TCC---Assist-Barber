<template>
	<v-row justify="center">
		<v-dialog v-model="dialogtela" max-width="600px">
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
									:return-value.sync="agendamento.hora"
									persistent
									width="290px"
								>
									<template v-slot:activator="{ on, attrs }">
										<v-text-field
											v-model="agendamento.hora"
											label="Picker in dialog"
											prepend-icon="mdi-clock-time-four-outline"
											readonly
											v-bind="attrs"
											v-on="on"
										></v-text-field>
									</template>
									<v-time-picker
										v-if="modal2"
										v-model="agendamento.hora"
										full-width
									>
										<v-spacer></v-spacer>
										<v-btn text color="primary" @click="modal2 = false">
											Cancel
										</v-btn>
										<v-btn
											text
											color="primary"
											@click="$refs.dialog.save(agendamento.hora)"
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
									:return-value.sync="agendamento.dia"
									persistent
									width="290px"
								>
									<template v-slot:activator="{ on, attrs }">
										<v-text-field
											v-model="agendamento.dia"
											label="Picker in dialog"
											prepend-icon="mdi-calendar"
											readonly
											v-bind="attrs"
											v-on="on"
										></v-text-field>
									</template>
									<v-date-picker v-model="agendamento.dia" scrollable>
										<v-spacer></v-spacer>
										<v-btn text color="primary" @click="modal = false">
											Cancel
										</v-btn>
										<v-btn
											text
											color="primary"
											@click="$refs.dialog1.save(agendamento.dia)"
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
					<v-btn color="blue darken-1" text @click="dialogtela = false">
						Close
					</v-btn>
					<v-btn color="blue darken-1" text @click="agendar()">
						Save
					</v-btn>
				</v-card-actions>
			</v-card>
		</v-dialog>
	</v-row>
</template>

<script>
export default {
	data() {
		return {
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
				hora: null,
				dia: null,
				servicos: [],
				total: null,
				endereco: "",
			},
			selected: [],
			erros: [],
			modal2: false,
			menu2: false,
			dialogtela: false,
		};
	},
	computed: {
		servico() {
			return this.$store.getters.get_servicos;
		},
		cliente() {
			return this.$store.getters.get_cliente;
		},
	},
	methods: {
		agendar() {
			this.agendamento.servicos = this.selected;
			this.agendamento.endereco = this.cliente.data.cliente.endereco;
			for (var i = 0; i < this.agendamento.servicos.length; i++) {
				this.agendamento.total += this.agendamento.servicos[i].preco;
			}
			console.log(this.agendamento);
			if (confirm("Confirme os itens e o valor do agendamento!")) {
				console.log(this.agendamento);
			} else {
				console.log("agendamento cancelado");
			}

			// console.log(agendamento);
			// alert(agendamento.dia);
			// alert(agendamento.hora);
		},
		rowClicked(row) {
			this.toggleSelection(row.id);
			console.log(row);
		},
		toggleSelection(keyID) {
			if (this.selectedRows.includes(keyID)) {
				this.selectedRows = this.selectedRows.filter(
					(selectedKeyID) => selectedKeyID !== keyID
				);
			} else {
				this.selectedRows.push(keyID);
			}
		},
	},
};
</script>
