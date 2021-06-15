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
import Busca from "../views/Busca_cliente";

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
		path: "/mapa",
		name: "Mapa",
		component: Mapa,
	},
	{
		path: "/Perfil",
		name: "Perfil",
		component: Perfil,
	},
	{
		path: "/Edperfil_barbeiro",
		name: "EdPerfil_barbeiro",
		component: EdPerfil_barbeiro,
	},
	{
		path: "/Edperfil_cliente",
		name: "EdPerfil_cliente",
		component: EdPerfil_cliente,
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
		path: "/Atendimento",
		name: "Atendimento",
		component: Atendimento,
	},
];

const router = new VueRouter({
	routes,
});

export default router;
