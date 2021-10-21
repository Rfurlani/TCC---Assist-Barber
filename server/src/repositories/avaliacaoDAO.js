import { Avaliacao } from '../models';

class AvaliacaoDAO {

    constructor(){
        this.model = Avaliacao;
    }

    async buscarPorIdBarbeiro(barbeiroId){
        return await this.model.find({barbeiroId}).exec();
    }

    async contarAvaliacoes(barbeiroId){
        let qtd = await this.model.find({ barbeiroId }).exec();
        return qtd.length;
    }

    async inserirAvaliacao(payload) {
        const avaliacao = new this.model(payload);
        return avaliacao.save();
    }

}

export default AvaliacaoDAO;