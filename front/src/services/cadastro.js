import { http } from "./config";

export default {
	cadastro_cliente: (usuario) => {
		return http.post("usuarios/api/cadastrar-cliente", usuario);
	},
	cadastro_barbeiro: (usuario) => {
		return http.post("usuarios/api/cadastrar-barbeiro", usuario);
	},
};
