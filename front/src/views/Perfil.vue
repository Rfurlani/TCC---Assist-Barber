<template>
	<div class="Perfil">
		<!--conteudo pagina  -->
		<v-container>
			<v-layout row wrap justify-center>
				<v-flex xs8 sm8 md8 lg8 xl8>
					<v-card color="white" height="500">
						<v-card class="pa-3 blue darken-4">
							<v-container>
								<v-layout column align-center>
									<v-flex>
										<h1 class="nome">teste</h1>
									</v-flex>
									<v-flex>
										<v-avatar size="150">
											<v-img src="../img/teste-red.jpg"> </v-img>
										</v-avatar>
									</v-flex>
									<v-container> </v-container>
								</v-layout>
							</v-container>
						</v-card>
						<v-toolbar dark dense flat>
							<template>
								<v-tabs grow v-model="tab">
									<v-tabs-slider color="red"></v-tabs-slider>
									<v-tab
										class="black white--text"
										v-for="item in items"
										:key="item"
									>
										{{ item }}
									</v-tab>
								</v-tabs>
							</template>
						</v-toolbar>

						<v-tabs-items v-model="tab">
							<v-tab-item>
								<v-card flat color="blue lighten-3">
									<v-card-text class="black--text"><Servico /></v-card-text>
								</v-card>
							</v-tab-item>
							<v-tab-item>
								<v-card flat color="blue lighten-3">
									<v-card-text class="black--text">d7537537537</v-card-text>
								</v-card>
							</v-tab-item>
							<v-tab-item>
								<v-card flat color="blue lighten-3">
									<v-card-text class="black--text">shsthsths</v-card-text>
								</v-card>
							</v-tab-item>
						</v-tabs-items>
					</v-card>
				</v-flex>
			</v-layout>
		</v-container>
	</div>
</template>

<script>
//teste
import Servico from "../components/Servico";
export default {
	components: {
		Servico,
	},
	data() {
		return {
			tab: null,
			items: ["Serviços", "Sobre", "Avaliações"],
			comp: [],
		};
	},
};
</script>
