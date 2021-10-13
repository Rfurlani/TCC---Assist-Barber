<template>
	<v-container>
		<v-card class="elevation-15 mx-auto" width="85%">
			<v-card-title class="blue darken-4">
				<div>
					<span class="font-weight-light white--text">Agenda</span>
				</div>
			</v-card-title>
			<v-container mt-n2 mb-n3> </v-container>
			<v-divider></v-divider>
			<v-container>
				<component v-bind:is="cargo"></component>
			</v-container>
		</v-card>
	</v-container>
</template>
<script>
import cliente from "../components/AgendaV2/Cliente";
import barbeiro from "../components/AgendaV2/Barbeiro";
export default {
	components: {
		cliente,
		barbeiro,
	},
	data() {
		return {};
	},
	computed: {
		cargo() {
			return this.$store.getters.get_usuario_cargo;
		},
	},
};
</script>
