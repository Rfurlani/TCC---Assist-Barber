import { http } from "./config";

export default {
	login_usuario:(usuario)=> {
		return http.post("usuarios/api/autenticar", usuario);
	},
	
};