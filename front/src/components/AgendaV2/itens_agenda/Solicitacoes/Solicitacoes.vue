<template>
	<div class="Historico">
		<h1>Solicitacoes</h1>
		<component v-bind:is="cargo"></component>
	</div>
</template>

<script>
import cliente from "./Cliente/Cliente.vue";
import barbeiro from "./Barbeiro/Barbeiro.vue";
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
