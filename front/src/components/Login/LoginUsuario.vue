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
	name: "Login",
	data() {
		return {
			usuario: {},
			errors: {},
		};
	},
	methods: {
		Login() {
			Autenticacao.login_usuario(this.usuario)
				.then((resposta) => {
					this.usuario = { resposta };
					localStorage.setItem("usuario", JSON.stringify(resposta));
					this.$store.dispatch("passa_token", this.usuario.resposta.data.token);
					this.$store.dispatch(
						"passa_usuario",
						this.usuario.resposta.data.usuario.id
					);
					this.$store.dispatch(
						"passa_usuario_cargo",
						this.usuario.resposta.data.usuario.cargo
					);

					console.log(this.usuario.resposta.data);
					alert(resposta.data.msg);
					router.push({ name: "EdPerfil" });
					this.errors = {};
				})
				.catch((err) => {
					console.log(err.response.data);
					this.errors = err;
					alert(err.response.data.msg);
					alert("Usuario ou Senha Incorreta");

					console.log(err.data.msg);
				});
		},
	},
};
</script>
