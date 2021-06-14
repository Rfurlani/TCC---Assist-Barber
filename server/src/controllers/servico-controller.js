import Servico from '../domains/servico-domain.js';
import ServicoDAO from '../repositories/servicoDAO.js';


class ServicoController {
    
    constructor() {
        this.servicoDAO = new ServicoDAO();
    }
    
    async buscarServico(id){
        return await this.servicoDAO.buscarPorID(id);
    }

    async criarServico(servico, idBarbeiro) {
        servico = new Servico(
            servico.nome,
            servico.descricao,
            servico.preco,
            idBarbeiro
        );

        servico = await this.servicoDAO.inserirServico(servico);

        return servico;
    }

    excluirServico(idServico) {

        this.servicoDAO.excluirServico(idServico);

    }

    async listarServicosBarbeiro(idBarbeiro) {

        return await this.servicoDAO.buscarPorBarbeiro(idBarbeiro);

    }

    async atualizarServico(idServico, servico){
        return await this.servicoDAO.atualizarServico(idServico, servico);
    }

}

export default ServicoController;