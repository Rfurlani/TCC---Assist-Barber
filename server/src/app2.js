import './config/dotenv.js'
import './config/db.js'
import cors from 'cors'
import express from 'express'
import usuario from './routes/usuarioRotas.js'
import session from 'express-session'
import passport from 'passport'
import passportConfig from './config/passportConfig.js'
import servico from './routes/servicoRotas.js'

//Configurando Portas
const port = process.env.PORT || 5000;

//Configurando Middleware e Framework
const app = express();
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Express session
app.use(
    session({
      secret: 'segredoSecreto',//Ainda tenho que resolver o que por de segredo
      resave: false,
      saveUninitialized: true
    })
  );

//Passport Config
passportConfig(passport);

// Passport middleware
app.use(passport.initialize());
app.use(passport.session());

//Definindo rotas para Middleware
app.use('/usuario', usuario);
app.use('/servico', servico);

//Definindo Portas
app.listen(port);
console.log(`Escutando em http://localhost:${port}/`);

export default app;