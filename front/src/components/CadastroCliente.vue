<template>
	<v-form>
		<v-layout row wrap class="pa-3">
			<v-container>
				<v-text-field
					v-model="usuario.nome"
					class="darken-5"
					clearable
					label="Nome"
					placeholder="Nome"
					outlined
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
					class="darken-5"
					clearable
					label="CPF"
					placeholder="Cpf"
					outlined
					type="tel"
					v-mask="'###.###.###-##'"
					masked="true"
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
					v-model="reSenha"
					class="darken-5"
					clearable
					label="Confirmar Senha"
					placeholder="Confirmar Senha"
					outlined
					:type="'password'"
				>
				</v-text-field>

				<v-btn block color="success" @click="CadastrarCliente">Cadastrar</v-btn>
			</v-container>
		</v-layout>
	</v-form>
</template>

<script>
export default {
	data() {
		return {
			usuario: {},
			/*regras: {
				obrigatorio: value => !!value || "Campo obrigatório.",
				mininimo: v => v.length >= 8 || "Mínimo de 8 caractéres.",
			}*/
		};
	},

	methods: {
		CadastrarCliente() {
			try {
				fetch("https://jsonplaceholder.typicode.com/todos", {
					method: "POST",
					body: JSON.stringify({
						nome: this.usuario.nome,
						telefone: this.usuario.telefone,
						email: this.usuario.email,
						senha: this.usuario.senha,
						cpf: this.usuario.cpf,
						cargo: (this.usuario.cargo = "1"),
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
