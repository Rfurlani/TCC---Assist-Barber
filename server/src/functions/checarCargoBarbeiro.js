//Verifica se é barbeiro para habilitar CPF
function checarCargoBarbeiro() {
    if (this.cargo === "Barbeiro") {
        return true;
    } else {
        return false;
    }
}

export default checarCargoBarbeiro;