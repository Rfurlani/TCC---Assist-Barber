import multer from 'multer';

//Renomeia Arquivo
const filename = (req, file, next) => {
    let lastIndexOf = file.originalname.lastIndexOf(".");
    let ext = file.originalname.substring(lastIndexOf);
    next(null, `img-${Date.now()}${ext}`);
};

//Pasta destino
const destination = (req, file, next) => {
    next(null, `${__dirname}/../uploads`);
};

const upload = multer({
    storage:multer.diskStorage({ destination, filename }),
});

export default upload;