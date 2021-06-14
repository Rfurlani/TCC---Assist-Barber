import { DOMAIN } from '../constants';
import ManageJWT from '../utils/ManageJWT.js';
import Barbeiro from '../domains/barbeiro-domain.js';
import BarbeiroDAO from '../repositories/barbeiroDAO.js';
import { encriptar } from '../utils/bcrypt-functions.js';
import autorizarOperacao from '../utils/autorizar-operacao.js';
import ValidacaoUsuario from '../validators/validacao-usuario.js';
import ServicoController from './servico-controller.js';
import AgendaBarbeiroController from './agenda-barbeiro-controller.js';

class BarbeiroController {

    constructor() {
        this.barbeiroDAO = new BarbeiroDAO();
        this.validacaoUsuario = new ValidacaoUsuario();
        this.manageJWT = new ManageJWT();
        this.servicoController = new ServicoController();
        this.agendaBarbeiroController = new AgendaBarbeiroController();
    }

    /**
     * @description Criar uma nova conta de usuario para barbeiro
     * @type POST <multipart-form> request
     * @api /barbeiro/cadastrar-barbeiro
     * @access public
     */

    async cadastrar(req, res) {

        try {

            let { email } = req.body;

            //let { file } = req;

            let barbeiro = await this.barbeiroDAO.buscarPorEmail(email);

            //let path = DOMAIN + file.path.split("uploads")[1];
            
            this.validacaoUsuario.checarEmailCadastro(barbeiro);
            
            barbeiro = new Barbeiro(
                req.body.email,
                req.body.nome,
                req.body.senha,
                req.body.telefone,
                true,        //Alterar com verificação por email
                req.body.cpf,
                [],
                null,
                null,
                null, //path certificado
                'barbeiro',
                {}
            );

            barbeiro.senha = encriptar(barbeiro.senha);
            
            barbeiro = await this.barbeiroDAO.salvar(barbeiro);

            this.agendaBarbeiroController.criarAgendaBarbeiro(barbeiro._id);//Mover para quando validar

            return res.status(201).json({
                success: true,
                msg: "Conta sobre averiguação. Confira seu email para mais informações."
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
     * @description Autentica um barbeiro e envia o token de autenticacao
     * @api /barbeiro/autenticar-barbeiro
     * @access public
     * @type POST
     */

     async autenticar(req, res) {

        try {

            let { email, senha } = req.body;

            let barbeiro = await this.barbeiroDAO.buscarPorEmailComSenha(email);

            this.validacaoUsuario.checarEmailAutenticacao(barbeiro);

            this.validacaoUsuario.compararSenha(senha, barbeiro.senha);

            const payload = { id: barbeiro._id };

            let token = this.manageJWT.gerarJWT(payload);

            barbeiro = {
                id: barbeiro.id,
                nome: barbeiro.nome,
                cargo: barbeiro.cargo
            };

            return res.status(201).json({
                    success: true,
                    token: `Bearer ${token}`,
                    barbeiro,
                    msg: "Autenticado! Logando!"
                });

        } catch (err) {
            console.log(err.message);
            return res.status(500).json({
                success: false,
                msg: "Um erro ocorreu.",
                err
            });

        }

    }

    /**
     * @description Pega informações do barbeiro autenticado
     * @api /barbeiro/get-barbeiro
     * @access private
     * @type GET
     */

    async exibirBarbeiro(req, res) {

        try {
            const user = req.user;

            let barbeiro = await this.barbeiroDAO.buscarPorID(user._id);

            return res.status(200).json({
                barbeiro,
                msg: "Barbeiro pego com sucesso!"
            })
        } catch (err) {
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

    async exibirBarbeiroInfo(req, res) {

        try {
            const { idBarbeiro } = req.params;

            let barbeiro = await this.barbeiroDAO.buscarPorID(idBarbeiro);

            return res.status(200).json({
                barbeiro,
                msg: "Barbeiro pego com sucesso!"
            })
        } catch (err) {
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
     * @api /barbeiro/:idBarbeiro/alterar-barbeiro
     * @access private
     * @type PATCH <multipart-form> request
     */

     async alterarBarbeiro (req, res) {
        try {
            let { idBarbeiro } = req.params;

            let { user, body, file } = req;

            let path = DOMAIN + file.path.split("uploads")[1];

            autorizarOperacao(idBarbeiro.toString(), user._id.toString());

            let barbeiro = await this.barbeiroDAO.atualizarBarbeiro(idBarbeiro, body, path);
            
            return res.status(200).json({
                barbeiro,
                success: true,
                msg: "Barbeiro atualizado com sucesso.",
            });
        } catch (err) {
            console.log(err);
            return res.status(400).json({
                err,
                success: false,
                msg: "Incapaz de atualizar barbeiro."
            });
        }
    }

    /**
     * @description Alterar imagem de perfil de barbeiro autenticado
     * @api /barbeiro/:idBarbeiro/alterar-barbeiro/imagemPerfil
     * @access private
     * @type PATCH <multipart-form> request
     */

     async alterarBarbeiroImg (req, res) {
        try {
            let { idBarbeiro } = req.params;

            let { user, file } = req;

            let path = DOMAIN + file.path.split("uploads")[1];

            autorizarOperacao(idBarbeiro.toString(), user._id.toString());

            let barbeiro = await this.barbeiroDAO.atualizarBarbeiroImgPerfil(idBarbeiro, path);
            
            return res.status(200).json({
                barbeiro,
                success: true,
                msg: "Imagem perfil atualizada com sucesso."
            });
        } catch (err) {
            console.log(err);
            return res.status(400).json({
                err,
                success: false,
                msg: "Imagem perfil atualizada com sucesso."
            });
        }
    }

    /**
     * @description Criar um servico pelo Barbeiro autenticado
     * @api /barbeiro/:idBarbeiro/criar-servico
     * @access private
     * @type POST
     */

    async inserirServico(req, res) {
        try{

        const { idBarbeiro } = req.params;

        const user = req.user;

        let servico = req.body;

        autorizarOperacao(idBarbeiro.toString(), user._id.toString());

        servico = await this.servicoController.criarServico(servico, idBarbeiro);

        this.barbeiroDAO.salvarServico(servico._id, servico.barbeiro);

            return res.status(201).json({
                servico,
                success: true,
                msg: 'Servico criado com sucesso!'
            })

        } catch (err) {
            return res.status(400).json({
                err,
                success: false,
                msg: "Incapaz de criar o servico."
            });
        }

    }

    /**
     * @description Listar servicos do Barbeiro
     * @api /barbeiro/:idBarbeiro/listar-servicos
     * @access private
     * @type GET
     */

    async listarServicos(req, res){
        try {
            
            const { idBarbeiro } = req.params;

            let servicos = await this.servicoController.listarServicosBarbeiro(idBarbeiro);

            if(!servicos){
                throw Error('Nenhum servico encontrado!')
            }

            return res.status(200).json({
                msg: 'Serviços encontrados!',
                success: true,
                servicos
            })

        } catch (err) {
            
            return res.status(500).json({
                err,
                msg: 'Um erro ocorreu!'
            })

        }
    }

    /**
     * @description Excluir um servico do Barbeiro autenticado
     * @api /barbeiro/:idBarbeiro/excluir-servico/:id
     * @access private
     * @type DELETE
     */
     async excluirServico(req, res) {
        try {

            let { idBarbeiro, id } = req.params;

            let { user } = req;

            autorizarOperacao(idBarbeiro.toString(), user._id.toString());

            this.servicoController.excluirServico(id);

            this.barbeiroDAO.removerServico(idBarbeiro, id);

            return res.status(200).json({
                success: true,
                msg: "Servico excluído com sucesso."
            });

        } catch (err) {
            let errmsg = err.message;
            return res.status(400).json({
                errmsg,
                err,
                success: false,
                msg: "Incapaz de excluir servico."
            });

        }
    }

    /**
     * @description Editar um servico do Barbeiro autenticado
     * @api /barbeiro/:idBarbeiro/alterar-servico/:id
     * @access private
     * @type PATCH
     */

     async alterarServico(req, res) {
        try {
            const { idBarbeiro, id } = req.params;

            const { user, body } = req;

            autorizarOperacao(idBarbeiro.toString(), user._id.toString());

            let servico = await this.servicoController.atualizarServico(id, body);

            return res.status(200).json({
                success: true,
                msg: "Servico editado com sucesso.",
                servico
            });

        } catch (err) {
            console.log(err);
            return res.status(400).json({
                err,
                success: false,
                msg: "Incapaz de atualizar servico."
            });
        }
    }
}

export default BarbeiroController;
