import Barbeiro from '../domains/barbeiro-domain';
import BarbeiroDAO from '../repositories/barbeiroDAO';
import { genSaltSync, hashSync } from 'bcryptjs';
import ManageJWT from '../utils/ManageJWT';
import { maxAge } from '../constants';
import ValidacaoUsuario from '../validators/validacao-usuario';

class BarbeiroController {

    constructor() {
        this.barbeiroDAO = new BarbeiroDAO();
        this.validacaoUsuario = new ValidacaoUsuario();
        this.manageJWT = new ManageJWT();
    }

    /**
     * @description Criar uma nova conta de usuario para barbeiro
     * @api /barbeiro/cadastrar-barbeiro
     * @access public
     * @type POST
     */

    async cadastrar(req, res) {

        try {

            let { email } = req.body;

            let barbeiro = await this.barbeiroDAO.buscarPorEmail(email);

            this.validacaoUsuario.checarEmailCadastro(barbeiro);

            barbeiro = new Barbeiro(
                req.body.email, 
                req.body.nome, 
                req.body.senha, 
                req.body.telefone, 
                true,        //Alterar com verificação por email
                req.body.cpf,
                []
            );

            var salt = genSaltSync(10);

            barbeiro.senha = hashSync(barbeiro.senha, salt);

            barbeiro = await this.barbeiroDAO.salvar(barbeiro);

            return res.status(201).json({
                    success: true,
                    msg: "Conta sobre averiguação." + 
                    " Confira seu email para mais informações."
                });

        } catch (err) {
            let errMsg = err.message;
            return res.status(500).json({
                success: false,
                msg: "Um erro ocorreu.",
                err,
                errMsg
            });

        }

    }

    /**
     * @description Autentica um usuario e pega o token de autenticacao
     * @api /barbeiro/autenticar-barbeiro
     * @access public
     * @type POST
     */

    async autenticar(req, res){

        try {
            
            let { email, senha } = req.body;

            let barbeiro = await this.barbeiroDAO.buscarPorEmailComSenha(email);

            this.validacaoUsuario.checarEmailAutenticacao(barbeiro);

            this.validacaoUsuario.compararSenha(senha, barbeiro.senha);

            const payload = { id: barbeiro._id };

            let token = this.manageJWT.gerarJWT(payload);

            return res.cookie('jwt',
                token, {
                httpOnly: true,
                secure: false,//trocar em producao
                maxAge: maxAge
            })
                .status(201).json({
                    success: true,
                    msg: "Autenticado! Logando!"
                });


        } catch (err) {
            console.log(err);
            let errMsg = err.message;
            return res.status(500).json({
                success: false,
                msg: "Um erro ocorreu.",
                err,
                errMsg
            });
            
        }

    }

    /**
     * @description Desloga cliente autenticado
     * @api /barbeiro/deslogar-barbeiro
     * @access private
     * @type GET
     */

     deslogar(req, res) {

        return res.cookie('jwt', '',{
            maxAge: 1
        }).status(200).json({
            success: true,
            msg: "Você deslogou!"
        })

    }

    /**
     * @description Pega informações do barbeiro autenticado
     * @api /barbeiro/get-barbeiro
     * @access private
     * @type GET
     */

    async exibirBarbeiro (req, res){
        
        try{
            const user = req.user;
            
            let barbeiro = await this.barbeiroDAO.buscarPorID(user._id);

            return res.status(200).json({
                barbeiro,
                msg: "Barbeiro pego com sucesso!"
            })
        } catch(err){
            console.log(err.message)
            return res.status(500).json({
                success: false,
                msg: "Um erro ocorreu.",
                err
            });
        }

    }

    /**
     * @description Pega informações do barbeiro escolhido
     * @api /barbeiro/get-barbeiro/:idBarbeiro
     * @access private
     * @type GET
     */

    async exibirBarbeiroInfo (req, res){
        
        try{
            const { idBarbeiro } = req.params;

            let barbeiro = await this.barbeiroDAO.buscarPorID(idBarbeiro);

            return res.status(200).json({
                barbeiro,
                msg: "Barbeiro pego com sucesso!"
            })
        } catch(err){
            console.log(err.message)
            return res.status(500).json({
                success: false,
                msg: "Um erro ocorreu.",
                err
            });
        }

    }
    /**
     * @description Alterar barbeiro autenticado
     * @api /barbeiro/alterar/:id
     * @access private
     * @type PUT
     */
}

export default BarbeiroController;
