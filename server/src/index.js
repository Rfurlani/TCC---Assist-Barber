import cors from 'cors';
import { join } from 'path';
import consola from 'consola';
import express from 'express';
import mongoose from 'mongoose';
import passport from 'passport';
import { json } from 'body-parser';

//Importar constantes da aplicação
import {
    DB, PORT
} from './constants'

//Importar Rotas Apis
import usuarioApis from "./apis/usuarios";
import perfisApis from "./apis/perfis";

//Importar Middleware do Passport
require("./middlewares/passport-middleware");

//Inicializar a aplicação express
const app = express();

//Inicializar middlewares da aplicação
app.use(cors());
app.use(json());
app.use(passport.initialize());
app.use(express.static(join(__dirname, './uploads')));

//Injetar sub router e apis
app.use('/usuarios', usuarioApis);
app.use('/perfis', perfisApis);

const main = async () => {
    try{
        //Conectar com o banco de dados
        await mongoose.connect(DB, {
            useNewUrlParser: true,
            useFindAndModify: false,
            useUnifiedTopology: true
        });

        consola.success("BANCO CONECTADO...")
        //Iniciar server da aplicação para escutar por chamadas no servidor
        app.listen(PORT, () => consola.success(`Server iniciado na porta ${PORT}`));
    } catch(err){
        consola.error(`Incapaz de iniciar o server \n ${err.message}`);
    }
}

main();