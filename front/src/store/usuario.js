const usuario = JSON.parse(localStorage.getItem("usuario"));
const state = usuario
	? { status: { loggedIn: true }, usuario }
	: { status: {}, usuario: null };
