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
				<p class="mb-3 mt-5 font-weight-light">Sobre</p>
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
							</v-text-field> </v-col
					></v-row> </v-layout
				><v-spacer></v-spacer>
				<v-container class="mt-5 mb-n5">
					<v-btn color="blue darken-1" text @click="dialog = false">
						Close
					</v-btn>
					<v-btn
						color="blue darken-1"
						:disabled="!valid"
						text
						@click="dialog = false"
					>
						Save
					</v-btn>
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
};
</script>
