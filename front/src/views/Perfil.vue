<template>
	<v-row justify="center">
		<div class="Perfil">
			<!--conteudo pagina  -->
			<v-container>
				<v-layout row wrap justify-center>
					<v-flex xs12 sm12 md10 lg10 xl10>
						<v-card dark class="pa-3 blue darken-1" elevation="24">
							<v-container>
								<!-- nome e imagem -->
								<v-layout column align-center>
									<v-flex>
										<v-avatar size="150">
											<v-img src="../img/teste-red.jpg"> </v-img>
										</v-avatar>
									</v-flex>
									<v-flex class="mb-n2">
										<h1 class="nome">
											{{ barbeiro.data.barbeiro.usuarioId.nome }}
										</h1>
									</v-flex>
									<!-- fim nome e imagem -->
								</v-layout>
							</v-container>
							<v-divider class="mb-6 mt-n1"></v-divider>
							<p class="mb-n3 mt-n5 font-weight-light white--text">Sobre</p>
							<v-container class="pa-5">
								Lorem ipsum dolor sit amet consectetur, adipisicing elit.
								Quibusdam, alias, amet debitis quam sint quidem facere, soluta
								fugiat voluptates accusantium similique sed necessitatibus est
								illum eius harum sunt qui. Debitis?
							</v-container>
							<v-divider class="mb-8 mt-1"></v-divider>

							<v-card-actions class="mt-5">
								<p class="mb-n3 mt-n15 font-weight-light white--text">
									Serviços
								</p>

								<v-spacer></v-spacer>
								<v-btn icon @click="show = !show" class="mt-n12">
									<v-icon>{{
										show ? "mdi-chevron-up" : "mdi-chevron-down"
									}}</v-icon>
								</v-btn>
							</v-card-actions>

							<v-expand-transition>
								<div v-show="show">
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
												<tr v-for="servicos in servico" :key="servicos._id">
													<td>{{ servicos.nome }}</td>
													<td>{{ servicos.descricao }}</td>
													<td>R${{ servicos.preco }}</td>
												</tr>
											</tbody>
										</template>
									</v-simple-table>
								</div>
							</v-expand-transition>

							<v-divider class="mb-6 mt-n1"></v-divider>
							<p class="mb-n3 mt-n5 font-weight-light white--text">
								Agendamento
							</p>
							<v-container class="ml-n1 ma-3">
								<v-row justify="space-around" class="mt-1">
									<v-col><Agendamento /></v-col> </v-row
							></v-container>
							<v-divider class="mb-6 mt-n1"></v-divider>
							<p class="mb-n3 mt-n5 font-weight-light white--text">
								Avaliação
							</p>
							<v-container class="pa-5">
								<v-layout row wrap>
									<v-row>
										<v-col>
											<div class="text-center mt-5">
												<v-rating
													v-model="rating"
													background-color="white"
													color="red accent-4"
													dense
													half-increments
													size="50"
													readonly
												></v-rating>
											</div>
										</v-col>
										<v-col>
											<v-card flat color="rgb(255, 0, 0, 0.0)">
												<div
													class="text-center mt-n5 font-weight-light white--text"
												>
													Nota
												</div>
												<div
													class="text-center mt-1"
													style="font-size: 50px; color: red"
												>
													{{ rating }}
												</div>
											</v-card>
										</v-col>
									</v-row>
								</v-layout>
							</v-container>
							<v-divider class="mb-6 mt-n1"></v-divider>
							<p class="mb-n3 mt-n5 font-weight-light white--text">
								Certificados
							</p>
							<v-container class="pa-5">
								<v-layout row wrap>
									<v-row>
										<v-col> </v-col>
										<v-col> </v-col>
									</v-row>
								</v-layout>
							</v-container>
						</v-card>
					</v-flex>
				</v-layout>
			</v-container>
		</div>
	</v-row>
</template>

<script>
import Agendamento from "../Popups/AgendamentoPOP";
import { http } from "../services/config";
export default {
	components: {
		Agendamento,
	},

	data() {
		return {
			dialog: false,
			show: false,
			rating: 3.5,
			servico: [],
			barbeiro: [],
		};
	},

	mounted() {
		this.listarBarbeiro();
		this.listarServicos();
	},

	computed: {
		token() {
			//token do usuario
			return this.$store.getters.get_token;
		},
		barbeiroId() {
			return this.$store.getters.get_barbeiroId;
		},
	},

	methods: {
		listarBarbeiro() {
			http
				.get(`/barbeiro/get-barbeiro/${this.barbeiroId}`, {
					headers: { Authorization: `Bearer ${this.token}` },
				})
				.then((resposta) => {
					this.barbeiro = resposta;
				})
				.catch((err) => {
					console.log(err.message);
				});
		},
		listarServicos() {
			http
				.get(`/barbeiro/${this.barbeiroId}/listar-servicos`, {
					headers: { Authorization: `Bearer ${this.token}` },
				})
				.then((resposta) => {
					this.servico = resposta.data.servicos;
					this.$store.dispatch("passa_servicos", this.servico);
				})
				.catch((err) => {
					console.log(err.message);
				});
		},
	},
};
</script>
