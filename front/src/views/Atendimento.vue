<template>
	<div class="Atendimento">
		<h1 class="ml-3">Atendimentos</h1>
		<h3 class="ml-3">a serem aceitos</h3>
		<v-container class="my-2">
			<v-card
				flat
				color="blue"
				class="pl-8 pt-3 pb-4 mb-1"
				v-for="atendimento in atendimentos"
				:key="atendimento"
			>
				<v-layout row wrap>
					<v-flex xs3 sm4 md3>
						<div class="caption black--text">Nome</div>
						<div>{{ atendimento.nome }}</div>
					</v-flex>
					<v-flex xs3 sm4 md3>
						<div class="caption black--text">Endereço</div>
						<div>{{ atendimento.cidade }}</div>
						<div>{{ atendimento.bairro }}</div>
						<div>{{ atendimento.numero }}</div>
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
			atendimentos: [
				{
					nome: "rodrigo",
					cidade: "araruama",
					bairro: "fazendinha",
					numero: "2030",
					Email: "asafasfa@gamil.com",
				},
				{
					nome: "rodrigo",
					CPF: "1697.753.397.32",
					Email: "asafasfa@gamil.com",
				},
				{
					nome: "rodrigo",
					CPF: "1697.753.397.32",
					Email: "asafasfa@gamil.com",
				},
			],
		};
	},
};
</script>
