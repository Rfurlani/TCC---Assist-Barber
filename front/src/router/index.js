import Vue from "vue";
import VueRouter from "vue-router";
import Mapa from "../views/Mapa";
import Index from "../views/Index";
import Historico from "../views/Historico";
import Relatorio from "../views/Relatorio";
import About from "../views/About";
import EdPerfil_barbeiro from "../components/EdPerfil/EdPerfil_barbeiro";
import EdPerfil_cliente from "../components/EdPerfil/EdPerfil_cliente";
import Perfil from "../views/Perfil";
import Cadastro from "../views/Cadastro";
import Busca from "../views/Busca_cliente";
import Notificacao from "../views/Notificacao";
import EdPerfil from "../views/EdPerfil";
import Agenda from "../views/Agenda";
// import store from "../store"
Vue.use(VueRouter);

const routes = [
	{
		path: "/",
		name: "Index",
		component: Index,
	},
	{
		path: "/Busca",
		name: "Busca",
		component: Busca,
	},
	{
		path: "/Mapa",
		name: "Mapa",
		component: Mapa,
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
		path: "/Historico",
		name: "Historico",
		component: Historico,
	},
	{
		path: "/Relatorio",
		name: "Relatorio",
		component: Relatorio,
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
	routes,
});

export default router;

router.beforeEach((to, from, next) => {
	// redirect to login page if not logged in and trying to access a restricted page
	const publicPages = ["/", "/cadastro"];
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
