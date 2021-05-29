<template>
	<v-row justify="center">
		<v-dialog v-model="dialogtela" max-width="600px">
			<template v-slot:activator="{ on, attrs }">
				<v-btn color="primary" dark v-bind="attrs" v-on="on"> Agendar </v-btn>
			</template>
			<v-card>
				<v-card-title>
					<span class="headline">Agendamento</span>
				</v-card-title>
				<v-card-text>
					<v-container>
						<v-row>
							<v-col cols="12" sm="6" md="4">
								<!-- inicio relogio -->
								<v-dialog
									ref="dialog"
									v-model="modal2"
									:return-value.sync="time"
									persistent
									width="290px"
								>
									<template v-slot:activator="{ on, attrs }">
										<v-text-field
											v-model="time"
											label="Picker in dialog"
											prepend-icon="mdi-clock-time-four-outline"
											readonly
											v-bind="attrs"
											v-on="on"
										></v-text-field>
									</template>
									<v-time-picker v-if="modal2" v-model="time" full-width>
										<v-spacer></v-spacer>
										<v-btn text color="primary" @click="modal2 = false">
											Cancel
										</v-btn>
										<v-btn
											text
											color="primary"
											@click="$refs.dialog.save(time)"
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
									:return-value.sync="date"
									persistent
									width="290px"
								>
									<template v-slot:activator="{ on, attrs }">
										<v-text-field
											v-model="date"
											label="Picker in dialog"
											prepend-icon="mdi-calendar"
											readonly
											v-bind="attrs"
											v-on="on"
										></v-text-field>
									</template>
									<v-date-picker v-model="date" scrollable>
										<v-spacer></v-spacer>
										<v-btn text color="primary" @click="modal = false">
											Cancel
										</v-btn>
										<v-btn
											text
											color="primary"
											@click="$refs.dialog1.save(date)"
										>
											OK
										</v-btn>
									</v-date-picker>
								</v-dialog>
								<!-- final data -->
							</v-col>
						</v-row>
					</v-container>
					<small>*indicates required field</small>
				</v-card-text>
				<v-card-actions>
					<v-spacer></v-spacer>
					<v-btn color="blue darken-1" text @click="dialogtela = false">
						Close
					</v-btn>
					<v-btn color="blue darken-1" text @click="dialogtela = false">
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
			time: null,
			date: null,
			modal2: false,
			menu2: false,
			dialogtela: false,
		};
	},
};
</script>
