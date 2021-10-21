import Barbeiro from "../domains/barbeiro-domain.js";
import BarbeiroDAO from "../repositories/barbeiroDAO.js";
import autorizarOperacao from "../utils/autorizar-operacao.js";
import ServicoController from "./servico-controller.js";
import GeoPosController from "./geoPos-controller.js";
import AvaliacaoController from './avaliacao-controller.js';

class BarbeiroController {
	constructor() {
		this.barbeiroDAO = new BarbeiroDAO();
		this.servicoController = new ServicoController();
		this.geoPosController = new GeoPosController();
		this.avaliacaoController = new AvaliacaoController();
	}

	/**
	 * @description Criar uma nova conta de usuario para barbeiro
	 */

	async criarBarbeiro(barbeiro) {

		try {
			barbeiro = new Barbeiro(
				barbeiro.usuarioId,
				barbeiro.cpf,
				[],
				null,
				null, //mudar para path
				null,
				''
			);
	
			barbeiro = await this.barbeiroDAO.salvar(barbeiro);
	
			let geoPos = await this.geoPosController.inserirGeoPos(
				barbeiro._id,
				null
			);
	
			this.barbeiroDAO.salvarGeoPos(geoPos._id, barbeiro._id);
	
			return barbeiro;
		} catch (err) {
			return err;
		}
	}

	/**
	 * @description Buscar e retorna um cliente através do Id do Usuário
	 */

	async buscarPorUsuarioId(usuarioId) {
		try {
			return await this.barbeiroDAO.buscarPorUsuarioId(usuarioId);
		} catch (err) {
			return err;
		}
	}

	/**
	 * @description Pega informações do barbeiro autenticado
	 * @api /barbeiro/get-barbeiro
	 * @access private
	 * @type GET
	 */

	async exibirBarbeiro(req, res) {
		try {
			const user = req.user;

			let barbeiro = await this.barbeiroDAO.buscarPorUsuarioId(user._id);

			return res.status(200).json({
				barbeiro,
				msg: "Barbeiro pego com sucesso!",
			});
		} catch (err) {
			console.log(err.message);
			return res.status(500).json({
				success: false,
				msg: "Um erro ocorreu.",
				err,
			});
		}
	}

	/**
	 * @description Pega lista de barbeiros
	 */

	async exibirBarbeiros(){
		try {
			let barbeiros = await this.barbeiroDAO.buscarTodos();

			return barbeiros;
		} catch(err){
			return err;
		}
	}

	/**
	 * @description Pega informações do barbeiro escolhido
	 * @api /barbeiro/get-barbeiro/:idBarbeiro
	 * @access private
	 * @type GET
	 */

	async exibirBarbeiroInfo(req, res) {
		try {
			const { idBarbeiro } = req.params;

			let barbeiro = await this.barbeiroDAO.buscarPorID(idBarbeiro);

			return res.status(200).json({
				barbeiro,
				msg: "Barbeiro pego com sucesso!",
			});
		} catch (err) {
			console.log(err.message);
			return res.status(500).json({
				success: false,
				msg: "Um erro ocorreu.",
				err,
			});
		}
	}
	/**
	 * @description Alterar barbeiro autenticado
	 */

	async alterarBarbeiro(idUsuario, body) {
		try {
			let barbeiro = await this.barbeiroDAO.buscarPorUsuarioId(idUsuario);

			const idBarbeiro = barbeiro._id;
	
			barbeiro = await this.barbeiroDAO.atualizarBarbeiro(idBarbeiro, body)

			return barbeiro;
		} catch (err) {
			return err;
		}
	}

	/**
	 * @description Exclui um barbeiro
	 */

	 async excluirBarbeiro(idUsuario) {
		try {
			let barbeiro = await this.barbeiroDAO.buscarPorUsuarioId(idUsuario);

			const idBarbeiro = barbeiro._id;
	
			barbeiro = await this.barbeiroDAO.excluirBarbeiro(idBarbeiro);

			return barbeiro;
		} catch (err) {
			return err;
		}
	}

	/**
	 * @description Criar um servico pelo Barbeiro autenticado
	 * @api /barbeiro/:idBarbeiro/criar-servico
	 * @access private
	 * @type POST
	 */

	async inserirServico(req, res) {
		try {
			const { idBarbeiro } = req.params;

			let barbeiro = await this.barbeiroDAO.buscarIdUsuario(idBarbeiro);
			const user = req.user;
			autorizarOperacao(barbeiro.usuarioId.toString(), user._id.toString());

			let servico = req.body;

			servico = await this.servicoController.criarServico(servico, idBarbeiro);

			this.barbeiroDAO.salvarServico(servico._id, servico.barbeiroId);

			return res.status(201).json({
				servico,
				success: true,
				msg: "Servico criado com sucesso!",
			});
		} catch (err) {
			console.log(err.message);
			return res.status(400).json({
				err,
				success: false,
				msg: "Incapaz de criar o servico.",
			});
		}
	}

	/**
	 * @description Listar servicos do Barbeiro
	 * @api /barbeiro/:idBarbeiro/listar-servicos
	 * @access private
	 * @type GET
	 */

	async listarServicos(req, res) {
		try {
			const { idBarbeiro } = req.params;

			let servicos = await this.servicoController.listarServicosBarbeiro(
				idBarbeiro
			);

			if (!servicos) {
				throw new Error("Nenhum servico encontrado!");
			}

			return res.status(200).json({
				msg: "Serviços encontrados!",
				success: true,
				servicos,
			});
		} catch (err) {
			return res.status(500).json({
				err,
				msg: "Um erro ocorreu!",
			});
		}
	}

