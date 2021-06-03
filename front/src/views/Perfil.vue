<template>
	<v-container>
		<div class="Perfil">
			<!--conteudo pagina  -->
			<v-container>
				<v-layout row wrap justify-center>
					<v-flex xs8 sm8 md8 lg6 xl6>
						<v-card dark class="pa-3 blue darken-4" elevation="24">
							<v-container>
								<!-- nome e imagem -->
								<v-layout column align-center>
									<v-flex>
										<v-avatar size="150">
											<v-img src="../img/teste-red.jpg"> </v-img>
										</v-avatar>
									</v-flex>
									<v-flex class="mb-n2">
										<h1 class="nome">Rodrigo Furlani</h1>
									</v-flex>
									<!-- nome e imagem -->
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
							<v-divider class="mb-6 mt-n1"></v-divider>
							<p class="mb-n3 mt-n5 font-weight-light white--text">Serviços</p>
							<v-container class="pa-5"> </v-container>
							<v-divider class="mb-6 mt-n1"></v-divider>
							<p class="mb-n3 mt-n5 font-weight-light white--text">
								Agendamento
							</p>
							<v-container class="ml-n1 ma-3">
								<v-row justify="space-around" class="mt-1">
									<v-col><Agendamento /></v-col>
									<v-col><AgendamentoExpresso /></v-col> </v-row
							></v-container>
							<v-divider class="mb-6 mt-n1"></v-divider>
							<p class="mb-n3 mt-n5 font-weight-light white--text">Avaliação</p>
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
													{{ nota }}
												</div>
											</v-card>
										</v-col>
									</v-row>
								</v-layout>
							</v-container>
						</v-card>
					</v-flex>
				</v-layout>
			</v-container>
		</div>
	</v-container>
</template>

<script>
import Agendamento from "../Popups/AgendamentoPOP";
import AgendamentoExpresso from "../Popups/AgendamentoExpressoPOP";

export default {
	components: {
		Agendamento,
		AgendamentoExpresso,
	},
	data() {
		return {
			rating: 5,
			nota: 5,
		};
	},
};
</script>
