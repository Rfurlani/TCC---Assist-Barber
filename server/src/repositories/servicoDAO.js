import { Servico } from '../models/';

class ServicoDAO {

    constructor(){
        this.model = Servico;
    }

    buscarTodos() {
        return this.model.find().exec();
    }

    buscarPorID(id){
        return this.model.findById(id).exec();
    }

    criarServico(payload) {
        const servico = new this.model(payload);
        return servico.save();
    }

    async buscarPorBarbeiro(id){
        const query = this.model.find({ idBarbeiro: id });
        query.getFilter();
        let servicos = await query.exec();
        return servicos;
    }

    excluirServico(id){
        this.model.findByIdAndDelete(id).exec();
    }

    async atualizarServico(id, body){
        return await this.model.findByIdAndUpdate(
            id,
            { ...body },
            { new: true }
        ).exec();
    }

}

export default ServicoDAO;