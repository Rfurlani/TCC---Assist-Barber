<template>
	<nav>
		<v-app-bar app color="blue darken-4">
			<v-icon @click="drawer = !drawer">mdi-menu</v-icon>
			<v-spacer></v-spacer>
			<v-toolbar-title class="text-uppercase black--text">
				<span class="font-weight-light white--text">assist</span>
				<span class="black--text">Barber</span>
			</v-toolbar-title>
			<v-spacer></v-spacer>
			<Notificacao />
			<!--menu logar popup -->
			<Login />
			<!--cadastrar -->
			<v-btn small text @click="irCadastro">
				<span>CADASTRAR-SE</span>
				<v-icon class="ml-1">mdi-account-plus</v-icon>
			</v-btn>
			<!--sair -->
			<v-btn small text v-show="false">
				<span>Sair</span>
				<v-icon>mdi-exit-run</v-icon>
			</v-btn>
		</v-app-bar>

		<v-navigation-drawer dark v-model="drawer" app class="blue darken-4">
			<v-layout column align-center>
				<!--ICONE DO USUARIO -->
				<v-flex class="mt-5">
					<v-avatar size="50">
						<v-icon class="mdi-48px mdi-dark white">mdi-account</v-icon>
					</v-avatar>
				</v-flex>
				<!--NOME DO USUARIO -->
				<p class="white--text subheading mt-2">{{ nomeUsuario }}</p>
			</v-layout>
			<v-list>
				<v-list-item
					v-for="link in links"
					:key="link.text"
					router
					:to="link.route"
				>
					<v-list-item-action>
						<v-icon class="material-icons">{{ link.icon }}</v-icon>
					</v-list-item-action>
					<v-list-title-content>
						<v-list-item-title class="text--white">{{
							link.text
						}}</v-list-item-title>
					</v-list-title-content>
				</v-list-item>
			</v-list>
		</v-navigation-drawer>
	</nav>
</template>

<script>
import Notificacao from "./Notificacao";
import Login from "./Login";

export default {
	components: {
		Notificacao,
		Login,
	},
	methods: {
		irCadastro() {
			this.$router.push("/cadastro");
		},
	},

	data() {
		return {
			drawer: false,
			links: [
				{
					icon: "mdi-map",
					text: "Principal",
					route: "/",
				},
				{
					icon: "mdi-view-dashboard",
					text: "Perfil",
					route: "/edperfil_barbeiro",
				},

				{
					icon: "mdi-chart-bar",
					text: "Relatórios",
					route: "/relatorio",
				},
				{
					icon: "mdi-history",
					text: "Histórico",
					route: "/historico",
				},
				{
					icon: "mdi-information",
					text: "Notificações",
					route: "/notificacoes",
				},
				{
					icon: "mdi-information",
					text: "Sobre",
					route: "/about",
				},
				{
					icon: "mdi-information",
					text: "Validar Cadastro",
					route: "/validacadastro",
				},
			],
		};
	},
};
</script>
