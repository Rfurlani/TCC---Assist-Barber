import multer from 'multer';

//Renomeia Arquivo
const filename = (req, file, next) => {
    let lastIndexOf = file.originalname.lastIndexOf(".");
    let ext = file.originalname.substring(lastIndexOf);
    next(null, `file-${Date.now()}${ext}`);
};

//Pasta destino imagens perfil
const postImgPerfil = (req, file, next) => {
    next(null, `${__dirname}/../uploads/imgsPerfis`);
};

//Pasta destino certificados
const postCert = (req, file, next) => {
    next(null, `${__dirname}/../uploads/certificados`);
};

const uploadImgPerfil = multer({
    storage: multer.diskStorage({ destination: postImgPerfil, filename }),
});

const uploadCertificado = multer({
    storage: multer.diskStorage({ destination: postCert, filename })
})

export {uploadImgPerfil, uploadCertificado};