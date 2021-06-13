import { http } from "./config";

export default {
	buscar() {
		return http.get("/cliente/autenticar-cliente");
	},
};
