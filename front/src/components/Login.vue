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
			<div class="pt-3">
				<span class="ml-3">Login</span>
			</div>

			<v-container mt-n2 mb-n3>
				<span>Escolha a opção para logar:</span>
				<v-radio-group v-model="loginUsuario" row class="mt-n1">
					<v-radio label="Cliente" value="Cliente"></v-radio>
					<v-radio label="Barbeiro" value="Barbeiro"> </v-radio>
				</v-radio-group>
			</v-container>

			<v-container>
				<component v-bind:is="loginUsuario"></component>
			</v-container>
			<!-- <v-form ref="form" lazy-validation class="pa-3 mt-n8">
				<v-text-field
					label="e-mail"
					placeholder="Ex.: joaobatista@gmail.com"
					v-model="usuario.email"
					outlined
				></v-text-field>

				<v-text-field
					class="mt-n3"
					label="Senha"
					placeholder="senha"
					v-model="usuario.senha"
					outlined
					:type="'password'"
				></v-text-field>
				<v-btn color="success" class="" @click="Login"> Entrar </v-btn>
				<span style="color: blue" class="text-decoration-underline ml-5"
					>esqueci a senha</span
				>
			</v-form> -->
		</v-card>
	</v-menu>
</template>

<script>
import Cliente from "../components/Login/Cliente.vue";
import Barbeiro from "../components/Login/Barbeiro.vue";
import Autenticacao from "../services/autenticacao";
import router from "../router";
export default {
	data() {
		return {
			loginUsuario: "Cliente",
			usuario: {},
			errors: {},
		};
	},
	components: {
		Cliente,
		Barbeiro,
	},
	methods: {
		Login() {
			/*const axios = require("axios");
			axios
				.post("http://localhost:5000/usuarios/api/autenticar",
				{
					email: this.usuario.email,
					senha: this.usuario.senha,
				})
				.then(function (response) {
					//to para mapa principal
					router.push({ name: "Mapa" });
					console.log(response);
				})
				.catch(function (error) {
					console.log(error);
				});*/
			Autenticacao.login_cliente(this.usuario)
				.then((resposta) => {
					this.usuario = { resposta };
					console.log(resposta);
					console.log(resposta);
					alert(resposta);
					router.push({ name: "Mapa" });
					this.errors = {};
				})
				.catch((err) => {
					this.errors = err;
					alert(err);
					console.log(err);
				});
		},
	},
};
</script>
