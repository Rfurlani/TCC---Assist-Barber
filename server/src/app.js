import './config/dotenv.js'
import './config/db.js'
import cors from 'cors'
import express from 'express'

const port = process.env.PORT || 5000;
const app = express();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.listen(port);
console.log(`Escutando em http://localhost:${port}/`);

export default app;