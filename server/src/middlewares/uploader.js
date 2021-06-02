import multer from 'multer';

//Renomeia Arquivo
const filename = (req, file, next) => {
    let lastIndexOf = file.originalname.lastIndexOf(".");
    let ext = file.originalname.substring(lastIndexOf);
    next(null, `img-${Date.now()}${ext}`);
};

//Pasta destino imagens perfil
const postImgPerfil = (req, file, next) => {
    next(null, `${__dirname}/../uploads/imgsPerfis`);
};

//Pasta destino certificados
const postImgCert = (req, file, next) => {
    next(null, `${__dirname}/../uploads/imgsCertificados`);
};

const uploadImgPerfil = multer({
    storage: multer.diskStorage({ destination: postImgPerfil, filename }),
});

const uploadImgCadastro = multer({
    storage: multer.diskStorage({ destination: postImgCert, filename })
})

export {uploadImgPerfil, uploadImgCadastro};