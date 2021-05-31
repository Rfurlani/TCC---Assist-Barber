import { http } from "./config";

export default {
	cadastrar_usuario(usuario) {
		return http.post("servicos/api/criar-servico", usuario);
	}
};