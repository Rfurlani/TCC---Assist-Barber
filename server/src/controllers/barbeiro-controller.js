import { DOMAIN } from '../constants';
import Barbeiro from '../domains/barbeiro-domain.js';
import BarbeiroDAO from '../repositories/barbeiroDAO.js';
import autorizarOperacao from '../utils/autorizar-operacao.js';
import ServicoController from './servico-controller.js';
import GeoPosController from './geoPos-controller';
import AgendaBarbeiroController from './agenda-barbeiro-controller';
import HistoricoBarbeiroController from './historico-barbeiro-controller.js';

class BarbeiroController {

    constructor() {
        this.barbeiroDAO = new BarbeiroDAO();
        this.servicoController = new ServicoController();
        this.agendaBarbeiroController = new AgendaBarbeiroController();
        this.geoPosController = new GeoPosController();
        this.historicoBarbeiroController = new HistoricoBarbeiroController();
    }

    /**
     * @description Criar uma nova conta de usuario para barbeiro
     */

    async criarBarbeiro(barbeiro) {

            const agenda = await this.agendaBarbeiroController.criarAgenda(barbeiro.usuarioId);//Mover para quando validar

            const historico = await this.historicoBarbeiroController.criarHistorico(barbeiro.usuarioId);

            barbeiro = new Barbeiro(
                barbeiro.usuarioId,
                barbeiro.cpf,
                [],
                null,
                null, //mudar para path
            );

            barbeiro = await this.barbeiroDAO.salvar(barbeiro);

            return barbeiro;

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
                msg: "Barbeiro pego com sucesso!"
            })
        } catch (err) {
            console.log(err.message)
            return res.status(500).json({
                success: false,
                msg: "Um erro ocorreu.",
                err
            });
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
                msg: "Barbeiro pego com sucesso!"
            })
        } catch (err) {
            console.log(err.message)
            return res.status(500).json({
                success: false,
                msg: "Um erro ocorreu.",
                err
            });
        }

    }
    /**
     * @description Alterar barbeiro autenticado
     * @api /barbeiro/:idBarbeiro/alterar-barbeiro
     * @access private
     * @type PATCH <multipart-form> request
     */

    async alterarBarbeiro(req, res) {
        try {
            let { idBarbeiro } = req.params;

            let { user, body, file } = req;

            let path = DOMAIN + file.path.split("uploads")[1];

            autorizarOperacao(idBarbeiro.toString(), user._id.toString());

            let barbeiro = await this.barbeiroDAO.atualizarBarbeiro(idBarbeiro, body, path);

            return res.status(200).json({
                barbeiro,
                success: true,
                msg: "Barbeiro atualizado com sucesso.",
            });
        } catch (err) {
            console.log(err);
            return res.status(400).json({
                err,
                success: false,
                msg: "Incapaz de atualizar barbeiro."
            });
        }
    }

    /**
     * @description Alterar imagem de perfil de barbeiro autenticado
     * @api /barbeiro/:idBarbeiro/alterar-barbeiro/imagemPerfil
     * @access private
     * @type PATCH <multipart-form> request
     */

    async alterarBarbeiroImg(req, res) {
        try {
            let { idBarbeiro } = req.params;

            let { user, file } = req;

            let path = DOMAIN + file.path.split("uploads")[1];

            autorizarOperacao(idBarbeiro.toString(), user._id.toString());

            let barbeiro = await this.barbeiroDAO.atualizarBarbeiroImgPerfil(idBarbeiro, path);

            return res.status(200).json({
                barbeiro,
                success: true,
                msg: "Imagem perfil atualizada com sucesso."
            });
        } catch (err) {
            console.log(err);
            return res.status(400).json({
                err,
                success: false,
                msg: "Imagem perfil atualizada com sucesso."
            });
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

            let barbeiro = await this.barbeiroDAO.buscarPorID(idBarbeiro);

            const user = req.user;

            autorizarOperacao(barbeiro.usuarioId.toString(), user._id.toString());

            let servico = req.body;

            servico = await this.servicoController.criarServico(servico, idBarbeiro);

            this.barbeiroDAO.salvarServico(servico._id, servico.barbeiroId);

            return res.status(201).json({
                servico,
                success: true,
                msg: 'Servico criado com sucesso!'
            })

        } catch (err) {
            console.log(err.message);
            return res.status(400).json({
                err,
                success: false,
                msg: "Incapaz de criar o servico."
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

            let servicos = await this.servicoController.listarServicosBarbeiro(idBarbeiro);

            if (!servicos) {
                throw new Error('Nenhum servico encontrado!')
            }

            return res.status(200).json({
                msg: 'Serviços encontrados!',
                success: true,
                servicos
            })

        } catch (err) {

            return res.status(500).json({
                err,
                msg: 'Um erro ocorreu!'
            })

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

            let barbeiro = await this.barbeiroDAO.buscarPorID(idBarbeiro);

            const user = req.user;

            autorizarOperacao(barbeiro.usuarioId.toString(), user._id.toString());

            const servico = await this.servicoController.excluirServico(id);

            this.barbeiroDAO.removerServico(idBarbeiro, id);

            return res.status(200).json({
                success: true,
                msg: `Servico excluído com sucesso.`,
                servico
            });

        } catch (err) {
            return res.status(400).json({
                err,
                success: false,
                msg: "Incapaz de excluir servico."
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

            let barbeiro = await this.barbeiroDAO.buscarPorID(idBarbeiro);

            const { body, user } = req;

            autorizarOperacao(barbeiro.usuarioId.toString(), user._id.toString());

            let servico = await this.servicoController.atualizarServico(id, body);

            return res.status(200).json({
                success: true,
                msg: "Servico editado com sucesso.",
                servico
            });

        } catch (err) {
            console.log(err);
            return res.status(400).json({
                err,
                success: false,
                msg: "Incapaz de atualizar servico."
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

            let geoPos = await this.geoPosController.inserirGeoPos(idBarbeiro, coordenadas);

            this.barbeiroDAO.salvarGeoPos(geoPos._id, idBarbeiro);

            return res.status(201).json({
                geoPos,
                success: true,
                msg: 'GeoPos Criada com sucesso!'
            })

        } catch (err) {
            let errMessage = err.message;
            return res.status(400).json({
                errMessage,
                err,
                success: false,
                msg: "Incapaz de criar o GeoPos."
            });
        }

    }

    /**
     * @description Listar barbeiros ao redor
     * @api /barbeiros/geoPos/listar-proximos
     * @access private
     * @type GET
     */

    async listarBarbeirosProximos(req, res) {
        try {

            let { lng, lat, dist } = req.query;

            const barbeiros = await this.geoPosController.buscarBarbeirosProximos(lng, lat, dist);

            return res.status(200).json({
                success: true,
                msg: "Barbeiros próximos encontrados!",
                barbeiros
            });
        } catch (err) {
            console.log(err.message)
            return res.status(400).json({
                success: false,
                msg: "Não foi possível encontrar barbeiros."
            });
        }
    }

    /**
     * @description Atualizar coordenadas
     * @api /geoPos/:id
     * @access private
     * @type PATCH
     */

    async atualizarLocalizacao(req, res) {
        try {
            let { id } = req.params;

            let { coordenadas } = req.body;

            this.geoPosController.atualizarLocalizacao(id, coordenadas);

            return res.status(200).json({
                success: true,
                msg: "Localizacao atualizada com sucesso!"
            });
        } catch (err) {
            console.log(err);
            return res.status(400).json({
                err,
                success: false,
                msg: "Incapaz de atualizar localizacao."
            });
        }
    }
}

export default BarbeiroController;
