import { Servico } from '../models/';

class ServicoDAO {

    constructor(){
        this.model = Servico;
    }

    buscarTodos() {
        return this.model.find({}).exec();
    }

    buscarPorID(id){
        return this.model.findById(id).exec();
    }

    salvar(payload) {
        const servico = new Servico(payload);
        return servico.save();
    }

}

export default ServicoDAO;