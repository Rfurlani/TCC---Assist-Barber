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
						<p class="mb-1 mt-n5 font-weight-light black--text">Serviços</p>

						<v-container class="mb-3">
							<v-row>
								<v-col><Servicos /></v-col>
							</v-row>
						</v-container>
						<!-- <v-divider class="mb-6 mt-n1"></v-divider>
						<p class="mb-1 mt-n5 font-weight-light black--text">Agendamento</p>
						<v-container class="mb-3">
							<v-row>
								<v-col><Agendamento /></v-col>
							</v-row>
						</v-container> -->
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
import Servicos from "../../Popups/ServicosPOP2.vue";
import AttPerfil from "./AtualizaPerfil/AtualizaPerfil.vue";
import { http } from "../../services/config";
export default {
	components: {
		Servicos,
		AttPerfil,
	},
	data: () => ({
		dialog: false,
		dialog1: false,
		valid: true,
		Rules: [(v) => !!v || "não pode ser deixado em branco"],
		errors: [],
		barbeiro: [],
		barbeiroId: "",
	}),
	created() {
		this.listarBarbeiro();
	},
	computed: {
		token() {
			//token do usuario
			return this.$store.getters.get_token;
		},
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
					console.log(err);
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
					this.$store.dispatch("passa_id", this.barbeiroId);
					console.log(this.barbeiro);
					this.$store.dispatch(
						"passa_idAgenda_barbeiro",
						this.barbeiro.data.barbeiro.usuarioId.agenda
					);
					// this.$store.dispatch(
					// 	"passa_usuario_cargo",
					// 	this.barbeiro.data.barbeiro.usuarioId.cargo
					// );
				})
				.catch((err) => {
					console.log(err.message);
				});
		},
	},
};
</script>
