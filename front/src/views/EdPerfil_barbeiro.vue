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
							<p class="ml-n2 mb-1 font-weight-light black--text">
								Dados Principais
							</p>
							<v-row>
								<v-col
									cols="12"
									md="6"
									sm="12"
									class="font-weight-light black--text"
								>
									<v-card flat outlined>
										<v-card-title primary-title> Nome </v-card-title>
										<v-card-text class="mt-n5">
											{{ barbeiro.data.barbeiro.usuarioId.nome }}
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
															{{ barbeiro.data.barbeiro.usuarioId.telefone }}
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
														<span>
															{{ barbeiro.data.barbeiro.usuarioId.email }}
														</span>
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
								Servicos
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
								<v-container>
									<!-- criar servico -->
									<template>
										<v-dialog v-model="dialog" max-width="600px">
											<template v-slot:activator="{ on, attrs }">
												<v-btn
													dark
													block
													color="primary"
													class="mt-1"
													v-bind="attrs"
													v-on="on"
													>Criar Serviço</v-btn
												>
											</template>
											<v-card>
												<!-- inicio toolbar-->
												<v-toolbar dark color="primary">
													<v-toolbar-title>Serviços</v-toolbar-title>
													<v-spacer></v-spacer>
													<v-btn icon dark @click="dialog = false">
														<v-icon>mdi-close</v-icon>
													</v-btn>
												</v-toolbar>
												<v-card-text class="pa-5"></v-card-text>
												<!-- fim toolbar-->

												<v-form
													ref="form"
													v-model="valid"
													lazy-validation
													class="pb-3 pl-5 pr-5"
												>
													<v-text-field
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
													<v-card-actions>
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
													</v-card-actions>
												</v-form>
											</v-card>
										</v-dialog>
									</template>

									<!-- fim criar sesrvico -->
								</v-container>
								<div>
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
														<!-- EDITAR INICIO DO CARD -->
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
																	<!-- inicio toolbar-->
																	<v-toolbar dark color="primary">
																		<v-toolbar-title>Serviços</v-toolbar-title>
																		<v-spacer></v-spacer>
																		<v-btn
																			icon
																			dark
																			@click.stop="dialog1 = false"
																		>
																			<v-icon>mdi-close</v-icon>
																		</v-btn>
																	</v-toolbar>
																	<v-card-text class="pa-5"></v-card-text>
																	<!-- fim toolbar-->

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
																			@click.stop="
																				editarServico(edservico, edservico._id)
																					.stop
																			"
																		>
																			salvar
																		</v-btn>
																	</v-form>
																</v-card>
															</v-dialog>
														</template>
														<!-- FIM DO EDITAR -->
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
								</div>
							</div>
						</v-expand-transition>
						<!--fim expansao -->
						<!--agendamento -->
						<v-divider class="mb-6 mt-n1"></v-divider>
						<p class="mb-1 mt-n5 font-weight-light black--text">Agendamento</p>
						<v-container class="mb-3">
							<v-row>
								<v-col><Agendamento /></v-col>
							</v-row>
						</v-container>
						<v-divider class="mb-6 mt-n1"></v-divider>
						<!--fim agendamento -->
						<!--sobre -->
						<p class="mb-1 mt-n5 font-weight-light black--text">Sobre</p>
						<v-container
							class="mt-n2"
							v-model="barbeiro.data.barbeiro.usuarioId.sobre"
						>
							Lorem ipsum dolor sit amet consectetur, adipisicing elit.
							Quibusdam, alias, amet debitis quam sint quidem facere, soluta
							fugiat voluptates accusantium similique sed necessitatibus est
							illum eius harum sunt qui. Debitis?
						</v-container>
						<!--fim sobre -->
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
//import ServicoPOP from "../Popups/ServicoPOP";
import Agendamento from "../Popups/AgendamentoPOP";
import { mapState } from "vuex";
import { http } from "../services/config";
export default {
	components: {
		Agendamento,
		// ServicoPOP,
	},
	data: () => ({
		dialog: false,
		dialog1: false,
		show: false,
		valid: true,
		Rules: [(v) => !!v || "não pode ser deixado em branco"],
		servico2: {},
		edservico: {},
		servico: [],
		errors: [],
		barbeiro: [],
		barbeiroId: [],
	}),
	mounted() {
		// console.log(this.usuario);
		// console.log(this.token);
		this.listarBarbeiro();
	},
	computed: {
		...mapState({
			usuario: (state) => state.usuario.data.usuario.id,
			token: (state) => state.usuario.data.token,
		}),
	},
	updated() {
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
			http
				.delete(
					`/barbeiro/${this.barbeiroId}/excluir-servico/${servicos._id}`,
					{
						headers: { Authorization: `Bearer ${this.token}` },
					}
				)
				.then((resposta) => {
					alert(resposta.data.msg);
					this.listarServicos();
				})
				.catch((err) => {
					console.log(err.data.msg);
				});
		},
		listarBarbeiro() {
			http
				.get("barbeiro/get-barbeiro", {
					headers: { Authorization: `Bearer ${this.token}` },
				})
				.then((resposta) => {
					this.barbeiro = resposta;
					this.barbeiroId = this.barbeiro.data.barbeiro._id;
					console.log(this.barbeiro);
					console.log(this.barbeiroId);
				})
				.catch((err) => {
					console.log(err.message);
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
