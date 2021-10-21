<template>
	<v-container>
		<h1>Validaçao barbeiro</h1>
		<v-layout row wrap justify-center style="margin-top: 5%">
			<v-flex xs10 sm10 md10 lg8 xl8>
				<v-card
					dark
					class="pa-3"
					color="blue darken-4"
					elevation="24"
					v-for="barbeiro in this.barbeiros_a_validar"
					:key="barbeiro.nome"
				>
					<v-layout row wrap class="pt-2 pr-1 pl-5">
						<v-flex xs3 sm3 md3>
							<div class="caption black--text">
								<h2><b>Cliente</b></h2>
							</div>
							<div>{{ barbeiro.nome }}</div>
						</v-flex>
						<v-flex xs4 sm4 md4>
							<div class="caption black--text">
								<h2><b>Email</b></h2>
							</div>
							<div>{{ barbeiro.email }}</div>
						</v-flex>
						<v-flex xs3 sm3 md3>
							<div class="caption black--text">
								<h2><b>Telefone</b></h2>
							</div>
							<div>{{ barbeiro.telefone }}</div>
						</v-flex>
						<div class="d-flex">
							<span class="mt-3">Ações:</span>

							<v-card-actions>
								<v-btn color="green" @click="validar(barbeiro._id)"
									>Aceitar</v-btn
								>
								<v-btn color="error" @click="recusar(barbeiro._id)"
									>Recusar</v-btn
								>
							</v-card-actions>
						</div>
					</v-layout>
				</v-card>
			</v-flex>
		</v-layout>
	</v-container>
</template>

<script>
import { http } from "../../services/config";

export default {
	name: "admin_validacao",
	data() {
		return {
			barbeiros_a_validar: {},
			resposta_true: {
				validado: true,
			},
			resposta_false: {
				validado: false,
			},
		};
	},
	computed: {
		token() {
			//token do usuario
			return this.$store.getters.get_token;
		},
	},
	mounted() {
		this.getBarbeiros();
	},
	methods: {
		async getBarbeiros() {
			try {
				const barbeiros = await http.get(
					"usuario/admin/exibir-barbeiros-validacao",
					{
						headers: { Authorization: `Bearer ${this.token}` },
					}
				);
				this.barbeiros_a_validar = barbeiros.data.barbeiros;
				console.log(this.barbeiros_a_validar);
				if (this.barbeiros_a_validar.length == 0) {
					alert("Não ha cadastro de barbeiro para validar!");
				}
			} catch (error) {
				console.log(error);
			}
		},
		async validar(usuarioId) {
			try {
				const resposta = await http.patch(
					`usuario/admin/gerenciar-validacao/${usuarioId}`,
					this.resposta_true,
					{
						headers: { Authorization: `Bearer ${this.token}` },
					}
				);
				console.log(resposta);
				this.getBarbeiros();
			} catch (error) {
				console.log(error);
			}
		},
		async recusar(usuarioId) {
			try {
				const resposta = await http.patch(
					`usuario/admin/gerenciar-validacao/${usuarioId}`,
					this.resposta_false,
					{
						headers: { Authorization: `Bearer ${this.token}` },
					}
				);
				console.log(resposta);
				this.getBarbeiros();
			} catch (error) {
				console.log(error);
			}
		},
	},
};
</script>
