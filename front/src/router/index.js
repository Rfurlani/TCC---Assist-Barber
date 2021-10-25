import Vue from "vue";
import VueRouter from "vue-router";
import Index from "../views/Index";
import About from "../views/About";
import Perfil from "../views/Perfil";
import Cadastro from "../views/Cadastro";
import Busca from "../views/Busca_cliente";
import Notificacao from "../views/Notificacao";
import EdPerfil from "../views/EdPerfil";
import Agenda from "../views/Agenda";
import Validacao from "../views/Validacao";
import Dashboard from "../views/Dashboard_admin";
Vue.use(VueRouter);

const routes = [
	{
		path: "/",
		name: "Index",
		component: Index,
	},
	{
		path: "/Dashboard",
		name: "Dashboard",
		component: Dashboard,
	},
	{
		path: "/Validacao",
		name: "Validacao",
		component: Validacao,
	},
	{
		path: "/Busca",
		name: "Busca",
		component: Busca,
	},
	{
		path: "/Perfil",
		name: "Perfil",
		component: Perfil,
	},
	{
		path: "/Edperfil",
		name: "EdPerfil",
		component: EdPerfil,
	},
	{
		path: "/About",
		name: "About",
		component: About,
	},

	{
		path: "/Cadastro",
		name: "Cadastro",
		component: Cadastro,
	},
	{
		path: "/Notificacao",
		name: "Notificacao",
		component: Notificacao,
	},
	{
		path: "/Agenda",
		name: "Agenda",
		component: Agenda,
	},
	{
		path: "*",
		redirect: "/",
	},
];

const router = new VueRouter({
	mode: "history",
	routes,
});

export default router;

router.beforeEach((to, from, next) => {
	// redirect to login page if not logged in and trying to access a restricted page
	const publicPages = ["/", "/cadastro", "Validacao"];
	// const barberOnly = ["/Edperfil_barbeiro", "/Mapa"];
	const authRequired = !publicPages.includes(to.path);
	const loggedIn = localStorage.getItem("usuario");
	// const cargoUsuario = loggedIn.data.usuario.cargo;

	if (authRequired && !loggedIn) {
		return next("/");
	}
	if (loggedIn && to.path === "/") {
		alert("para voltar a pagina inicial, clique em Logout");
		return next("/EdPerfil");
	}
	next();
});
