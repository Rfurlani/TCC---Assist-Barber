<template>
	<div class="Historico">
		<h1>Histórico</h1>
		<component v-bind:is="cargo"></component>
	</div>
</template>

<script>
import barbeiro from "./Barbeiro/Barbeiro.vue";
import cliente from "./Cliente/Cliente.vue";
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
