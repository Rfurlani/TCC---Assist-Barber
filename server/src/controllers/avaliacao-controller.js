import Avaliacao from "../domains/avaliacao-domain.js";
import AvaliacaoDAO from "../repositories/avaliacaoDAO.js";

class AvaliacaoController {

    constructor() {
        this.avaliacaoDAO = new AvaliacaoDAO();
    }

    /**
     * @description Pega avaliações do barbeiro
     */
    async buscarAvaliacoes(idBarbeiro){
        try{
            return await this.avaliacaoDAO.buscarPorIdBarbeiro(idBarbeiro);
        } catch(err){
            return err;
        }
    }

    /**
     * @description Retorna a quantidade de avaliacoes
     */
    async buscarQtdAvaliacoes(idBarbeiro){
        try {
            return await this.avaliacaoDAO.contarAvaliacoes(idBarbeiro);
        } catch (err) {
            return err;
        }
    }
 

    /**
     * @description Cria avaliação do Barbeiro
     */
    async avaliarBarbeiro(clienteId, barbeiroId, avaliacao) {
        try{
            avaliacao = new Avaliacao(
                avaliacao.descricao,
                avaliacao.nota,
                clienteId,
                barbeiroId
            );

            avaliacao = await this.avaliacaoDAO.inserirAvaliacao(avaliacao);

            return avaliacao;
        } catch(err){
            return err;
        }
    }
}

export default AvaliacaoController;