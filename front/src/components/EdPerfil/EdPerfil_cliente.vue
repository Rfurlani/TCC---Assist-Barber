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
											{{ cliente.data.cliente.usuarioId.nome }}
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
															{{ cliente.data.cliente.usuarioId.telefone }}
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
															{{ cliente.data.cliente.usuarioId.email }}
														</span>
													</v-card-text>
												</v-col>
											</v-row>
										</template>
									</v-card>
								</v-col>
							</v-row>
						</v-container>
						<v-divider class="mb-6 mt-n1"></v-divider>
						<p class="mt-n3 mb-5 ml-1 font-weight-light black--text">
							Endereço
						</p>
						<v-container>
							<v-row>
								<v-col cols="12" xs="6" sm="6" md="6" lg="6" xl="6">
									<v-text-field
										v-model="cliente.data.cliente.endereco.cidade"
										class="darken-5 mb-n7"
										label="Cidade"
										outlined
										disabled
									>
									</v-text-field>
								</v-col>
								<v-col cols="12" xs="6" sm="6" md="6" lg="6" xl="6">
									<v-text-field
										v-model="cliente.data.cliente.endereco.rua"
										class="darken-5 mb-n7"
										label="Rua"
										outlined
										disabled
									>
									</v-text-field>
								</v-col>
								<v-col cols="12" xs="6" sm="6" md="6" lg="6" xl="6">
									<v-text-field
										v-model="cliente.data.cliente.endereco.complemento"
										class="darken-5 mb-n7"
										label="Complemento"
										outlined
										disabled
									>
									</v-text-field>
								</v-col>

								<v-col cols="12" xs="6" sm="6" md="6" lg="4" xl="4">
									<v-text-field
										v-model="cliente.data.cliente.endereco.bairro"
										class="darken-5 mb-n7"
										label="Bairro"
										outlined
										disabled
										type="text"
									>
									</v-text-field>
								</v-col>
								<v-col cols="12" xs="6" sm="6" md="6" lg="4" xl="4">
									<v-text-field
										v-model.number="cliente.data.cliente.endereco.numero"
										class="darken-5  mb-n7"
										label="Numero"
										outlined
										disabled
										type="number"
									>
									</v-text-field>
								</v-col>
								<v-col cols="12" xs="6" sm="6" md="6" lg="4" xl="4">
									<v-text-field
										v-model="cliente.data.cliente.endereco.estado"
										class="darken-5 "
										label="Estado"
										outlined
										disabled
										type="text"
									>
									</v-text-field>
								</v-col>
							</v-row>
						</v-container>
						<v-divider class="mb-6 mt-n1"></v-divider>
						<p class="mt-n4 mb-1 ml-1 font-weight-light black--text">
							Informaçoes
						</p>
						<v-container class="mb-3">
							<v-row>
								<v-col><AttPerfil /></v-col>
							</v-row>
						</v-container>
					</v-container>
				</v-layout>
			</v-form>

			<!--fim formulario -->
		</v-card>
	</v-container>
</template>

<script>
import AttPerfil from "./AtualizaPerfil/AtualizaPerfil.vue";
import { http } from "../../services/config";
export default {
	components: {},
	data: () => ({
		errors: [],
		cliente: [],
	}),
	components: {
		AttPerfil,
	},
	created() {
		this.listarCliente();
		console.log(this.usuario);
	},
	computed: {
		usuario() {
			return this.$store.getters.get_usuario;
		},
		token() {
			return this.$store.getters.get_token;
		},
	},
	methods: {
		listarCliente() {
			http
				.get("cliente/get-cliente", {
					headers: { Authorization: `Bearer ${this.token}` },
				})
				.then((resposta) => {
					this.cliente = resposta;
					console.log(this.cliente);
					this.$store.dispatch("passa_cliente", this.cliente);
					this.$store.dispatch(
						"passa_idAgenda_cliente",
						this.cliente.data.cliente.usuarioId.agenda
					);
				})
				.catch((err) => {
					console.log(err.message);
				});
		},
	},
};
</script>
