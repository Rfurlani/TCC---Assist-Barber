import Avaliacao from "../domains/avaliacao-domain.js";
import AvaliacaoDAO from "../repositories/avaliacaoDAO.js";

class AvaliacaoController {

    constructor() {
        this.avaliacaoDAO = new AvaliacaoDAO();
    }

    /**
     * @description Cria avaliação do Barbeiro
     */
    avaliarBarbeiro(info) {

        avaliacao = new Avaliacao(
            info.descricao,
            info.nota,
            info.cliente,
            info.barbeiro
        );

    }
}

export default AvaliacaoController;