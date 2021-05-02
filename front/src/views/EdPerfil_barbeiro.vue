<template>
	<v-container>
		<v-card class="elevation-15 mx-auto" width="85%">
			<!--titulo -->
			<v-card-title class="blue darken-4">
				<div>
					<span class="font-weight-light white--text">EDITAR</span>
					<span class="black--text">PERFIL</span>
				</div>
			</v-card-title>
			<!--fim titulo -->
			<!--formulario -->
			<v-form v-model="valid">
				<v-layout row wrap class="pa-3">
					<v-container>
						<v-container class="mt-n5">
							<p class="ml-n2 mb-1 font-weight-light black--text">Dados</p>
							<v-row>
								<v-col
									cols="12"
									md="6"
									sm="12"
									class="font-weight-light black--text"
								>
									<v-card flat outlined class="pa-n5">
										<v-card-title primary-title> Nome </v-card-title>
										<v-card-text class="mt-n5">
											Rodrigo peixoto furlani
										</v-card-text>
									</v-card>
								</v-col>

								<v-col
									cols="12"
									md="6"
									xs="12"
									class="font-weight-light black--text"
								>
									<v-card flat outlined class="pa-n5">
										<template>
											<v-row class="align-center">
												<v-col>
													<v-card-title primary-title> Telefone </v-card-title>
													<v-card-text class="mt-n5">
														<span>
															(22)99883-9925
															<v-icon
																right
																small
																class="mr-2"
																@click="editItem(item)"
															>
																mdi-pencil
															</v-icon>
														</span>
													</v-card-text>
												</v-col>
											</v-row>
										</template>
									</v-card>
								</v-col>

								<v-col
									cols="12"
									md="12"
									xs="12"
									class="font-weight-light black--text"
								>
									<v-card flat outlined class="pa-n5">
										<template>
											<v-row class="align-center">
												<v-col>
													<v-card-title primary-title> Email </v-card-title>
													<v-card-text class="mt-n5">
														<span
															>Rodrigo_rpf_furlani@hotmail.com
															<v-icon
																right
																small
																class="mr-2"
																@click="editItem(item)"
															>
																mdi-pencil
															</v-icon></span
														>
													</v-card-text>
												</v-col>
												<v-col> </v-col>
											</v-row>
										</template>
									</v-card>
								</v-col>
							</v-row>
						</v-container>

						<v-divider class="mb-6 mt-n1"></v-divider>

						<!--inicio da expansao -->
						<v-card-actions>
							<p class="mt-n7 ml-n1 mb-5 font-weight-light black--text">
								Serviços
							</p>
							<v-spacer></v-spacer>
							<v-btn icon @click="show = !show" class="mt-n11">
								<v-icon>{{
									show ? "mdi-chevron-up" : "mdi-chevron-down"
								}}</v-icon>
							</v-btn>
						</v-card-actions>

						<v-expand-transition>
							<div v-show="show">
								<v-card-text>
									<!--////////////////// TABELA SERVIÇOS ///////////////////////  -->
									<v-data-table
										:headers="headers"
										:items="desserts"
										sort-by="calories"
										class="elevation-1 mt-n7"
										hide-default-footer
									>
										<template v-slot:top>
											<v-toolbar flat>
												<v-dialog
													v-model="dialog"
													max-width="500px"
													class="mx-auto"
												>
													<template v-slot:activator="{ on, attrs }">
														<v-spacer></v-spacer>
														<v-btn
															color="success"
															dark
															class="mb-2"
															v-bind="attrs"
															v-on="on"
														>
															Novo Serviço
														</v-btn>
													</template>
													<v-card>
														<v-card-title>
															<span class="headline">{{ formTitle }}</span>
														</v-card-title>

														<v-card-text>
															<v-container>
																<v-row>
																	<v-col cols="12" sm="6" md="4">
																		<v-text-field
																			v-model="editedItem.name"
																			label="Dessert name"
																		></v-text-field>
																	</v-col>
																	<v-col cols="12" sm="6" md="4">
																		<v-text-field
																			v-model="editedItem.calories"
																			label="Calories"
																		></v-text-field>
																	</v-col>
																	<v-col cols="12" sm="6" md="4">
																		<v-text-field
																			v-model="editedItem.fat"
																			label="Fat (g)"
																		></v-text-field>
																	</v-col>
																	<v-col cols="12" sm="6" md="4">
																		<v-text-field
																			v-model="editedItem.carbs"
																			label="Carbs (g)"
																		></v-text-field>
																	</v-col>
																	<v-col cols="12" sm="6" md="4">
																		<v-text-field
																			v-model="editedItem.protein"
																			label="Protein (g)"
																		></v-text-field>
																	</v-col>
																</v-row>
															</v-container>
														</v-card-text>

														<v-card-actions>
															<v-spacer></v-spacer>
															<v-btn color="error" text @click="close">
																Cancel
															</v-btn>
															<v-btn color="blue darken-1" text @click="save">
																Save
															</v-btn>
														</v-card-actions>
													</v-card>
												</v-dialog>

												<!--\\\\\\\\ dialogo de confirmação \\\\\\\\\-->
												<v-dialog v-model="dialogDelete" max-width="500px">
													<v-card>
														<v-card-title class="headline"
															>Are you sure you want to delete this
															item?</v-card-title
														>
														<v-card-actions>
															<v-spacer></v-spacer>
															<v-btn
																color="blue darken-1"
																text
																@click="closeDelete"
																>Cancel</v-btn
															>
															<v-btn
																color="blue darken-1"
																text
																@click="deleteItemConfirm"
																>OK</v-btn
															>
															<v-spacer></v-spacer>
														</v-card-actions>
													</v-card>
												</v-dialog>
												<!--\\\\\\\\fim dialogo de confirmação \\\\\\\\\-->
											</v-toolbar>
										</template>
										<template v-slot:[`item.actions`]="{ item }">
											<v-icon small class="mr-2" @click="editItem(item)">
												mdi-pencil
											</v-icon>
											<v-icon small @click="deleteItem(item)">
												mdi-delete
											</v-icon>
										</template>
										<template v-slot:no-data>
											<v-btn color="primary" @click="initialize"> Reset </v-btn>
										</template>
									</v-data-table>
								</v-card-text>
							</div>
						</v-expand-transition>
						<!--//////////// FIM TABELA SERVIÇOS -->

						<v-divider class="mb-6 mt-n1"></v-divider>
						<p class="mt-n4 mb-1 ml-1 font-weight-light black--text">
							Certificados
						</p>
						<v-file-input
							v-model="files"
							class="darken-5 ml-3 mr-3"
							color="blue darken-2"
							append-icon="mdi-paperclip"
							prepend-icon
							label="Certificados"
							multiple
							placeholder="IMG.Certificados"
							outlined
						>
							<template v-slot:selection="{ index, text }">
								<v-chip v-if="index < 2" color="blue  darken-4" dark label small
									>{{ text }}
								</v-chip>
							</template>
						</v-file-input>
					</v-container>
				</v-layout>
			</v-form>
			<!--fim formulario -->
		</v-card>
	</v-container>
