<template>
	<v-row justify="center">
		<v-dialog v-model="dialog" width="75%">
			<template v-slot:activator="{ on, attrs }">
				<v-btn color="primary" dark v-bind="attrs" v-on="on">
					Atualizar Informaçoes
				</v-btn>
			</template>
			<v-card>
				<v-toolbar dark color="primary">
					<v-toolbar-title>Atualizar Informações</v-toolbar-title>
					<v-spacer></v-spacer>
					<v-btn icon dark @click="dialog = false">
						<v-icon>mdi-close</v-icon>
					</v-btn>
				</v-toolbar>
				<component v-bind:is="cargo"></component>
			</v-card>
		</v-dialog>
	</v-row>
</template>
<script>
import cliente from "../AtualizaPerfil/Cliente";
import barbeiro from "../AtualizaPerfil/Barbeiro";
export default {
	data() {
		return {
			dialog: false,
		};
	},
	components: {
		cliente,
		barbeiro,
	},
	computed: {
		cargo() {
			return this.$store.getters.get_usuario_cargo;
		},
	},
};
</script>
