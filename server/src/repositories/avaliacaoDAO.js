import { Avaliacao } from '../models';

class AvaliacaoDAO {

    constructor(){
        this.model = Avaliacao;
    }

    async inserirAvaliacao(payload) {
        const avaliacao = new this.model(payload);
        return avaliacao.save();
    }

}

export default AvaliacaoDAO;