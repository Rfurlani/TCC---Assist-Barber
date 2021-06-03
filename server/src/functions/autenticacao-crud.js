const autorizarCRUD = (usuarioID, user_id) => {
    if (usuarioID !== user_id) {
        return res.status(401).json({
            success: false,
            msg: "Alteração não autorizada."
        });
    }
}

export default autorizarCRUD;