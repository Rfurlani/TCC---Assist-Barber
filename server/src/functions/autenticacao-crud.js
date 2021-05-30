const autorizarCRUD = (usuarioID, user_id) => {
    if(usuarioID !== user_id){
        return res.status(401).json({
            success: false,
            message: "Alteração não autorizada."
        });
    }
}

export default autorizarCRUD;