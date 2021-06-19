import Avaliacao from "../domains/avaliacao-domain.js";
import AvaliacaoDAO from "../repositories/avaliacaoDAO.js";

class AvaliacaoController {

    constructor() {
        this.avaliacaoDAO = new AvaliacaoDAO();
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
                console.log(avaliacao)
            return avaliacao;
        } catch(err){
            return err;
        }
    }
}

export default AvaliacaoController;