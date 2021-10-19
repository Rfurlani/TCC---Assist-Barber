import { Admin } from '../models/';

class AdminDAO {
    
    constructor(){
        this.model = Admin;
    }
    
    salvar(payload) {
        const admin = new Admin(payload);
        return admin.save();
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

}

export default AdminDAO;