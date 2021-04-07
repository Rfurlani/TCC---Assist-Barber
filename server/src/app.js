import './config/dotenv.js'
import './config/db.js'
import cors from 'cors'
import express from 'express'
import usuario from './routes/usuarioRotas.js'

//Configurando Portas
const port = process.env.PORT || 5000;

//Configurando Middleware e Framework
const app = express();
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

//Definindo rotas para Middleware
app.use('/usuario', usuario);

//Definindo Portas
app.listen(port);
console.log(`Escutando em http://localhost:${port}/`);

export default app;