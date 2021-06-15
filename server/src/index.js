import express from 'express';
import { join } from 'path';
import ManageDB from './utils/ManageDB';

//Importar constantes da aplicação
import { PORT } from './constants'

//Importar Rotas Apis
import usuarioRouter from './routers/usuario-router';
import clienteRouter from './routers/cliente-router.js';
import barbeiroRouter from './routers/barbeiro-router.js';
import agendaRouter from './routers/agenda-router.js';

//Importar Middlewares
import cors from 'cors';
import passport from 'passport';
import { json } from 'body-parser';
require("./middlewares/passport-middleware");

//Inicializar a aplicação express
const app = express();

//Config cors
import corsOptions from './utils/cors-config.js';

app.use(cors(corsOptions));

//Inicializar middlewares da aplicação
app.use(json());
app.use(passport.initialize());
app.use(express.static(join(__dirname, './uploads')));

//Router
app.use('/usuario', usuarioRouter);
app.use('/cliente', clienteRouter);
app.use('/barbeiro', barbeiroRouter);
app.use('/agenda', agendaRouter);
/*

app.use('/agenda-cliente', agendaClienteRouter);
app.use('/agenda-barbeiro', agendaBarbeiroRouter);*/

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