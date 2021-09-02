<template>
	<div class="Notificacao">
		<h1 class="ml-3">NOTIFICAÇÕES</h1>
		<v-container class="my-2">
			<div>nome do usuario:{{ usuario }}</div>
		</v-container>
	</div>
</template>

<script>
import { mapState } from "vuex";
export default {
	name: "Notificação",
	computed: {
		...mapState({
			usuario: (state) => state.usuario.data.usuario.id,
		}),
	},
	mounted() {
		this.teste();
	},
	methods: {
		teste() {
			if (this.usuario == "barbeiro") {
				alert("funciona");
			} else {
				alert("nao funciona");
			}
		},
	},
};
</script>
