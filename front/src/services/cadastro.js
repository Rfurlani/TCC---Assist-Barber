import { http } from "./config";

export default {
	cadastro_cliente: (usuario) => {
		return http.post("/cliente/cadastrar-cliente", usuario);
	},
	cadastro_barbeiro: (usuario) => {
		return http.post("/barbeiro/cadastrar-barbeiro", usuario);
	},
};
