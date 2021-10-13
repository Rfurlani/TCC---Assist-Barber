<template>
	<v-container>
		<v-form v-model="valid" lazy-validation ref="form">
			<v-container class="mt-n5">
				<p class="mb-3 mt-3 font-weight-light">Dados Pessoais</p>
				<v-layout row wrap class="pt-4 pr-4 ml-7">
					<v-row>
						<v-col cols="12" xs="12" sm="12" md="4" lg="4" xl="4">
							<v-text-field
								v-model="usuario.telefone"
								class="darken-5 mb-n6"
								clearable
								label="Telefone"
								placeholder="Telefone"
								outlined
								type="tel"
								v-mask="'(##) #####-####'"
								required
							>
							</v-text-field>
						</v-col>
					</v-row>
				</v-layout>
				<!-- <p class="mb-3 mt-5 font-weight-light">Sobre</p>
				<v-layout row wrap class="pt-4 pr-4 ml-7">
					<v-row>
						<v-col cols="12" xs="12" sm="12" md="12" lg="12" xl="12">
							<v-text-field
								v-model="usuario.sobre"
								counter="350"
								class="darken-5  mb-n6"
								clearable
								label="Sobre"
								placeholder="Sobre"
								outlined
								type="text"
								required
								:rules="geralrules"
							>
							</v-text-field>
						</v-col>
					</v-row>
				</v-layout> -->

				<p class="mb-6 mt-n3 font-weight-light">Endereço</p>

				<v-layout row wrap>
					<v-row>
						<v-col cols="12" xs="12" sm="12" md="6" lg="6" xl="6">
							<v-text-field
								v-model="usuario.cidade"
								class="darken-5 px-3 mb-n7"
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
								v-model="usuario.rua"
								class="darken-5 px-3 mb-n7"
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
								v-model="usuario.complemento"
								class="darken-5 px-3 mb-n7"
								clearable
								label="Complemento"
								placeholder="Complemento"
								outlined
								required
								:rules="geralrules"
							>
							</v-text-field>
						</v-col>

						<v-col cols="12" xs="4" sm="4" md="4">
							<v-text-field
								v-model="usuario.bairro"
								class="darken-5 px-3 mb-n7"
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
								v-model.number="usuario.numero"
								class="darken-5 px-3 mb-n7"
								clearable
								label="Numero"
								placeholder="Numero"
								outlined
								type="number"
								required
								:rules="geralrules"
							>
							</v-text-field>
						</v-col>
						<v-col cols="12" xs="4" sm="4" md="4">
							<v-text-field
								v-model="usuario.estado"
								class="darken-5 px-3"
								clearable
								label="Estado"
								placeholder="Estado"
								outlined
								required
								type="text"
								:rules="geralrules"
							>
							</v-text-field>
						</v-col>
					</v-row>
				</v-layout>

				<v-container class="mt-5 mb-n5">
					<v-spacer></v-spacer>
					<div>
						<v-btn
							color="blue darken-1"
							:disabled="!valid"
							text
							@click="dialog = false"
						>
							Save
						</v-btn>
					</div>
				</v-container>
			</v-container>
		</v-form>

		<!--fim formulario -->
	</v-container>
</template>

<script>
export default {
	data() {
		return {
			valid: true,
			usuario: {},
			geralrules: [(v) => !!v || "não pode deixar em branco"],
		};
	},
	computed: {},
	methods: {},
};
</script>
