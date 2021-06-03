import { Router } from 'express';
import { Usuario } from '../models';
//import enviarEmail from '../functions/email-sender';

const router = Router();

const maxAge = 3 * 24 * 60 * 60;
/**
 * @description Criar uma nova conta de usuario
 * @api /usuarios/api/cadastrarUsuario
 * @access public
 * @type POST
 */

export const cadastrarUsuario = async (req, res) => {
    try {
        let { email, cargo } = req.body;
        //Checa se usuario com este email existe
        let usuario = await Usuario.findOne({ email });
        if (usuario) {
            return res.status(400).json({
                success: false,
                msg: "Email já cadastrado."
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
                msg: "Conta sobre averiguação. Confira seu email para mais informações."
            });

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
                secure: true,
                age: maxAge
            })
                .status(201).json({
                    success: true,
                    msg: "Contra criada! Logando!",
                });
        }
    } catch (err) {
        console.log(err);
        return res.status(500).json({
            success: false,
            msg: "Um erro ocorreu.",
            err
        });

    }
}

/**
 * @description Loga autenticando um usuario e pegar o token de autenticacao
 * @api /usuarios/api/autenticar
 * @access public
 * @type POST
 */

export const logarUsuario = async (req, res) => {
    try {
        let { email, senha } = req.body;
        let usuario = await Usuario.findOne({ email }).select('+senha');
        if (!usuario) {
            return res.status(404).json({
                success: false,
                msg: "Email de usuário não encontrado."
            });
        }
        if (!(await usuario.compareSenha(senha))) {
            return res.status(401).json({
                success: false,
                msg: "Senha incorreta."
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
                msg: "Você está logado.",
            })
    } catch (err) {
        return res.status(500).json({
            success: false,
            msg: "Um erro ocorreu.",
        });
    }
}

/**
 * @description Autentica usuarios logados e retorna o usuario
 * @api /usuarios/api/autenticar
 * @access private
 * @type GET
 */

export const getUsuario = (req, res) => {
    return res.status(200).json({
        usuario: req.user,
    })
}

/**
 * @description Desloga usuario autenticado
 * @api /usuarios/api/logout
 * @access private
 * @type GET
 */

export const deslogarUsuario = async (req, res) => {
    try {
        return res.cookie('jwt', {
            age: 1
        }).status(200).json({
            success: true,
            msg: "Você deslogou!"
        })
    } catch (err) {
        console.log(err);
        return res.status(400).json({
            err,
            success: false,
            msg: "Um erro ocorreu ao deslogar.",
        });
    }
}

export default router;