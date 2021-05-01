<template>
	<v-container>
		<v-card class="elevation-15 mx-auto" width="80%">
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
						<v-container class="mt-n4 ml-n2 mb-3 font-weight-light black--text"
							>Nome
							<h3>Teste</h3>
						</v-container>

						<v-divider class="mb-6 mt-n5"></v-divider>

						<!--inicio da expansao -->
						<v-card-actions>
							<p class="mt-n7 ml-n2 mb-5 font-weight-light black--text">
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
									<!--///////////////////////////////////////// -->
									<v-data-table
										:headers="headers"
										:items="desserts"
										sort-by="calories"
										class="elevation-1"
									>
										<template v-slot:top>
											<v-toolbar flat>
												<v-toolbar-title>My CRUD</v-toolbar-title>
												<v-divider class="mx-4" inset vertical></v-divider>
												<v-spacer></v-spacer>
												<v-dialog v-model="dialog" max-width="500px">
													<template v-slot:activator="{ on, attrs }">
														<v-btn
															color="primary"
															dark
															class="mb-2"
															v-bind="attrs"
															v-on="on"
														>
															New Item
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
															<v-btn color="blue darken-1" text @click="close">
																Cancel
															</v-btn>
															<v-btn color="blue darken-1" text @click="save">
																Save
															</v-btn>
														</v-card-actions>
													</v-card>
												</v-dialog>
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
								<v-card-actions class="">
									<v-spacer></v-spacer>
									<v-btn class="mb-5" color="success">Inserir</v-btn>
									<v-btn class="mb-5" color="error">Excluir</v-btn>
								</v-card-actions>
							</div>
						</v-expand-transition>
						<!--fim da expansao -->

						<v-divider class="mb-6 mt-n5"></v-divider>
						<p class="mt-n4 mb-1 font-weight-light black--text">Certificados</p>
						<v-file-input
							v-model="files"
							class="darken-5"
							color="blue darken-2"
							append-outer-icon="mdi-paperclip"
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

						<v-btn color="success">Salvar</v-btn>
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
				{
					name: "Gingerbread",
					calories: 356,
					fat: 16.0,
					carbs: 49,
					protein: 3.9,
				},
				{
					name: "Jelly bean",
					calories: 375,
					fat: 0.0,
					carbs: 94,
					protein: 0.0,
				},
				{
					name: "Lollipop",
					calories: 392,
					fat: 0.2,
					carbs: 98,
					protein: 0,
				},
				{
					name: "Honeycomb",
					calories: 408,
					fat: 3.2,
					carbs: 87,
					protein: 6.5,
				},
				{
					name: "Donut",
					calories: 452,
					fat: 25.0,
					carbs: 51,
					protein: 4.9,
				},
				{
					name: "KitKat",
					calories: 518,
					fat: 26.0,
					carbs: 65,
					protein: 7,
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
