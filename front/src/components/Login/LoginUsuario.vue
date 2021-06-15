<template>
	<v-form ref="form" lazy-validation class="pa-3 mt-n4">
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
	</v-form>
</template>
<script>
import Autenticacao from "../../services/autenticacao";
import router from "../../router";

export default {
	data() {
		return {
			usuario: {},
			errors: {},
		};
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
			Autenticacao.login_usuario(this.usuario)
				.then((resposta) => {
					this.usuario = { resposta };
					console.log(resposta);
					console.log(resposta.data.msg);
					alert(resposta.data.msg);
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
