<template>
	<div class="Relatorio">
		<h1 class="ml-3">RELATÓRIOS</h1>
		<component v-bind:is="cargo"></component>
	</div>
</template>

<script>
import cliente from "../Relatorios/Cliente.vue";
import barbeiro from "../Relatorios/Barbeiro.vue";
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
