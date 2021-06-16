import { http } from "./config";

export default {
	login_usuario: (usuario) => {
		return http.post("/usuario/autenticar-usuario", usuario);
	},
};
