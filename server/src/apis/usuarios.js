import { Router } from 'express';
import { Usuario } from '../models';
import { usuarioAuth } from '../middlewares/auth-guard';
//import enviarEmail from '../functions/email-sender';
import Validator from '../middlewares/validator-middleware';
import { ValidacaoAutenticacao, ValidacaoCadastro } from '../validators';
import { truncate } from 'lodash';

const router = Router();

/**
 * @description Criar uma nova conta de usuario
 * @api /usuarios/api/cadastrar
 * @access public
 * @type POST
 */
router.post(
    "/api/cadastrar",
    ValidacaoCadastro,
    Validator,
    async (req, res) => {
        try {
            let { email, cargo } = req.body;
            //Checa se usuario com este email existe
            let usuario = await Usuario.findOne({ email });
            if (usuario) {
                return res.status(400).json({
                    success: false,
                    message: "Email já cadastrado."
                });
            }
            //Cria novo usuario
            //Resposta de criação de conta.
            if (cargo == "Barbeiro") {
                //Enviar email sobre validação
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
                usuario.validado = true;//Alterar quando fizer validação admin
                await usuario.save();
                return res.status(201).json({
                    message: "Conta sobre averiguação. Confira seu email para mais informações."
                })

            } else {
                usuario = new Usuario({
                    ...req.body
                });

                usuario.validado = true;

                await usuario.save();

                let token = await usuario.gerarJWT();

                return res.cookie('jwt',
                    token, {
                    httpOnly: true,
                    secure: false,//Setar para true em produção,
                    expires: date.getTime() + (24 * 60 * 60 * 1000)
                })
                .status(201).json({
                    success: true,
                    message: "Contra criada! Logando!",
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
 * @api /usuarios/api/autenticar
 * @access public
 * @type POST
 */
router.post(
    '/api/autenticar',
    ValidacaoAutenticacao,
    Validator,
    async (req, res) => {
        try {
            let { email, senha } = req.body;
            let usuario = await Usuario.findOne({ email }).select('+senha');
            if (!usuario) {
                return res.status(404).json({
                    success: false,
                    message: "Email de usuário não encontrado."
                });
            }
            if (!(await usuario.compareSenha(senha))) {
                return res.status(401).json({
                    success: false,
                    message: "Senha incorreta."
                });
            }
            let token = await usuario.gerarJWT();
            return res.cookie('jwt',
                    token, {
                    httpOnly: true,
                    secure: false,//Setar para true em produção,
                    //expires: new Date(new Date().getTime()+5*60*1000)
                })
                .status(200).json({
                    success: true,
                    message: "Você está logado.",
                })
        } catch (err) {
            console.log(err);
            return res.status(500).json({
                success: false,
                message: "Um erro ocorreu.",
            });
        }
    }
)

/**
 * @description Autentica usuarios logados e retorna o usuario
 * @api /usuarios/api/autenticar
 * @access private
 * @type GET
 */
router.get('/api/autenticar', usuarioAuth, async (req, res) => {
    return res.status(200).json({
        usuario: req.user,
    });
});

/**
 * @description Desloga usuario autenticado
 * @api /usuarios/api/logout
 * @access private
 * @type GET
 */

router.get('/api/logout', usuarioAuth, async (req, res) => {
    return res.cookie('jwt',
        token, {
        //httpOnly: false,
        secure: false,//Setar para true em produção,
        //withCredentials: true,
        expires: 100
    }
    )
        .status(200)
        .json({
            success: true,
            message: "Você está logado.",
        })
});

export default router;