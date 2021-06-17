import { Cliente } from '../models/';

class ClienteDAO {
    
    constructor(){
        this.model = Cliente;
    }
    
    salvar(payload) {
        const cliente = new Cliente(payload);
        return cliente.save();
    }
    
    buscarTodos() {
        return this.model.find({}).exec();
    }

    buscarPorID(id){
        return this.model.findById(id).exec();
    }

    buscarPorUsuarioId(id){
        return this.model.findOne({usuarioId: id}).populate('usuarioId').exec();
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