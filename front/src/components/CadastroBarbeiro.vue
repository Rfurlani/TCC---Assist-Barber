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
					v-model="usuario.cpf"
					class="CPF darken-5"
					clearable
					label="CPF"
					placeholder="Cpf"
					outlined
					v-mask="'###.###.###-##'"
					type="text"
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
					v-model="resenha"
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

				<v-file-input
					v-model="arquivos"
					class="darken-5"
					color="blue darken-2"
					append-outer-icon="mdi-paperclip"
					prepend-icon
					label="CERTIFICADOS"
					multiple
					placeholder="IMG.Certificados"
					outlined
					v-show="true"
					required
				>
					<template v-slot:selection="{ index, text }">
						<v-chip v-if="index < 2" color="blue  darken-4" dark label small
							>{{ text }}
						</v-chip>
					</template>
				</v-file-input>

				<v-btn block color="success" dark @click="CadastrarBarbeiro"
					>Cadastrar</v-btn
				>
			</v-container>
		</v-layout>
	</v-form>
</template>

<script>
export default {
	data() {
		return {
			valid: false,
			arquivos: null,
			usuario: {},
			emailrules: [
				(v) => !!v || "É necessario informar um e-mail",
				(v) => /.+@.+/.test(v) || "E-mail must be valid",
			],
			geralrules: [(v) => !!v || "não pode deixar em branco"],
		};
	},
	methods: {
		CadastrarBarbeiro() {
			const axios = require("axios");

			axios
				.post("http://localhost:5000/usuario/cadastrar", {
					nome: this.usuario.nome,
					telefone: this.usuario.telefone,
					email: this.usuario.email,
					senha: this.usuario.senha,
					cpf: this.usuario.cpf,
					cargo: (this.usuario.cargo = 2),
				})
				.then(function (response) {
					console.log(response);
				})
				.catch(function (error) {
					console.log(error);
				});
		},
	},
};
</script>
<style></style>
