<template>
	<v-form>
		<v-layout row wrap class="pa-3">
			<v-container class="asd">
				<v-text-field
					v-model="usuario.nome"
					class="darken-5"
					clearable
					label="Nome"
					placeholder="Nome"
					outlined
					type="text"
				>
				</v-text-field>
				<v-text-field
					v-model="usuario.email"
					class="darken-5"
					clearable
					label="E-mail"
					placeholder="E-mail"
					outlined
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
					type="tel"
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
				>
				</v-text-field>
				<v-text-field
					class="darken-5"
					clearable
					label="Confirmar Senha"
					placeholder="Confirmar Senha"
					outlined
					:type="'password'"
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
					v-show="false"
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
			arquivos: null,
			usuario: {},
		};
	},
	methods: {
		CadastrarBarbeiro() {
			try {
				fetch("https://jsonplaceholder.typicode.com/todos", {
					method: "POST",
					body: JSON.stringify({
						nome: this.usuario.nome,
						telefone: this.usuario.telefone,
						email: this.usuario.email,
						senha: this.usuario.senha,
						cpf: this.usuario.cpf,
						cargo: (this.usuario.cargo = "2"),
					}),
					headers: { "Content-Type": "application/json" },
				});
			} catch (error) {
				console.log(error);
			}
		},
	},
};
</script>
<style></style>
