const autorizarCRUD = (usuarioID, user_id) => {
    if (usuarioID !== user_id) {
        throw Error("Operação não autorizada!")
    }
}

export default autorizarCRUD;