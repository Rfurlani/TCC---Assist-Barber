import { http } from "./config";

export default {
	cadastrar_servico(servico) {
		return http.post("servicos/api/criar-servico", servico);
	},
	listarServicos() {
		return http.get("servicos/api/listar-servicos");
	},
	editar_servico(servico) {
		return http.put(`servicos/api/editar-servico/${servico.id}`, servico);
	},
	excluir_servico(servico) {
		return http.delete(`servicos/api/deletar-servico/${servico.id}`, { data: servico });
	},
};
