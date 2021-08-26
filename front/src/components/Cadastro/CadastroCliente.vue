<template>
	<v-form v-model="valid" lazy-validation ref="form">
		<v-layout row wrap class="pa-3">
			<v-container>
				<p class="mb-3 mt-n5 font-weight-light">Dados Pessoais</p>
				<v-layout row wrap px-3>
					<v-row>
						<v-col cols="12" xs="12" sm="12" md="12" lg="12" xl="12">
							<v-text-field
								v-model="usuario.nome"
								class="darken-5 mt-2 mb-n6"
								clearable
								label="Nome"
								placeholder="Nome"
								outlined
								type="text"
								required
								:rules="geralrules"
							>
							</v-text-field>
						</v-col>
						<v-col cols="12" xs="12" sm="12" md="12" lg="4" xl="4">
							<v-text-field
								v-model="usuario.email"
								class="darken-5 mb-n6"
								clearable
								label="E-mail"
								placeholder="E-mail"
								outlined
								required
								:rules="emailrules"
							>
							</v-text-field>
						</v-col>
						<v-col cols="12" xs="12" sm="12" md="12" lg="4" xl="4">
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
						</v-col>
					</v-row>
				</v-layout>

				<p class="mb-6 mt-n3 font-weight-light">Endereço</p>

				<v-layout row wrap>
					<v-row>
						<v-col cols="12" xs="12" sm="12" md="6" lg="6" xl="6">
							<v-text-field
								v-model="usuario.endereco.cidade"
								class="darken-5 px-3 mb-n6"
								clearable
								label="Cidade"
								placeholder="Cidade"
								outlined
								required
								:rules="geralrules"
							>
							</v-text-field>
						</v-col>
						<v-col cols="12" xs="12" sm="12" md="6" lg="6" xl="6">
							<v-text-field
								v-model="usuario.endereco.rua"
								class="darken-5 px-3 mb-n6"
								clearable
								label="Rua"
								placeholder="Rua"
								outlined
								required
								:rules="geralrules"
							>
							</v-text-field>
						</v-col>
						<v-col cols="12" xs="12" sm="12" md="6" lg="6" xl="6">
							<v-text-field
								v-model="usuario.endereco.complemento"
								class="darken-5 px-3"
								clearable
								label="Complemento"
								placeholder="Complemento"
								outlined
							>
							</v-text-field>
						</v-col>

						<v-col cols="12" xs="4" sm="4" md="4">
							<v-text-field
								v-model="usuario.endereco.bairro"
								class="darken-5 px-3 mt-n6"
								clearable
								label="Bairro"
								placeholder="Bairro"
								outlined
								required
								type="text"
								:rules="geralrules"
							>
							</v-text-field>
						</v-col>
						<v-col cols="12" xs="4" sm="4" md="4">
							<v-text-field
								v-model.number="usuario.endereco.numero"
								class="darken-5 px-3 mt-n6"
								clearable
								label="Numero"
								placeholder="Numero"
								outlined
								required
								type="number"
								:rules="geralrules"
							>
							</v-text-field>
						</v-col>
						<v-col cols="12" xs="4" sm="4" md="4">
							<v-text-field
								v-model="usuario.endereco.estado"
								class="darken-5 px-3 mt-n6"
								clearable
								label="Estado"
								placeholder="Estado"
								outlined
								required7
								type="text"
								:rules="geralrules"
							>
							</v-text-field>
						</v-col>
					</v-row>
				</v-layout>
				<p class="mb-3 mt-n3 font-weight-light">Segurança</p>

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
					:rules="validarSenha"
				>
				</v-text-field>

				<v-btn
					block
					:disabled="!valid"
					color="success"
					@click="CadastrarCliente"
					>Cadastrar</v-btn
				>
			</v-container>
		</v-layout>
	</v-form>
</template>

<script>
import Cadastro from "../../services/cadastro";
import router from "../../router";
export default {
	name: "cadastro_cliente",
	data() {
		return {
			valid: true,
			resenha: "",
			usuario: {
				cargo: "cliente",
				endereco: {},
			},
			emailrules: [
				(v) => !!v || "É necessario informar um e-mail",
				(v) => /.+@.+/.test(v) || "E-mail must be valid",
			],
			geralrules: [(v) => !!v || "não pode deixar em branco"],
		};
	},
	computed: {
		validarSenha() {
			return (
				this.usuario.senha === this.resenha || "As senhas devem ser iguais"
			);
		},
	},

	methods: {
		CadastrarCliente() {
			/*
			const axios = require("axios");

			axios
				.post("http://localhost:5000/usuarios/api/cadastrar-cliente", {
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
				*/
			Cadastro.cadastro_usuario(this.usuario)
				.then((resposta) => {
					this.usuario = { resposta };
					console.log(resposta.data.msg);
					alert(resposta.data.msg);
					router.push({ path: "/" });
					this.errors = {};
				})
				.catch((err) => {
					this.errors = err;
					alert(err.data.msg);
					console.log(err.data.msg);
				});
		},
	},
};
</script>
