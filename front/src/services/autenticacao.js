import { http } from "./config";

export default {
	login_cliente: (usuario) => {
		return http.post("/cliente/autenticar-cliente", usuario);
	},
	logout_usuario: () => {},
};
