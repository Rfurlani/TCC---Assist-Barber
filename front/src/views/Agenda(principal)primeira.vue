<template>
	<v-container>
		<component v-bind:is="cargo"></component>
	</v-container>
</template>
<script>
import cliente from "../components/Agenda/Agenda_cliente.vue";
import barbeiro from "../components/Agenda/Agenda_barbeiro.vue";
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
