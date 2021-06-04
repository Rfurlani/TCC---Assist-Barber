//Verifica se é barbeiro para habilitar CPF
function checarCargo(cargoUsuario, cargo) {
    if (cargoUsuario === cargo){
        return true
    } else {
        return false
    }
}
export default checarCargo;