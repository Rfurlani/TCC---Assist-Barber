<template>
	<nav>
		<v-app-bar app color="blue darken-4">
			<v-icon
				@click="drawer = !drawer"
				v-if="!['Cadastro', 'Index', 'Validacao'].includes($route.name)"
				>mdi-menu</v-icon
			>
			<v-spacer></v-spacer>
			<h3
				class="text-uppercase black--text"
				@click="irPrincipal"
				style="cursor: pointer"
			>
				<span class="font-weight-light white--text">assist</span>
				<span class="black--text">Barber</span>
			</h3>
			<v-spacer></v-spacer>
			<Notificacao />
			<!--menu logar popup -->
			<Login
				v-if="
					![
						'Aviso',
						'About',
						'EdPerfil',
						'Perfil',
						'Busca',
						'Agenda',
						'Notificacao',
						'Uso_admin',
						'Dashboard',
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
						'Aviso',
						'About',
						'EdPerfil',
						'Perfil',
						'Busca',
						'Agenda',
						'Notificacao',
						'Uso_Admin',
						'Dashboard',
					].includes($route.name)
				"
			>
				<span>CADASTRAR</span>
				<v-icon class="ml-1">mdi-account-plus</v-icon>
			</v-btn>
			<!--sair -->
			<v-btn
				small
				text
				v-if="!['Cadastro', 'Index', 'Validacao'].includes($route.name)"
			>
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
				<p class="white--text subheading mt-2">
					<!-- {{ nome.data.cliente.usuarioId.nome }} -->
				</p>
			</v-layout>
			<v-list>
				<v-list-item router :to="`/Busca`">
					<v-list-action>
						<v-icon class="material-icons">mdi-map</v-icon>
					</v-list-action>
					<v-list-item-title class="ml-3">
						Busca Barbeiros
					</v-list-item-title>
				</v-list-item>
				<v-list-item router :to="`/Edperfil`">
					<v-list-action>
						<v-icon class="material-icons">mdi-map</v-icon>
					</v-list-action>
					<v-list-item-title class="ml-3">
						Perfil
					</v-list-item-title>
				</v-list-item>
				<v-list-item router :to="`/Agenda`">
					<v-list-action>
						<v-icon class="material-icons">mdi-map</v-icon>
					</v-list-action>
					<v-list-item-title class="ml-3">
						Agenda
					</v-list-item-title>
				</v-list-item>
				<v-list-item router :to="`/Notificacao`">
					<v-list-action>
						<v-icon class="material-icons">mdi-map</v-icon>
					</v-list-action>
					<v-list-item-title class="ml-3">
						Notificações
					</v-list-item-title>
				</v-list-item>
				<v-list-item router :to="`/About`">
					<v-list-action>
						<v-icon class="material-icons">mdi-information</v-icon>
					</v-list-action>
					<v-list-item-title class="ml-3">
						Sobre
					</v-list-item-title>
				</v-list-item>
				<v-list-item router :to="`/Dashboard`">
					<v-list-action>
						<v-icon class="material-icons">mdi-view-dashboard</v-icon>
					</v-list-action>
					<v-list-item-title class="ml-3">
						Dashboard
					</v-list-item-title>
				</v-list-item>

				<!-- <v-list-item
					v-for="link in links"
					:key="link.text"
					router
					:to="link.route"
				>
					<v-list-item-action>
						<v-icon class="material-icons">{{ link.icon }}</v-icon>
					</v-list-item-action>
					<v-list-item-title class="text--white">{{
						link.text
					}}</v-list-item-title>
				</v-list-item> -->
			</v-list>
		</v-navigation-drawer>
	</nav>
</template>

<script>
import router from "../../router";
import Notificacao from "../Notificacao";
import Login from "../Login";
export default {
	name: "Navbar",
	components: {
		Notificacao,
		Login,
	},
	mounted() {},
	methods: {
		irCadastro() {
			this.$router.push("/cadastro");
		},
		irPrincipal() {
			router.push({ path: "/" });
		},
		logout() {
			// remove user from local storage to log user out
			localStorage.clear();
			this.$router.push({ name: "Index" });
		},
	},
	computed: {
		nome() {
			return this.$store.getters.get_cliente;
		},
		cargo() {
			return this.$store.getters.get_cargo;
		},
	},

	data() {
		return {
			drawer: false,
			links: [
				{
					icon: "mdi-map",
					text: "Busca",
					route: "/Busca",
				},
				{
					icon: "mdi-view-dashboard",
					text: "Perfil",
					route: "/Edperfil",
				},
				{
					icon: "mdi-information",
					text: "Agenda",
					route: "/Agenda",
				},
				{
					icon: "mdi-information",
					text: "Notificações",
					route: "/Notificacao",
				},
				{
					icon: "mdi-information",
					text: "Sobre",
					route: "/About",
				},
				{
					icon: "mdi-information",
					text: "Dashboard",
					route: "/Dashboard",
				},
			],
		};
	},
};
</script>
