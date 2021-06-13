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
																@click="editar_telefone(telefone)"
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
																@click="editar_email(email)"
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
								<ServicoPOP />
								<v-simple-table>
									<template v-slot:default>
										<thead>
											<tr>
												<th class="text-left">Serviços</th>
												<th class="text-left">Descrição</th>
												<th class="text-left">Preço</th>
											</tr>
										</thead>
										<tbody>
											<tr v-for="servico in servicos" :key="servico.id">
												<td>{{ servico.nome }}</td>
												<td>{{ servico.descricao }}</td>
												<td>{{ servico.preco }}</td>
											</tr>
										</tbody>
									</template>
								</v-simple-table>
							</div>
						</v-expand-transition>
						<!--fim expansao -->
						<!--agendamento -->
						<v-divider class="mb-6 mt-n1"></v-divider>
						<p class="mb-1 mt-n5 font-weight-light black--text">Agendamento</p>
						<v-container class="mb-3">
							<v-row align="center" justify="space-around">
								<v-col><Agendamento /></v-col>
								<v-col><AgendamentoExpresso /></v-col
							></v-row>
						</v-container>
						<v-divider class="mb-6 mt-n1"></v-divider>
						<!--fim agendamento -->
						<!--sobre -->
						<p class="mb-1 mt-n5 font-weight-light black--text">Sobre</p>
						<v-container class="mt-n2">
							Lorem ipsum dolor sit amet consectetur, adipisicing elit.
							Quibusdam, alias, amet debitis quam sint quidem facere, soluta
							fugiat voluptates accusantium similique sed necessitatibus est
							illum eius harum sunt qui. Debitis?
						</v-container>
						<v-container>
							<v-row justify="end" class="pr-3">
								<v-dialog
									v-model="dialogSobre"
									transition="dialog-bottom-transition"
									width="500px"
								>
									<template v-slot:activator="{ on, attrs }">
										<v-btn
											small
											v-bind="attrs"
											v-on="on"
											color="primary"
											class="mb-3"
											>modificar</v-btn
										>
									</template>
									<v-card>
										<v-toolbar dark color="primary">
											<v-toolbar-title>Sobre</v-toolbar-title>
											<v-spacer></v-spacer>
											<v-btn icon @click="dialogSobre = false">
												<v-icon>mdi-close</v-icon>
											</v-btn>
										</v-toolbar>
										<v-card-text>
											<v-textarea
												class="mt-5"
												outlined
												name="input-7-4"
												label="Sobre"
												v-model="sobre"
											></v-textarea>

											<v-btn @click="dialogSobre = false"> Save </v-btn>
										</v-card-text>
									</v-card>
								</v-dialog>
							</v-row>
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
import ServicoPOP from "../Popups/ServicoPOP";
import Agendamento from "../Popups/AgendamentoPOP";
import AgendamentoExpresso from "../Popups/AgendamentoExpressoPOP";
import Servico from "../services/servico";
import Cliente from "../services/cliente";
export default {
	components: {
		Agendamento,
		AgendamentoExpresso,
		ServicoPOP,
	},
	data: () => ({
		show: false,
		dialog: false,
		dialog1: false,
		dialog2: false,
		dialogSobre: false,
		servico: {
			nome: "",
			descricao: "",
			preco: "",
			userId: "teste",
			id: null,
		},
		servicos: [],
		errors: [],
	}), //Mounted é quando a pagina carrega pela primeira vez
	/*mounted(){
		this.listar();
	},*/ mounted() {
		console.log();
		this.listarCliente();
	},
	updated() {
		//Updated quando a pagina sofre alteracao
		this.listar();
	},
	methods: {
		listar() {
			Servico.listarServicos()
				.then((resposta) => {
					this.servicos = resposta.data;
					console.log(resposta.data);
				})
				.catch((e) => {
					console.log(e);
				});
		},
		listarCliente() {
			Cliente.buscar()
				.then((resposta) => {
					console.log(resposta.data);
				})
				.catch((e) => {
					console.log(e);
				});
		},
	},
};
</script>
