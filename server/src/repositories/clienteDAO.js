import { Cliente } from '../models/';

class ClienteDAO {

    constructor(){
        this.model = Cliente;
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
        const cliente = new Cliente(payload);
        cliente.validado = true; //Alterar com verificação por email
        return cliente.save();
    }

}

export default ClienteDAO;