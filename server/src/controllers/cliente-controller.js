import { DOMAIN } from '../constants';
import ManageJWT from '../utils/ManageJWT.js';
import Cliente from '../domains/cliente-domain.js';
import ClienteDAO from '../repositories/clienteDAO.js';
import autorizarOperacao from '../utils/autorizar-operacao.js';
import ValidacaoUsuario from '../validators/validacao-usuario.js';
import AgendaClienteController from './agenda-cliente-controller.js';
import HistoricoClienteController from './historico-cliente-controller.js';


class ClienteController {

    constructor() {
        this.manageJWT = new ManageJWT();
        this.clienteDAO = new ClienteDAO();
        this.validacaoUsuario = new ValidacaoUsuario();
        this.agendaClienteController = new AgendaClienteController();
        this.historicoClienteController = new HistoricoClienteController();
    }

    /**
     * @description Cria uma nova conta de usuario para cliente
     */

    async criarCliente(cliente) {

        const historico = await this.historicoClienteController.criarHistorico(cliente.usuarioId);

        cliente = new Cliente(
            cliente.usuarioId,
            cliente.endereco
        );

        cliente = await this.clienteDAO.salvar(cliente);

        return cliente;
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

    /**
     * @description Alterar cliente autenticado
     */

     async alterarCliente(idUsuario, body) {
		try {
			let cliente = await this.clienteDAO.buscarPorUsuarioId(idUsuario);

			const idCliente = cliente._id;
	
			cliente = await this.clienteDAO.atualizarCliente(idCliente, body)

			return cliente;
		} catch (err) {
			return err;
		}
	}
}

export default ClienteController;
