<template>
	<v-container>
		<v-container mt-n2 mb-n3>
			<v-radio-group v-model="link" row>
				<v-spacer></v-spacer>
				<v-radio label="Relatório" value="relatorio"></v-radio>
				<v-spacer></v-spacer>
				<v-radio label="Histórico" value="historico"> </v-radio>
				<v-spacer></v-spacer>
				<v-radio label="Solicitações" value="solicitacao"> </v-radio>
				<v-spacer></v-spacer>
			</v-radio-group>
		</v-container>

		<v-container>
			<component v-bind:is="link"></component>
		</v-container>
	</v-container>
</template>

<script>
import solicitacao from "./itens_agenda/Solicitacoes/Solicitacoes.vue";
import historico from "./itens_agenda/Historico/Historico.vue";
import relatorio from "./itens_agenda/Relatorios/Relatorio.vue";
export default {
	name: "agenda_Barbeiro",
	data() {
		return {
			link: "",
		};
	},
	components: {
		solicitacao,
		historico,
		relatorio,
	},
	mounted() {},
	computed: {},
	methods: {},
};
</script>
