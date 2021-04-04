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
				<v-toolbar-title>inserir Serviços</v-toolbar-title>
				<v-spacer></v-spacer>
				<v-btn icon dark @click="dialog = false">
					<v-icon>mdi-close</v-icon>
				</v-btn>
			</v-toolbar>
			<v-card-text class="pa-5"></v-card-text>
			<!-- fim toolbar-->

			<v-form ref="form" v-model="valid" lazy-validation class="pb-3 pl-5 pr-5">
				<v-text-field
					v-model="servico"
					:rules="servicoRules"
					label="Serviço"
					placeholder="Serviço"
					outlined
				></v-text-field>

				<v-text-field
					v-model="descricao"
					clearable
					label="Descrição"
					placeholder="Descrição"
					outlined
				></v-text-field>
				<v-text-field
					v-model="valor"
					:rules="valorRules"
					clearable
					label="Valor"
					placeholder="Valor"
					outlined
				></v-text-field>

				<v-btn
					:disabled="!valid"
					color="success"
					class="mr-4"
					@click="validate"
				>
					Cadastrar
				</v-btn>

				<v-btn color="error" class="mr-4" @click="reset"> Limpar </v-btn>
			</v-form>
		</v-card>
	</v-dialog>
</template>

<script>
//teste
export default {
	data() {
		return {
			dialog: false,
			valid: true,
			servico: "",
			servicoRules: [(v) => !!v || "deve ter nome do serviço"],
			valorRules: [],
		};
	},
	methods: {},
};
</script>
