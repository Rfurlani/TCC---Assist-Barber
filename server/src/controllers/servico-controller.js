import Servico from '../domains/servico-domain';
import ServicoDAO from '../repositories/servicoDAO';
import BarbeiroDAO from '../repositories/BarbeiroDAO';
import autorizarCRUD from '../utils/autorizar-crud';

class ServicoController {

    constructor() {

        this.barbeiroDAO = new BarbeiroDAO();
        this.servicoDAO = new ServicoDAO();
    }

    /**
     * @description Criar um servico pelo Barbeiro autenticado
     * @api /servicos/barbeiro/:idBarbeiro/criar-servico
     * @access private
     * @type POST
     */

    async criarServico(req, res) {

        try {
            let { idBarbeiro } = req.params;

            let { user } = req;

            autorizarCRUD(idBarbeiro.toString(), user._id.toString());

            let servico = new Servico(
                req.body.nome,
                req.body.descricao,
                req.body.preco,
                idBarbeiro
            );
            
            servico = await this.servicoDAO.criarServico(servico);

            this.barbeiroDAO.salvarServico(servico._id, servico.idBarbeiro);
            
            return res.status(201).json({
                servico,
                success: true,
                msg: "Servico criado com sucesso."
            });

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
     * @api /servicos/barbeiro/:idBarbeiro/listar-servicos
     * @access private
     * @type GET
     */

     async listarServicosBarbeiro (req, res) {
        try {

            const { idBarbeiro } = req.params;

            let servicos = await this.servicoDAO.buscarPorBarbeiro(idBarbeiro);

            return res.status(200).json({
                success: true,
                msg: "Servicos encontrados!",
                servicos
            });

        } catch (err) {

            return res.status(400).json({
                err,
                success: false,
                msg: "Incapaz de listar servicos."
            });

        }
    }

    /**
     * @description Excluir um servico do Barbeiro autenticado
     * @api /servicos/barbeiro/:idBarbeiro/excluir-servico/:id
     * @access private
     * @type DELETE
     */
     async excluirServico (req, res) {
        try {

            let { idBarbeiro, id } = req.params;

            let { user } = req;

            autorizarCRUD(idBarbeiro.toString(), user._id.toString());
            this.servicoDAO.excluirServico(id);
            this.barbeiroDAO.removerServico(id, idBarbeiro);


            return res.status(200).json({
                success: true,
                msg: "Servico deletado com sucesso."
            });

        } catch (err) {
            let errmsg = err.message;
            return res.status(400).json({
                errmsg,
                err,
                success: false,
                msg: "Incapaz de deletar servico."
            });

        }
    }


    /**
     * @description Editar um servico do Barbeiro autenticado
     * @api /servicos/barbeiro/:idBarbeiro/alterar-servico/:id
     * @access private
     * @type PUT
     */

    async alterarServico (req, res) {
        try {
            let { idBarbeiro, id } = req.params;

            let { user, body } = req;

            autorizarCRUD(idBarbeiro.toString(), user._id.toString());

            let servico = await this.servicoDAO.atualizarServico(id, body);
            
            return res.status(200).json({
                servico,
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

export default ServicoController;