import { Router } from 'express';

//Constantes
import { DOMAIN } from '../constants';

//Instanciando Router
const router = Router();

//Middlewares
import { usuarioAuth } from '../middlewares/auth-guard';
import { uploadImgPerfil as uploader } from '../middlewares/uploader';

//Funcções Controller
import {
    criarPerfil, exibirPerfil,
} from '../controllers/perfilControl';

//Rotas
router.route("/api/criar-perfil").post(
    usuarioAuth,
    uploader.single("imagemPerfil"),
    criarPerfil
);

router.route("/api/meu-perfil").get(
    usuarioAuth,
    exibirPerfil
);

router.route("/api/editar-perfil").put(
    usuarioAuth,
    uploader.single("imagemPerfil")
);


export default router;