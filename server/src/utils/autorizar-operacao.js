const autorizarOperacao = (usuarioID, user_id) => {
    if (usuarioID !== user_id) {
        throw new Error("Operação não autorizada!")
    }
}

export default autorizarOperacao;