	/**
	 * @description Excluir um servico do Barbeiro autenticado
	 * @api /barbeiro/:idBarbeiro/excluir-servico/:id
	 * @access private
	 * @type DELETE
	 */
	async excluirServico(req, res) {
		try {
			const { idBarbeiro, id } = req.params;

			let barbeiro = await this.barbeiroDAO.buscarIdUsuario(idBarbeiro);

			const user = req.user;

			autorizarOperacao(barbeiro.usuarioId.toString(), user._id.toString());

			const servico = await this.servicoController.excluirServico(id);

			this.barbeiroDAO.removerServico(idBarbeiro, id);

			return res.status(200).json({
				success: true,
				msg: `Servico excluído com sucesso.`,
				servico,
			});
		} catch (err) {
			return res.status(400).json({
				err,
				success: false,
				msg: "Incapaz de excluir servico.",
			});
		}
	}

	/**
	 * @description Editar um servico do Barbeiro autenticado
	 * @api /barbeiro/:idBarbeiro/alterar-servico/:id
	 * @access private
	 * @type PATCH
	 */

	async alterarServico(req, res) {
		try {
			const { idBarbeiro, id } = req.params;

			let barbeiro = await this.barbeiroDAO.buscarIdUsuario(idBarbeiro);

			const { body, user } = req;

			autorizarOperacao(barbeiro.usuarioId.toString(), user._id.toString());

			let servico = await this.servicoController.atualizarServico(id, body);

			return res.status(200).json({
				success: true,
				msg: "Servico editado com sucesso.",
				servico,
			});
		} catch (err) {
			console.log(err);
			return res.status(400).json({
				err,
				success: false,
				msg: "Incapaz de atualizar servico.",
			});
		}
	}

	/**
	 * @description Cria e insere uma GeoLocalização GeoJSON do Barbeiro
	 * @api /barbeiro/:idBarbeiro/inserir-geo-pos
	 * @access private
	 * @type POST
	 */

	async inserirGeoPos(req, res) {
		try {
			const { idBarbeiro } = req.params;

			let coordenadas = req.body.coordinates;

			let geoPos = await this.geoPosController.inserirGeoPos(
				idBarbeiro,
				coordenadas
			);

			this.barbeiroDAO.salvarGeoPos(geoPos._id, idBarbeiro);

			return res.status(201).json({
				geoPos,
				success: true,
				msg: "GeoPos Criada com sucesso!",
			});
		} catch (err) {
			let errMessage = err.message;
			return res.status(400).json({
				errMessage,
				err,
				success: false,
				msg: "Incapaz de criar o GeoPos.",
			});
		}
	}

	/**
	 * @description Listar barbeiros ao redor
	 * @api /barbeiro/geoPos/listar-proximos
	 * @access private
	 * @type GET
	 */

	async listarBarbeirosProximos(req, res) {
		try {
			let { lng, lat, dist } = req.query;

			const barbeiros = await this.geoPosController.buscarBarbeirosProximos(
				lng,
				lat,
				dist
			);

			return res.status(200).json({
				success: true,
				msg: "Barbeiros próximos encontrados!",
				barbeiros,
			});
		} catch (err) {
			console.log(err.message);
			return res.status(400).json({
				success: false,
				msg: "Não foi possível encontrar barbeiros.",
			});
		}
	}

	/**
	 * @description Atualizar coordenadas
	 * @api /geoPos/:barbeiroId
	 * @access private
	 * @type PATCH
	 */

	async atualizarLocalizacao(req, res) {
		try {
			let { barbeiroId } = req.params;

			let { coordenadas } = req.body;

			this.geoPosController.atualizarLocalizacao(barbeiroId, coordenadas);

			return res.status(200).json({
				success: true,
				msg: "Localizacao atualizada com sucesso!",
			});
		} catch (err) {
			console.log(err);
			return res.status(400).json({
				err,
				success: false,
				msg: "Incapaz de atualizar localizacao.",
			});
		}
	}
	/**
	 * @description Busca avaliações Barbeiro
	 * @api /barbeiro/:idBarbeiro/avaliacoes
	 * @access private
	 * @type GET
	 */
	 async buscarAvaliacoes(req, res) {
		try {
			const {idBarbeiro} = req.params;

			const user = req.user;

			autorizarOperacao(barbeiro.usuarioId.toString(), user._id.toString());

			let avaliacoes = await this.avaliacaoController.buscarAvaliacoes(idBarbeiro);

			const qtd = await this.avaliacaoController.buscarQtdAvaliacoes(idBarbeiro);

			return res.status(200).json({
				avaliacoes,
				qtd,
				msg: "Barbeiro pego com sucesso!",
			});
		} catch (err) {
			console.log(err.message);
			return res.status(500).json({
				success: false,
				msg: "Um erro ocorreu.",
				err,
			});
		}
	}


	/**
	 * @description Atualiza a nota de avaliacao do Barbeiro
	 */

	/*async atualizarAvaliacaoBarbeiro(barbeiroId, avaliacao) {
		try {
			const barbeiro = await this.barbeiroDAO.atualizarBarbeiroAvaliacao(
				barbeiroId,
				avaliacao
			);

			if (barbeiro === null) {
				throw new Error("Agendamento não encontrado!");
			}

			return barbeiro.avaliacao;
		} catch (err) {
			return err;
		}
	}*/
}

export default BarbeiroController;
