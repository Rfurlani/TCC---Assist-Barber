<template>
	<v-container>
		<component v-bind:is="cargo"></component>
	</v-container>
</template>
<script>
import cliente from "../components/EdPerfil/EdPerfil_cliente.vue";
import barbeiro from "../components/EdPerfil/EdPerfil_barbeiro.vue";
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
