import express from 'express';
import { join } from 'path';
import ManageDB from './utils/ManageDB';

//Importar constantes da aplicação
import { PORT } from './constants'

//Importar Rotas Apis
//import agendaRouter from './routers/agenda-router.js';
import geoPosRouter from './routers/geoPos-router.js';
import clienteRouter from './routers/cliente-router.js';
import barbeiroRouter from './routers/barbeiro-router.js';

//Importar Middlewares
import cors from 'cors';
import passport from 'passport';
import { json } from 'body-parser';
import cookieParser from 'cookie-parser';
require("./middlewares/passport-middleware");

//Inicializar a aplicação express
const app = express();

//Config cors
import corsOptions from './utils/cors-config.js';

app.use(cors(corsOptions));

//Inicializar middlewares da aplicação
app.use(json());
app.use(cookieParser());
app.use(passport.initialize());
app.use(express.static(join(__dirname, './uploads')));

//Router
app.use('/geoPos', geoPosRouter);
//app.use('/agenda', agendaRouter);
app.use('/cliente', clienteRouter);
app.use('/barbeiro', barbeiroRouter);
app.use('/logout', (req, res) => {
    return res.cookie('jwt', '', {
        maxAge: 1
    }).status(200).json({
        success: true,
        msg: "Você deslogou!"
    })
})

const main = () => {
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