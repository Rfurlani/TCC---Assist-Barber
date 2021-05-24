import { http } from "./config";

export default {
	cadastrar_servico() {},
	listar() {
		return http.get("https://jsonplaceholder.typicode.com/todos");
	},
	editar_servico() {},
	excluir_servico() {},
};