</template>

<script>
//teste
export default {
	data: () => ({
		show: false,
		dialog: false,
		dialogDelete: false,
		headers: [
			{
				text: "Dessert (100g serving)",
				align: "start",
				sortable: false,
				value: "name",
			},
			{ text: "Calories", value: "calories" },
			{ text: "Fat (g)", value: "fat" },
			{ text: "Carbs (g)", value: "carbs" },
			{ text: "Protein (g)", value: "protein" },
			{ text: "Actions", value: "actions", sortable: false },
		],
		desserts: [],
		editedIndex: -1,
		editedItem: {
			name: "",
			calories: 0,
			fat: 0,
			carbs: 0,
			protein: 0,
		},
		defaultItem: {
			name: "",
			calories: 0,
			fat: 0,
			carbs: 0,
			protein: 0,
		},
	}),

	computed: {
		formTitle() {
			return this.editedIndex === -1 ? "New Item" : "Edit Item";
		},
	},

	watch: {
		dialog(val) {
			val || this.close();
		},
		dialogDelete(val) {
			val || this.closeDelete();
		},
	},

	created() {
		this.initialize();
	},

	methods: {
		initialize() {
			this.desserts = [
				{
					name: "Frozen Yogurt",
					calories: 159,
					fat: 6.0,
					carbs: 24,
					protein: 4.0,
				},
				{
					name: "Ice cream sandwich",
					calories: 237,
					fat: 9.0,
					carbs: 37,
					protein: 4.3,
				},
				{
					name: "Eclair",
					calories: 262,
					fat: 16.0,
					carbs: 23,
					protein: 6.0,
				},
				{
					name: "Cupcake",
					calories: 305,
					fat: 3.7,
					carbs: 67,
					protein: 4.3,
				},
			];
		},

		editItem(item) {
			this.editedIndex = this.desserts.indexOf(item);
			this.editedItem = Object.assign({}, item);
			this.dialog = true;
		},

		deleteItem(item) {
			this.editedIndex = this.desserts.indexOf(item);
			this.editedItem = Object.assign({}, item);
			this.dialogDelete = true;
		},

		deleteItemConfirm() {
			this.desserts.splice(this.editedIndex, 1);
			this.closeDelete();
		},

		close() {
			this.dialog = false;
			this.$nextTick(() => {
				this.editedItem = Object.assign({}, this.defaultItem);
				this.editedIndex = -1;
			});
		},

		closeDelete() {
			this.dialogDelete = false;
			this.$nextTick(() => {
				this.editedItem = Object.assign({}, this.defaultItem);
				this.editedIndex = -1;
			});
		},

		save() {
			if (this.editedIndex > -1) {
				Object.assign(this.desserts[this.editedIndex], this.editedItem);
			} else {
				this.desserts.push(this.editedItem);
			}
			this.close();
		},
	},
};
</script>
