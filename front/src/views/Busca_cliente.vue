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
										v-model="distancia"
										class="darken-5 pr-10"
										clearable
										label="Area de busca"
										placeholder="Ex.: 4000"
										type="text"
									>
									</v-text-field>
								</v-col>
								<v-col cols="6" class="mt-n5 mb-3 ml-10">
									<v-btn @click="buscaBarbeiros()" color="success"
										>Buscar</v-btn
									>
								</v-col>
							</v-row>
						</v-layout>
					</v-card>
					<!-- começo dos barbeiros -->

					<v-card
						dark
						class="pa-3 mt-3"
						color="blue darken-4"
						elevation="24"
						justify-center
					>
						<v-container class="mt-n2 mb-n2  ">
							<v-card
								flat
								color="white"
								class="pl-8 pt-3 pb-4 mb-1"
								v-for="barbeiro in busca_barbeiros"
								:key="barbeiro._id"
								@click="clicou(barbeiro.barbeiroId._id)"
								width="100%"
								height="70px"
							>
								<v-layout row wrap>
									<v-row>
										<v-col>
											<v-avatar size="50px" color="red" class="mt-2">
												<img src="../img/teste-red.jpg" alt="alt" />
											</v-avatar>
										</v-col>
										<v-col>
											<p style="color: black">
												{{ barbeiro.usuario_info.nome }}
											</p>
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
import { http } from "../services/config";
export default {
	components: {},
	data() {
		return {
			distancia: null,
			lng: "",
			lat: "",
			barbeiros: {},
		};
	},
	computed: {
		barbeiroId() {
			return this.$store.getters.get_barbeiroId;
		},
		token() {
			//token do usuario
			return this.$store.getters.get_token;
		},
		busca_barbeiros() {
			return this.$store.getters.get_busca_barbeiros;
		},
	},
	beforeMount() {
		this.getLocation();
	},

	methods: {
		clicou(barbeiroId) {
			this.$store.dispatch("passa_id", barbeiroId);
			this.$router.push("/perfil");
			alert(barbeiroId);
		},

		async buscaBarbeiros() {
			// console.log(this.lat, this.lng, this.distancia);
			try {
				const data = await http.get(`/barbeiro/geoPos/listar-proximos`, {
					params: { lng: this.lng, lat: this.lat, dist: this.distancia },
					headers: { Authorization: `Bearer ${this.token}` },
				});

				this.barbeiros = data.data.barbeiros;

				for (var i = 0; i < this.barbeiros.length; i++) {
					const info = await http
						.get(`/barbeiro/get-barbeiro/${this.barbeiros[i].barbeiroId._id}`, {
							headers: { Authorization: `Bearer ${this.token}` },
						})
						.then((resposta) => {
							this.teste = resposta.data.barbeiro.usuarioId;
							// console.log(this.teste);
							this.barbeiros[i].usuario_info = this.teste;

							// console.log(this.barbeiros[i]);
						})
						.catch((err) => {
							console.log(err.message);
						});
				}

				this.$store.dispatch("passa_busca_barbeiros", this.barbeiros);

				console.log(this.barbeiros);
			} catch (error) {
				console.log(error);
			}
		},
		getLocation() {
			//do we support geolocation
			if (!("geolocation" in navigator)) {
				this.errorStr = "Geolocation is not available.";
				return;
			}

			this.gettingLocation = true;
			// get position
			navigator.geolocation.getCurrentPosition(
				(pos) => {
					this.gettingLocation = false;
					this.lng = pos.coords.longitude;
					this.lat = pos.coords.latitude;
					// console.log(this.lat, this.lng);
				},
				(err) => {
					this.gettingLocation = false;
					this.errorStr = err.message;
				}
			);
		},
	},
};
</script>
