import { Router } from 'express';
import { Usuario } from '../models';
//import enviarEmail from '../functions/email-sender';
import Validator from '../middlewares/validator-middleware';
import { ValidacaoAutenticacao, ValidacaoCadastro } from '../validators';

const router = Router();

/**
 * @description Criar uma nova conta de usuario
 * @api /usuario/api/cadastrar
 * @access Public
 * @type POST
 */
router.post(
    "/api/cadastrar", 
    ValidacaoCadastro, 
    Validator, 
    async (req, res) =>{
        try {
            let { email, cargo } = req.body;
            //Checa se usuario com este email existe
            let usuario =  await Usuario.findOne({ email });
            if (usuario){
                return res.status(400).json({
                    success: false,
                    message: "Email já cadastrado."
                });
            }
            //Cria novo usuario
            //Resposta de criação de conta.
            if(cargo == "Barbeiro"){
                //Enviar email de verificação
            /*
                let html = `
                <h1>Olá, ${usuario.nome}</h1>
                <p>Aguarde enquanto o Admin verifica suas informações.
                <br>Um email será enviado sobre a averiguação de seu cadastro.</p>
                `;
                enviarEmail(
                    usuario.email, 
                    "Verificação de Conta", 
                    "Por favor verifique sua conta.", 
                    html);  
            */
                usuario = new Usuario({
                    ...req.body
                });
                await usuario.save();
                return res.status(201).json({
                    message: "Conta sobre averiguação. Confira seu email para mais informações."
                })

            }else{
                usuario = new Usuario({
                    ...req.body
                });
                usuario.validado =  true;
                await usuario.save();
                return res.status(201).json({
                    message: "Conta criada! Aguarde ser redirecionado a página principal."
                })
            }
        } catch (err) {
            console.log(err);
            return res.status(500).json({
            success: false,
            message: "Um erro ocorreu.",
            err
            });
            
        }
    }
);


/**
 * @description Autenticar um usuario e pegar o token de autenticacao
 * @api /usuario/api/autenticar
 * @access Public
 * @type POST
 */

router.post(
    '/api/autenticar', 
    ValidacaoAutenticacao, 
    Validator, 
    async () => {
        try {
            let { email, senha } = req.body;
            let usuario = await Usuario.findOne({email});
            if(!usuario){
                return res.status(404).json({
                    success: false,
                    message: "Email de usuário não encontrado."
                });
            }
            if(await usuario.compareSenha(senha)){
                return res.status(401).json({
                    success: false,
                    message: "Senha incorreta."
                });
            }
            let token = await usuario.gerarJWT();
            return res.status(200).json({
                success: true,
                usuario: usuario.getUsuarioInfo(),
                token: `Bearer ${token}`,
                message: "Você está logado."
            })
        } catch (err) {
            return res.status(500).json({
                success: false,
                message: "Um erro ocorreu.",
            });
        }
    }
)

export default router;