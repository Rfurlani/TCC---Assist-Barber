<template>
	<div class="Atendimento">
		<h1 class="ml-3">Atendimentos</h1>
		<h3 class="ml-3">a serem aceitos</h3>
		<v-container class="my-2">
			<v-card
				flat
				color="blue"
				class="pl-7 pt-3 pb-2 mb-1"
				v-for="atendimento in atendimentos"
				:key="atendimento.id"
			>
				<v-layout row wrap>
					<v-flex xs3 sm4 md3>
						<div class="caption black--text">Nome</div>
						<div>{{ atendimento.nome }}</div>
					</v-flex>
					<v-flex xs3 sm4 md3>
						<div class="caption black--text">CPF</div>
						<div>{{ atendimento.CPF }}</div>
					</v-flex>
					<v-flex xs6 sm4 md6>
						<div class="caption black--text">Email</div>
						<div id="email">{{ atendimento.Email }}</div>
					</v-flex>
					<v-card-actions>
						<v-btn color="success">aceitar</v-btn
						><v-btn color="error">recusar</v-btn></v-card-actions
					>
				</v-layout>
			</v-card>
		</v-container>
	</div>
</template>

<script>
//teste
export default {
	data() {
		return {
			loading: true,
			atendimentos: [],
		};
	},
};
</script>
