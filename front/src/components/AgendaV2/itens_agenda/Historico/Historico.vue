<template>
	<div class="Historico">
		<h1>Historico</h1>
		<component v-bind:is="cargo"></component>
	</div>
</template>

<script>
import barbeiro from "../Historico/Barbeiro.vue";
import cliente from "../Historico/Cliente.vue";
//teste
export default {
	components: {
		barbeiro,
		cliente,
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
