import Servico from '../domains/servico-domain.js';
import ServicoDAO from '../repositories/servicoDAO.js';


class ServicoController {
    
    constructor() {
        this.servicoDAO = new ServicoDAO();
    }
    
    async buscarServico(id){
        try {
            
            return await this.servicoDAO.buscarPorID(id);

        } catch (err) {

            return err;

        }
    }

    async criarServico(servico, idBarbeiro) {

        try {

            servico = new Servico(
                servico.nome,
                servico.descricao,
                servico.preco,
                idBarbeiro
            );
    
            servico = await this.servicoDAO.inserirServico(servico);

            if(servico === null){
                throw Error('Erro ao inserir serviço!')
            }
    
            return servico;

        } catch (err) {

            return err;

        }
    }

    async excluirServico(idServico) {
        try {

            const servico = await this.servicoDAO.excluirServico(idServico);

            if(servico === null){
                throw new Error('Servico inexistente!')
            }

        } catch (err) {

            return err;

        } 
    }

    async listarServicosBarbeiro(idBarbeiro) {
        try {

            return await this.servicoDAO.buscarPorBarbeiro(idBarbeiro);

        } catch (err) {

            return err;

        }
    }

    async atualizarServico(idServico, servico){
        try {

            return await this.servicoDAO.atualizarServico(idServico, servico);

        } catch (err) {

            return err;
        
        }
    }
}

export default ServicoController;