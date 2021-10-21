<template>
	<v-container>
		<v-card class="elevation-15 mx-auto" width="100%">
			<v-card-title class="blue darken-4">
				<div>
					<span class="font-weight-light white--text">Admin</span>
					<span class="font-weight-light black--text">Dashboard</span>
				</div>
			</v-card-title>
			<v-container mb-n7>
				<v-radio-group v-model="funcao" row>
					<v-spacer></v-spacer>
					<v-radio label="Manter Usuario" value="Manter"></v-radio>
					<v-radio label="Validar Barbeiro" value="Validacao"> </v-radio>
					<v-spacer></v-spacer>
				</v-radio-group>
				<v-divider class="blue"></v-divider>

				<div>
					<component v-bind:is="funcao"></component>
				</div>
			</v-container>
		</v-card>
	</v-container>
</template>
<script>
import Manter from "../components/Admin/Manter_usuarios";
import Validacao from "../components/Admin/Validacao_barbeiro";

export default {
	components: {
		Manter,
		Validacao,
	},
	data() {
		return {
			funcao: "",
		};
	},
	computed: {
		cargo() {
			return this.$store.getters.get_usuario_cargo;
		},
	},
};
</script>
