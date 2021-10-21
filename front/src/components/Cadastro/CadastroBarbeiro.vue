<template>
	<v-form v-model="valid" lazy-validation ref="form">
		<v-layout row wrap class="pa-3">
			<v-container>
				<p class="mb-3 mt-n5 font-weight-light">Dados Pessoais</p>
				<v-layout row wrap px-4>
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
						<v-col cols="12" xs="12" sm="12" md="4" lg="4" xl="4">
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
						<v-col cols="12" xs="12" sm="12" md="4" lg="4" xl="4">
							<v-text-field
								v-model="usuario.telefone"
								class="darken-5 mb-n6"
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
						<v-col cols="12" xs="12" sm="12" md="4" lg="4" xl="4">
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
								:rules="validarCpf"
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
					:rules="[geralrules, validarSenha]"
				>
				</v-text-field>
				<p class="mb-3 mt-n3 font-weight-light">Certificados</p>
				<v-layout row wrap
					><v-row>
						<v-col cols="12" xs="12" sm="12" md="12" lg="12" xl="12"></v-col>

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

				<v-btn
					class="mt-5"
					block
					:disabled="!valid"
					color="success"
					@click="CadastrarBarbeiro"
					>Cadastrar</v-btn
				>
			</v-container>
		</v-layout>
	</v-form>
</template>

<script>
import Cadastro from "../../services/cadastro";
import router from "../../router";
import { cpf } from "cpf-cnpj-validator";
export default {
	name: "cadastro_barbeiro",
	data() {
		return {
			valid: true,
			arquivos: null,
			resenha: "",
			usuario: { cargo: "barbeiro" },
			emailrules: [
				(v) => !!v || "É necessario informar um e-mail",
				(v) => /.+@.+/.test(v) || "E-mail deve ser válido ",
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
		validarCpf() {
			return cpf.isValid(this.usuario.cpf) || "CPF deve ser válido";
		},
	},

	methods: {
		CadastrarBarbeiro() {
			Cadastro.cadastro_usuario(this.usuario)
				.then((resposta) => {
					this.usuario = { resposta };
					console.log(resposta.data.msg);
					alert(resposta.data.msg);
					router.push({ path: "/" });
					this.errors = {};
				})
				.catch((err) => {
					alert(err.renponse.data.msg);
				});
		},
	},
};
</script>
<style></style>
