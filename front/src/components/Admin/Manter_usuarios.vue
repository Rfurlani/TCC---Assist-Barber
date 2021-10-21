<template>
	<v-container>
		<h1>Manter Usuarios</h1>
		<v-layout row wrap justify-center style="margin-top: 5%">
			<v-flex xs10 sm10 md10 lg8 xl8>
				<v-card
					dark
					class="pa-3 mb-2"
					color="blue darken-4"
					elevation="24"
					v-for="user in this.all_users"
					:key="user._id"
				>
					<v-layout row wrap class="pt-2 pr-1 pl-5">
						<v-flex xs3 sm3 md3>
							<div class="caption black--text">
								<h2><b>Cliente</b></h2>
							</div>

							<div>{{ user.nome }}</div>
						</v-flex>
						<v-flex xs4 sm4 md4>
							<div class="caption black--text">
								<h2><b>Email</b></h2>
							</div>

							<div>{{ user.email }}</div>
						</v-flex>
						<v-flex xs3 sm3 md3>
							<div class="caption black--text">
								<h2><b>Telefone</b></h2>
							</div>

							<div>{{ user.telefone }}</div>
						</v-flex>
						<div class="d-flex">
							<span class="mt-3">Ações:</span>

							<v-card-actions>
								<v-btn color="red darken-3" @click="desativar(user._id)"
									>Desativar</v-btn
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
	name: "admin_manter_usuario",
	data() {
		return {
			all_users: {},
			info: {
				ativo: false,
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
		this.getUsuarios();
	},
	methods: {
		async getUsuarios() {
			try {
				const usuarios = await http.get("/usuario/admin/exibir-usuarios", {
					headers: { Authorization: `Bearer ${this.token}` },
				});
				console.log(usuarios);
				this.all_users = usuarios.data.usuarios;
				console.log(this.all_users);
				if (this.all_users.length == 0) {
					alert("Não ha usuarios no sistema");
				}
			} catch (error) {
				console.log(error);
			}
		},
		async desativar(userId) {
			try {
				const resposta = await http.patch(
					`/usuario/admin/gerenciar-usuario/${userId}`,
					this.info,
					{
						headers: { Authorization: `Bearer ${this.token}` },
					}
				);
				console.log(resposta);
				this.getUsuarios();
			} catch (error) {}
		},
	},
};
</script>
