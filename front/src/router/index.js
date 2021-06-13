import Vue from "vue";
import VueRouter from "vue-router";
import Mapa from "../views/Mapa";
import Index from "../views/Index";
import Historico from "../views/Historico";
import Relatorio from "../views/Relatorio";
import About from "../views/About";
import EdPerfil_barbeiro from "../views/EdPerfil_barbeiro";
import EdPerfil_cliente from "../views/EdPerfil_cliente";
import Perfil from "../views/Perfil";
import Cadastro from "../views/Cadastro";
import Atendimento from "../views/Atendimento";

Vue.use(VueRouter);

const routes = [
	{
		path: "/",
		name: "Index",
		component: Index,
	},
	{
		path: "/mapa",
		name: "Mapa",
		component: Mapa,
	},
	{
		path: "/perfil",
		name: "Perfil",
		component: Perfil,
	},
	{
		path: "/edperfil_barbeiro",
		name: "EdPerfil_barbeiro",
		component: EdPerfil_barbeiro,
	},
	{
		path: "/edperfil_cliente",
		name: "EdPerfil_cliente",
		component: EdPerfil_cliente,
	},
	{
		path: "/historico",
		name: "Historico",
		component: Historico,
	},
	{
		path: "/relatorio",
		name: "Relatorio",
		component: Relatorio,
	},
	{
		path: "/about",
		name: "About",
		component: About,
	},

	{
		path: "/cadastro",
		name: "Cadastro",
		component: Cadastro,
	},
	{
		path: "/atendimento",
		name: "Atendimento",
		component: Atendimento,
	},
];

const router = new VueRouter({
	routes,
});

export default router;
