<template>
	<v-form v-model="valid">
		<v-layout row wrap class="pa-3">
			<v-container>
				<v-text-field
					v-model="usuario.nome"
					class="darken-5"
					clearable
					label="Nome"
					placeholder="Nome"
					outlined
					type="text"
					required
					:rules="geralrules"
				>
				</v-text-field>
				<v-text-field
					v-model="usuario.email"
					class="darken-5"
					clearable
					label="E-mail"
					placeholder="E-mail"
					outlined
					required
					:rules="emailrules"
				>
				</v-text-field>
				<v-text-field
					v-model="usuario.telefone"
					class="darken-5"
					clearable
					label="Telefone"
					placeholder="Telefone"
					outlined
					type="tel"
					v-mask="'(##) #####-#####'"
					required
					:rules="geralrules"
				>
				</v-text-field>
				<v-text-field
					v-model="usuario.senha"
					class="darken-5"
					clearable
					label="Senha"
					placeholder="Senha"
					outlined
					:type="'password'"
					required
					:rules="geralrules"
				>
				</v-text-field>
				<v-text-field
					v-model="reSenha"
					class="darken-5"
					clearable
					label="Confirmar Senha"
					placeholder="Confirmar Senha"
					outlined
					:type="'password'"
					required
					:rules="geralrules"
				>
				</v-text-field>

				<v-btn block color="success" @click="CadastrarCliente">Cadastrar</v-btn>
			</v-container>
		</v-layout>
	</v-form>
</template>

<script>
import router from "../router";
export default {
	data() {
		return {
			usuario: {},
			emailrules: [
				(v) => !!v || "É necessario informar um e-mail",
				(v) => /.+@.+/.test(v) || "E-mail must be valid",
			],
			geralrules: [(v) => !!v || "não pode deixar em branco"],
			/*regras: {
				obrigatorio: value => !!value || "Campo obrigatório.",
				mininimo: v => v.length >= 8 || "Mínimo de 8 caractéres.",
			}*/
		};
	},

	methods: {
		CadastrarCliente() {
			const axios = require("axios");

			axios
				.post("http://localhost:5000/usuarios/api/cadastrar", {
					nome: this.usuario.nome,
					telefone: this.usuario.telefone,
					email: this.usuario.email,
					senha: this.usuario.senha,
					cargo: (this.usuario.cargo = "Cliente"),
				})
				.then(function (response) {
					console.log(response);
					alert(response);
					router.push({ path: "/" });
				})
				.catch(function (error) {
					console.log(error);
					alert(error);
				});
		},
	},
};
</script>
