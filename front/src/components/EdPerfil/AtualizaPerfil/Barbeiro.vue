<template>
	<v-container>
		<v-form v-model="valid" lazy-validation ref="form">
			<v-container class="mt-n5">
				<p class="mb-3 mt-3 font-weight-light">Dados Pessoais</p>
				<v-layout row wrap class="pt-4 pr-4 ml-7">
					<v-row>
						<v-col cols="12" xs="12" sm="12" md="4" lg="4" xl="4">
							<v-text-field
								v-model="att.telefone"
								class="darken-5 mb-n6"
								clearable
								label="Telefone"
								placeholder="Telefone"
								outlined
								type="tel"
								v-mask="'(##) #####-####'"
								required
								:rules="geralrules"
							>
							</v-text-field>
						</v-col>
					</v-row>
				</v-layout>
				<p class="mb-3 mt-5 font-weight-light">Sobre</p>
				<v-layout row wrap class="pt-4 pr-4 ml-7">
					<v-row>
						<v-col cols="12" xs="12" sm="12" md="12" lg="12" xl="12">
							<v-textarea
								v-model="att.sobre"
								counter
								auto-grow
								clearable
								placeholder="Sobre"
								required
								outlined
								:rules="geralrules"
							>
							</v-textarea> </v-col
					></v-row> </v-layout
				><v-spacer></v-spacer>
				<div class="mt-5 mb-n5">
					<v-spacer></v-spacer>
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
		</v-form>

		<!--fim formulario -->
	</v-container>
</template>

<script>
import { http } from "../../../services/config";
export default {
	name: "att_perfil_barbeiro",
	data() {
		return {
			valid: true,
			usuario: {},
			geralrules: [(v) => !!v || "não pode deixar em branco"],
			att: {
				telefone: "",
				sobre: "",
			},
		};
	},
	computed: {
		barbeiro() {
			return this.$store.getters.get_barbeiro;
		},
	},
	methods: {},
};
</script>
