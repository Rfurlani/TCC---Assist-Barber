import { Barbeiro } from '../models/';

class BarbeiroDAO {

    constructor(){
        this.model = Barbeiro;
    }

    buscarTodos() {
        return this.model.find({}).exec();
    }

    buscarPorID(id){
        return this.model.findById(id).exec();
    }

    buscarPorEmail(email) {
        return this.model.findOne({email}).exec();
    }

    buscarPorEmailComSenha(email) {
        return this.model.findOne({email}).select('+senha').exec();
    }

    salvar(payload) {
        const barbeiro = new Barbeiro(payload);
        return barbeiro.save();
    }

}

export default BarbeiroDAO;