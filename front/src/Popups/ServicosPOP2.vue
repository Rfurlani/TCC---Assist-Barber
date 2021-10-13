<template>
	<v-row justify="center">
		<v-dialog v-model="dialog" fullscreen>
			<template v-slot:activator="{ on, attrs }">
				<v-btn color="primary" dark v-bind="attrs" v-on="on">
					Editar Serviços
				</v-btn>
			</template>
			<v-card>
				<v-toolbar dark color="primary">
					<v-toolbar-title>Serviços</v-toolbar-title>
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
							class="pb-3 pl-5 pr-5"
						>
							<v-text-field
								class="mt-2"
								type="text"
								clearable
								v-model="servico2.nome"
								label="Nome"
								:rules="Rules"
								placeholder="Nome"
								outlined
								required
							></v-text-field>

							<v-text-field
								type="text"
								clearable
								v-model="servico2.descricao"
								label="Descrição"
								:rules="Rules"
								placeholder="Descrição"
								outlined
								required
							></v-text-field>
							<v-text-field
								type="number"
								:rules="Rules"
								clearable
								v-model="servico2.preco"
								label="Preço"
								placeholder="Preço"
								outlined
								required
							></v-text-field>

							<v-spacer></v-spacer>
							<v-btn
								dark
								:disabled="!valid"
								color="primary"
								class="mr-4"
								@click="criarServico(servico2)"
							>
								salvar
							</v-btn>
						</v-form>
					</template>
				</v-container>
				<div>
					<v-card elevation="10">
						<v-simple-table>
							<template v-slot:default>
								<thead>
									<tr>
										<th class="text-left">Serviços</th>
										<th class="text-left">Descrição</th>
										<th class="text-left">Preço</th>
										<th class="text-left">Açoes</th>
									</tr>
								</thead>
								<tbody>
									<tr v-for="servicos in servico" :key="servicos._id">
										<td>{{ servicos.nome }}</td>
										<td>{{ servicos.descricao }}</td>
										<td>{{ servicos.preco }}</td>
										<td>
											<template>
												<v-dialog
													:retain-focus="false"
													v-model="dialog1"
													max-width="600px"
												>
													<template v-slot:activator="{ on, attrs }">
														<v-icon
															@click="editar(servicos)"
															class="btn-small blue darken-1"
															v-bind="attrs"
															v-on="on"
															>mdi-pencil</v-icon
														>
													</template>
													<v-card>
														<v-toolbar dark color="primary">
															<v-toolbar-title>Serviços</v-toolbar-title>
															<v-spacer></v-spacer>
															<v-btn icon dark @click.stop="dialog1 = false">
																<v-icon>mdi-close</v-icon>
															</v-btn>
														</v-toolbar>
														<v-card-text class="pa-5"></v-card-text>

														<v-form
															ref="form"
															v-model="valid"
															lazy-validation
															class="pb-3 pl-5 pr-5"
														>
															<v-text-field
																label="Nome"
																:rules="Rules"
																v-model="edservico.nome"
																placeholder="nome"
																outlined
																required
															></v-text-field>

															<v-text-field
																type="text"
																clearable
																v-model="edservico.descricao"
																label="Descrição"
																:rules="Rules"
																placeholder="Descrição"
																outlined
																required
															></v-text-field>
															<v-text-field
																type="number"
																:rules="Rules"
																clearable
																v-model="edservico.preco"
																label="Preço"
																placeholder="Preço"
																outlined
																required
															></v-text-field>

															<v-btn
																:disabled="!valid"
																color="success"
																class="mr-4"
																@click="editarServico(edservico, edservico._id)"
															>
																salvar
															</v-btn>
														</v-form>
													</v-card>
												</v-dialog>
											</template>

											<v-icon
												@click="deletarServico(servicos)"
												class="btn-small red darken-1"
												>mdi-delete-empty</v-icon
											>
										</td>
									</tr>
								</tbody>
							</template>
						</v-simple-table>
					</v-card>
				</div>
			</v-card>
		</v-dialog>
	</v-row>
</template>
<script>
import { http } from "../services/config";

export default {
	data() {
		name: "servicos";
		return {
			Rules: [(v) => !!v || "não pode ser deixado em branco"],
			valid: true,
			dialog1: false,
			dialog: false,
			servico2: {},
			edservico: {},
			servico: [],
		};
	},
	computed: {
		barbeiroId() {
			return this.$store.getters.get_barbeiroId;
		},
		token() {
			return this.$store.getters.get_token;
		},
	},
	mounted() {
		// console.log(this.servico.data);
		this.listarServicos();
	},
	methods: {
		listarServicos() {
			http
				.get(`/barbeiro/${this.barbeiroId}/listar-servicos`, {
					headers: { Authorization: `Bearer ${this.token}` },
				})
				.then((resposta) => {
					this.servico = resposta.data.servicos;
					console.log(this.servico);
				})
				.catch((err) => {
					console.log(err.message);
				});
		},
		deletarServico(servicos) {
			console.log(this.barbeiroId);
			http
				.delete(
					`/barbeiro/${this.barbeiroId}/excluir-servico/${servicos._id}`,
					{
						headers: { Authorization: `Bearer ${this.token}` },
					}
				)
				.then((resposta) => {
					alert(resposta.data);
					this.listarServicos();
				})
				.catch((err) => {
					console.log(err.data.msg);
				});
		},
		criarServico() {
			http
				.post(`/barbeiro/${this.barbeiroId}/criar-servico`, this.servico2, {
					headers: { Authorization: `Bearer ${this.token}` },
				})
				.then((resposta) => {
					console.log(this.servico2);
					alert(resposta.data.msg);
					this.listarServicos();
					this.$refs.form.reset();
					this.dialog = false;
				})
				.catch((err) => {
					console.log(err);
					this.errors = err;
					console.log(this.errors);
				});
		},
		editarServico(edservico, servicoid) {
			http
				.patch(
					`/barbeiro/${this.barbeiroId}/alterar-servico/${servicoid}`,
					edservico,
					{
						headers: { Authorization: `Bearer ${this.token}` },
					}
				)
				.then((resposta) => {
					console.log(edservico);
					alert(resposta.data.msg);
					this.listarServicos();
					this.$refs.form.reset();
					this.dialog1 = false;
				})
				.catch((err) => {
					console.log(edservico);
					console.log(servicoid);

					console.log(err);
					this.errors = err;
					console.log(this.errors);
				});
		},
		editar(servicos) {
			this.edservico = servicos;
		},
	},
};
</script>
