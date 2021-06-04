<template>
	<v-form v-model="valid">
		<v-layout row wrap class="pa-3">
			<v-container>
				<p class="mb-3 mt-n5 font-weight-light">Dados Pessoais</p>

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
				<p class="mb-3 mt-n3 font-weight-light">Endereço</p>

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
				<p class="mb-3 mt-n3 font-weight-light">Certificados</p>
				<v-layout row wrap
					><v-row>
						<v-col cols="16" xs="16" sm="16" md="6" lg="6" xl="6"></v-col>

						<v-file-input
							v-model="arquivos"
							class="darken-5 px-6"
							color="blue darken-2"
							append-outer-icon="mdi-paperclip"
							prepend-icon
							label="Certificados"
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
					</v-row></v-layout
				>

				<v-btn block color="success" dark @click="CadastrarBarbeiro"
					>Cadastrar</v-btn
				>
			</v-container>
		</v-layout>
	</v-form>
</template>

<script>
import Cadastro from "../services/cadastro";
import router from "../router";
export default {
	data() {
		return {
			valid: false,
			arquivos: null,
			usuario: {},
			emailrules: [
				(v) => !!v || "É necessario informar um e-mail",
				(v) => /.+@.+/.test(v) || "E-mail deve ser válido ",
			],
			geralrules: [(v) => !!v || "não pode deixar em branco"],
		};
	},
	methods: {
		CadastrarBarbeiro() {
			/*
			const axios = require("axios");

			axios
				.post("http://localhost:5000/usuarios/api/cadastrar", {
					nome: this.usuario.nome,
					telefone: this.usuario.telefone,
					email: this.usuario.email,
					senha: this.usuario.senha,
					cpf: this.usuario.cpf,
					cargo: (this.usuario.cargo = "Barbeiro"),
				})
				.then(function (response) {
					console.log(response);
				})
				.catch(function (error) {
					console.log(error);
				});*/
			Cadastro.cadastro_barbeiro(this.usuario)
				.then((resposta) => {
					this.usuario = { resposta };
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
<style></style>
