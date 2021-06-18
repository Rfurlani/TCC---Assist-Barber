import {
	http
} from "./config";

export default {

	buscar(token) {
		return http.get("barbeiro/get-barbeiro", {
			headers: {
				"Authorization": `Bearer{token}`
			}
		})
	},
};