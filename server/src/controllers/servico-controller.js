import Servico from '../domains/servico-domain';
import ServicoDAO from '../repositories/servicoDAO';
import BarbeiroDAO from '../repositories/BarbeiroDAO';

class ServicoController {

    constructor() {

        this.barbeiroDAO = new BarbeiroDAO();
        this.servicoDAO = new ServicoDAO();
    }

    /**
     * @description Criar um servico pelo Barbeiro autenticado
     * @api /servicos/criar-servico
     * @access private
     * @type POST
     */

    async criar(req, res) {

        try {

            //Criar novo servico
            let servico = new Servico(
                req.body.nome,
                req.body.descricao,
                req.body.preco,
                req.user._id
            );
            
            servico = await this.servicoDAO.salvar(servico);
            let barbeiro = this.barbeiroDAO.salvarServico(servico._id, servico.idBarbeiro);
            
            console.log(barbeiro);
            return res.status(201).json({
                barbeiro,
                servico,
                success: true,
                msg: "Servico criado com sucesso."
            });

        } catch (err) {
            console.log(err);
            return res.status(400).json({
                err,
                success: false,
                msg: "Incapaz de criar o servico."
            });
        }

    }

    /**
     * @description Listar servicos do Barbeiro
     * @api /servicos/api/listar-servicos
     * @access private
     * @type GET
     */

    /**
     * @description Excluir um servico do Barbeiro autenticado
     * @api /servicos/api/ecluir-servico/:id
     * @access private
     * @type DELETE
     */

    /**
     * @description Editar um servico do Barbeiro autenticado
     * @api /servicos/api/editar-servico/:id
     * @access private
     * @type PUT
     */

}

export default ServicoController;