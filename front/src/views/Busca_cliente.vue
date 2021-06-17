<template>
	<v-container>
		<v-layout row wrap justify-center style="margin-top: 5%">
			<v-flex xs10 sm10 md10 lg8 xl8>
				<v-container>
					<v-card dark class="pa-3" color="blue darken-4" elevation="24">
						<v-layout row wrap>
							<v-row>
								<v-col cols="9" class="ml-10">
									<v-text-field
										v-model="area"
										class="darken-5 pr-10"
										clearable
										label="Area de busca"
										placeholder="Ex.: 4000"
										type="text"
									>
									</v-text-field>
								</v-col>
								<v-col cols="6" class="mt-n5 mb-3 ml-10">
									<v-btn color="success">Buscar</v-btn>
								</v-col>
							</v-row>
						</v-layout>
					</v-card>
					<v-card dark class="pa-3 mt-3" color="blue darken-4" elevation="24">
						<v-container class="mt-n2 mb-n2 d-flex justify-center">
							<v-card
								flat
								color="white"
								class="pl-8 pt-3 pb-4 mb-1"
								v-for="barbeiro in barbeiros"
								:key="barbeiro"
								@click="clicou"
								width="75%"
								height="70px"
							>
								<v-layout row wrap>
									<v-row>
										<v-col col="8">
											<v-avatar size="50px" color="red" class="mt-2">
												<img src="../img/teste-red.jpg" alt="alt" />
											</v-avatar>
										</v-col>
										<v-col>
											<p style="color: black">{{ barbeiro.nome }}</p>
										</v-col>
									</v-row>
								</v-layout>
							</v-card>
						</v-container>
					</v-card>
				</v-container>
			</v-flex>
		</v-layout>
	</v-container>
</template>

<script>
export default {
	components: {},
	data() {
		return {
			barbeiros: [{ nome: "teste" }],
		};
	},
	methods: {
		clicou() {
			alert("fui clicado");
		},
	},
};
</script>
