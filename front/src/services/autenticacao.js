import { http } from "./config";

export default {
	login_cliente: (usuario) => {
		return http.post("/cliente/autenticar-cliente", usuario);
	},
	login_barbeiro: (usuario) => {
		return http.post("/barbeiro/autenticar-barbeiro", usuario);
	},
	logout_usuario: (usuario) => {
		return http.get("/logout", usuario);
	},
};
