import { http } from "./config";
export default {
	cadastrar_servico(servico) {
		return http.post("servico", servico);
	},
	listarServicos() {
		return http.get("servico");
	},
	editar_servico(servico) {
		return http.patch("servico", servico);
	},
	excluir_servico(servico) {
		return http.delete("servico", { data: servico });
	},
};
