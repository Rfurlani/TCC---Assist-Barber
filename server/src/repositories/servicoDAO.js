import { Servico } from '../models';

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

    inserirServico(payload) {
        const servico = new this.model(payload);
        return servico.save();
    }

    async buscarPorBarbeiro(id){
        const query = this.model.find({ barbeiro: id });
        query.getFilter();
        return await query.exec();
    }

    excluirServico(id){
        this.model.findByIdAndDelete(id).exec();
    }

    async atualizarServico(id, servico){
        return await this.model.findByIdAndUpdate(
            id,
            { ...servico },
            { new: true }
        ).exec();
    }

}

export default ServicoDAO;