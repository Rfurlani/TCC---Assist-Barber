<template>
	<div class="Relatorio">
		<h1>Relatório</h1>
		<component v-bind:is="cargo"></component>
	</div>
</template>

<script>
import cliente from "../Relatorios/Cliente/Cliente.vue";
import barbeiro from "../Relatorios/Barbeiro/Barbeiro.vue";
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
