<template>
	<v-dialog v-model="dialog" max-width="800" persistent>
		<template v-slot:activator="{ on, attrs }">
			<v-btn color="success" class="mt-1" v-bind="attrs" v-on="on" small
				>Inserir</v-btn
			>
		</template>
		<v-card>
			<!-- inicio toolbar-->
			<v-toolbar dark color="primary">
				<v-toolbar-title>Serviços</v-toolbar-title>
				<v-spacer></v-spacer>{{ servico.nome }}
				<v-btn icon dark @click="dialog = false">
					<v-icon>mdi-close</v-icon>
				</v-btn>
			</v-toolbar>
			<v-card-text class="pa-5"></v-card-text>
			<!-- fim toolbar-->

			<v-form ref="form" v-model="valid" lazy-validation class="pb-3 pl-5 pr-5">
				<v-text-field
					v-model="servico.nome"
					:rules="servicoRules"
					label="Serviço"
					placeholder="Serviço"
					outlined
				></v-text-field>

				<v-text-field
					v-model="servico.descricao"
					clearable
					label="Descrição"
					placeholder="Descrição"
					outlined
				></v-text-field>
				<v-text-field
					v-model="servico.preco"
					:rules="precoRules"
					clearable
					label="Preço"
					placeholder="Preço"
					outlined
				></v-text-field>

				<v-btn :disabled="!valid" color="success" class="mr-4" @click="salvar">
					Cadastrar
				</v-btn>

				<v-btn color="error" class="mr-4" @click="reset"> Limpar </v-btn>
			</v-form>
		</v-card>
	</v-dialog>
</template>

<script>
//teste
import Servico from "../services/servico";

export default {
	data() {
		return {
			dialog: false,
			valid: true,
			servicoRules: [(v) => !!v || "deve ter nome do serviço"],
			precoRules: [],
			servico: {
				nome: "",
				descricao: "",
				preco: "",
				userId: "teste",
			},
			servicos: [],
			errors: [],
		};
	},
	methods: {
		salvar() {
			Servico.cadastrar_servico(this.servico)
				.then((resposta) => {
					this.servico = { resposta };
					console.log(resposta);
					alert("Cadastrado com sucesso!");
					this.listarServicos();
					this.errors = {};
				})
				.catch((e) => {
					this.errors = e.response.data.errors;
				});
		},
	},
};
</script>
