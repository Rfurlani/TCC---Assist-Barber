import Admin from '../domains/admin-domain.js'
import AdminDAO from '../repositories/adminDAO.js';
import BarbeiroController from './barbeiro-controller.js';

class AdminController {
    constructor(){
        this.adminDAO = new AdminDAO()
        this.barbeiroController = new BarbeiroController();
    }

    /**
     * @description Cria uma nova conta de usuario para admin
     */

    async criarAdmin (admin) {
        admin = new Admin(
            admin.usuarioId
        );

        admin = await this.adminDAO.salvar(admin);

        return admin;
    }

    /**
     * @description Pega informações do cliente autenticado
     * @api /admin/get-admin
     * @access private
     * @type GET
     */

     async exibirAdmin(req, res) {

        try {
            const user = req.user;

            let admin = await this.adminDAO.buscarPorUsuarioId(user._id);

            return res.status(200).json({
                admin,
                msg: "Admin pego com sucesso!"
            })
        } catch (err) {
            console.log(err.message);
            return res.status(500).json({
                success: false,
                msg: "Um erro ocorreu.",
                err
            });
        }
    }

    /**
     * @description Pega barbeiros não validados
     * @api /admin/get-barbeiros
     * @access private
     * @type GET
     */

    async getBarbeiros(req, res){
        try {
            
        } catch (err) {
            
        }
    }


}

export default AdminController;