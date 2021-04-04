import Vue from "vue";
import VueRouter from "vue-router";
import Mapa from "../views/Mapa";
import Login from "../views/Login";
import Historico from "../views/Historico";
import Relatorio from "../views/Relatorio";
import About from "../views/About";
import Aviso from "../views/Aviso";
import EdPerfil from "../views/EdPerfil";
import Perfil from "../views/Perfil";
import Cadastro from "../views/Cadastro";
import Atendimento from "../views/Atendimento";

Vue.use(VueRouter);

const routes = [
	{
		path: "/",
		name: "Login",
		component: Login,
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
		path: "/edperfil",
		name: "EdPerfil",
		component: EdPerfil,
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
		path: "/aviso",
		name: "Aviso",
		component: Aviso,
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
	}
];

const router = new VueRouter({
  routes,
});

export default router;
