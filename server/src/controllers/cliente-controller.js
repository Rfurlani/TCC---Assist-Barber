import { DOMAIN } from '../constants';
import ManageJWT from '../utils/ManageJWT.js';
import Cliente from '../domains/cliente-domain.js';
import ClienteDAO from '../repositories/clienteDAO.js';
import autorizarOperacao from '../utils/autorizar-operacao.js';
import ValidacaoUsuario from '../validators/validacao-usuario.js';
import AgendaController from './agenda-controller';

class ClienteController {

    constructor() {
        this.manageJWT = new ManageJWT();
        this.clienteDAO = new ClienteDAO();
        this.validacaoUsuario = new ValidacaoUsuario();
        this.agendaController = new AgendaController();
    }

    /**
     * @description Cria uma nova conta de usuario para cliente
     */

    async criarCliente(cliente) {
        let agenda = await this.agendaController.criarAgenda(cliente.usuarioId);//Mover para quando validar

        cliente = new Cliente(
            cliente.usuarioId,
            cliente.endereco,
            agenda._id
        );

        cliente = await this.clienteDAO.salvar(cliente);
    }

    /**
     * @description Pega informações do cliente autenticado
     * @api /cliente/get-cliente
     * @access private
     * @type GET
     */

    async exibirCliente(req, res) {

        try {
            const user = req.user;

            let cliente = await this.clienteDAO.buscarPorUsuarioId(user._id);

            return res.status(200).json({
                cliente,
                msg: "Cliente pego com sucesso!"
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

    /** //Depois de chat
     * @description Alterar cliente autenticado
     * @api /cliente/:idCliente/alterar-cliente
     * @access private
     * @type PATCH
     */

    async alterarCliente(req, res) {
        try {
            let { idCliente } = req.params;

            let { user, body, file } = req;

            let path = DOMAIN + file.path.split("uploads")[1];

            autorizarOperacao(idCliente.toString(), user._id.toString());

            let cliente = await this.clienteDAO.atualizarCliente(idCliente, body, path);

            return res.status(200).json({
                cliente,
                success: true,
                msg: "Cliente atualizado com sucesso.",
            });
        } catch (err) {
            console.log(err);
            return res.status(400).json({
                err,
                success: false,
                msg: "Incapaz de atualizar cliente."
            });
        }
    }




}

export default ClienteController;
