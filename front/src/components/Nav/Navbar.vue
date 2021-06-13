<template>
	<nav>
		<v-app-bar app color="blue darken-4">
			<v-icon
				@click="drawer = !drawer"
				v-if="!['Cadastro', 'Index'].includes($route.name)"
				>mdi-menu</v-icon
			>
			<v-spacer></v-spacer>
			<v-button
				class="text-uppercase black--text"
				@click="irPrincipal"
				style="cursor: pointer"
			>
				<span class="font-weight-light white--text">assist</span>
				<span class="black--text">Barber</span>
			</v-button>
			<v-spacer></v-spacer>
			<Notificacao />
			<!--menu logar popup -->
			<Login
				v-if="
					![
						'Mapa',
						'Atendimento',
						'Aviso',
						'About',
						'Relatorio',
						'Historico',
						'EdPerfil_cliente',
						'EdPerfil_barbeiro',
						'Perfil',
						'Mapa',
					].includes($route.name)
				"
			/>
			<!--cadastrar -->
			<v-btn
				small
				text
				@click="irCadastro"
				v-if="
					![
						'Cadastro',
						'Mapa',
						'Atendimento',
						'Aviso',
						'About',
						'Relatorio',
						'Historico',
						'EdPerfil_cliente',
						'EdPerfil_barbeiro',
						'Perfil',
						'Mapa',
					].includes($route.name)
				"
			>
				<span>CADASTRAR</span>
				<v-icon class="ml-1">mdi-account-plus</v-icon>
			</v-btn>
			<!--sair -->
			<v-btn small text v-if="!['Cadastro', 'Index'].includes($route.name)">
				<span>Sair</span>
				<v-icon @click="logout()">mdi-exit-run</v-icon>
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
import router from "../../router";
import Notificacao from "../Notificacao";
import Login from "../Login";
import Autenticacao from "../../services/autenticacao";
export default {
	components: {
		Notificacao,
		Login,
	},
	methods: {
		irCadastro() {
			this.$router.push("/cadastro");
		},
		irPrincipal() {
			router.push({ path: "/" });
		},
		logout() {
			Autenticacao.logout_usuario(this.usuario)
				.then((resposta) => {
					this.usuario = { resposta };
					console.log(resposta);
					alert(resposta);
					router.push({ path: "/" });
					this.errors = {};
				})
				.catch((err) => {
					this.errors = err;
					alert(err);
					console.log(err);
				});
		},
	},

	data() {
		return {
			drawer: false,
			links: [
				{
					icon: "mdi-map",
					text: "principal",
					route: "/mapa",
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
