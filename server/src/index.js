import express from 'express';
import { join } from 'path';
import ManageDB from './utils/ManageDB';

//Importar constantes da aplicação
import { PORT, REQ_PORT } from './constants'

//Importar Rotas Apis
import perfilRouter from './routers/perfilRouter';
import servicoRouter from './routers/servicoRouter';
import authRouter from './routers/auth-router';

//Importar Middlewares
import cors from 'cors';
import passport from 'passport';
import { json } from 'body-parser';
import cookieParser from 'cookie-parser';
require("./middlewares/passport-middleware");

//Inicializar a aplicação express
const app = express();

//Headers
app.use(function (req, res, next) {
    res.header('Access-Control-Allow-Origin', REQ_PORT);
    res.header('Access-Control-Allow-Credentials', true);
    res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
    res.header('Access-Control-Allow-Methods', "GET, POST, PUT, DELETE");
    app.use(cors());
    next();
});

//Inicializar middlewares da aplicação
app.use(json());
app.use(cookieParser());
app.use(passport.initialize());
app.use(express.static(join(__dirname, './uploads')));

//Injetar sub router e apis
app.use('/perfis', perfilRouter);
app.use('/servicos', servicoRouter);
app.use('/auth', authRouter);

const main = async () => {
    try {
        //Conectar com o banco de dados
        ManageDB.connect();

        //Iniciar server da aplicação para escutar por chamadas no servidor
        app.listen(PORT, () => console.log(`Server iniciado na porta ${PORT}`));

    } catch (err) {

        console.log(`Incapaz de iniciar o server \n ${err.message}`);

    }
}

main();