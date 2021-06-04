import { http } from "./config";

export default {
	cadastro_usuario: (usuario) => {
		return http.post("usuarios/api/cadastrar", usuario);
	},
};
