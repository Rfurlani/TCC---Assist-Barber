<template>
	<v-menu :close-on-content-click="false" :nudge-width="200" offset-y>
		<template v-slot:activator="{ on, attrs }">
			<v-btn v-bind="attrs" v-on="on" small text class="ml-5">
				<span>
					Login
					<v-icon>mdi-account-key</v-icon>
				</span>
			</v-btn>
		</template>

		<v-card>
			<span class="ml-3">Login</span>
			<v-form ref="form" lazy-validation class="pa-3">
				<v-text-field
					label="e-mail"
					placeholder="Ex.: joaobatista@gmail.com"
					v-model="email"
					outlined
				></v-text-field>

				<v-text-field
					label="Senha"
					placeholder="senha"
					v-model="senha"
					outlined
					:type="'password'"
				></v-text-field>
				<v-btn color="success" class="mr-4" @click="Login"> Entrar </v-btn>
			</v-form>
		</v-card>
	</v-menu>
</template>

<script>
export default {
	data() {
		return {
			usuario:{},
			email: "",
			senha: "",
		};
	},
	methods: {
		Login() {
			const axios = require("axios");
			axios
				.post("http://localhost:5000/usuario/login", {
					email: this.usuario.email,
					senha: this.usuario.senha,
				})
				.then(function (response) {
					//to para mapa principal
					console.log(response);
				})
				.catch(function (error) {
					console.log(error);
				});
		},
	},
};
</script>
