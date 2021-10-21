<template>
	<v-col cols="auto">
		<v-dialog
			transition="dialog-top-transition"
			max-width="600"
			v-model="dialog"
		>
			<template v-slot:activator="{ on, attrs }">
				<span
					class="text-decoration-underline ml-5"
					color="blue"
					v-bind="attrs"
					v-on="on"
					>Esqueci a senha</span
				>
			</template>
			<template>
				<v-card>
					<v-toolbar color="primary" dark
						>Esqueci a senha
						<v-spacer></v-spacer>
						<v-btn icon dark @click="fechar()">
							<v-icon>mdi-close</v-icon>
						</v-btn>
					</v-toolbar>
					<v-card-text>
						<v-form
							ref="form"
							v-model="valid"
							lazy-validation
							class="pb-3 pl-5 pr-5"
						>
							<v-container class="d-flex mt-8 mb-n5">
								<v-text-field
									type="text"
									clearable
									v-model="email.email"
									label="E-mail"
									:rules="emailrules"
									placeholder="E-mail"
									outlined
									required
								></v-text-field>

								<v-spacer></v-spacer>
								<v-btn
									class="mt-2"
									dark
									:disabled="!valid"
									color="primary"
									@click="resetSenha()"
								>
									Resetar
								</v-btn>
							</v-container>
						</v-form>
					</v-card-text>
				</v-card>
			</template>
		</v-dialog>
	</v-col>
</template>
<script>
export default {
	data() {
		return {
			email: {
				email: null,
			},
			dialog: false,
			emailrules: [
				(v) => !!v || "É necessario informar um e-mail",
				(v) => /.+@.+/.test(v) || "E-mail deve ser válido ",
			],
		};
	},
	methods: {
		fechar() {
			(this.dialog = false), (this.email.email = "");
		},
		resetSenha() {
			alert("teste");
		},
	},
};
</script>
