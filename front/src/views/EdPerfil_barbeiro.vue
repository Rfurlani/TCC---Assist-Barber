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
								<v-btn color="success">text</v-btn>
								<v-simple-table dense>
									<template v-slot:default>
										<thead>
											<tr>
												<th class="text-left">Serviços</th>
												<th class="text-left">Descrição</th>
												<th class="text-left">Preço</th>
												<th class="text-left">Ações</th>
											</tr>
										</thead>
										<tbody>
											<tr v-for="servico in servicos" :key="servico.nome">
												<td>{{ servico.nome }}</td>
												<td>{{ servico.descricao }}</td>
												<td>{{ servico.preco }}</td>
												<td>
													<v-icon
														@click="editar(produto)"
														class="btn-small blue darken-1"
														>mdi-pencil</v-icon
													>
													<v-icon
														@click="remover(produto)"
														class="btn-small red darken-1"
														>mdi-delete-empty</v-icon
													>
												</td>
											</tr>
										</tbody>
									</template>
								</v-simple-table>
							</div>
						</v-expand-transition>

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
export default {
	data: () => ({
		show: false,
		dialog: false,

		servicos: [
			{
				nome: "tesoura",
				descricao: "corte somente na tesoura",
				preco: "15,00",
			},
		],
	}),
};
</script>
