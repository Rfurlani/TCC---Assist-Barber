//Verifica se é barbeiro para habilitar CPF
import { Usuario } from '../models'



function checarCargoBarbeiro() {
    if (this.cargo === "Barbeiro") {
        return true;
    } else {
        return false;
    }
}

export default checarCargoBarbeiro;