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
        return cliente.save();
    }

    async atualizarCliente(id, body, path) {
        return await this.model.findByIdAndUpdate(
            id,
            {
                ...body,
                imagemPerfil: path
            },
            { new: true }
        ).exec();
    }

}

export default ClienteDAO;