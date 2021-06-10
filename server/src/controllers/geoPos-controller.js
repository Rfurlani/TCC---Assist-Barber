import GeoPos from '../domains/geoPos-domain.js';
import GeoPosDAO from '../repositories/geoPosDAO.js';
import BarbeiroDAO from '../repositories/barbeiroDAO.js';

class GeoPosController {

    constructor() {
        this.geoPosDAO = new GeoPosDAO();
        this.barbeiroDAO = new BarbeiroDAO();
    }

    /**
     * @description Cria e insere uma GeoLocalização GeoJSON do Barbeiro
     * @api /servicos/barbeiro/:idBarbeiro/criar-servico
     * @access private
     * @type POST
     */

    async inserirGeoPos(req, res) {

        try {

            let localizacao = {
                type: 'Point',
                coordinates: req.body.coordinates
            }

            let geoPos = new GeoPos(
                req.user._id,
                localizacao
            );

            geoPos = await this.geoPosDAO.criarGeoPosDAO(geoPos);

            this.barbeiroDAO.salvarGeoPos(geoPos._id, geoPos.barbeiro);

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
                msg: "Incapaz de criar o servico."
            });
        }

    }

    /**
     * @description Listar barbeiros ao redor
     * @api /geoPos/barbeiros/
     * @access private
     * @type GET
     */

    async buscarBarbeirosProximos(req, res) {
        try {

            let { lng, lat } = req.query
            let raio = req.query.raio;

            const barbeiros = await this.geoPosDAO.buscarGeoPos(lng, lat, raio)

            return res.status(200).json({
                success: true,
                msg: "Barbeiros próximos encontrados!",
                barbeiros
            });
        } catch (err) {
            return res.status(400).json({
                success: false,
                msg: "Não foi encontrar barbeiros."
            });
        }
    }

    /**
     * @description Atualizar coordenadas
     * @api /geoPos/:id/
     * @access private
     * @type PATCH
     */

    async atualizarLocalizacao(req, res) {
        try {
            let { id } = req.params;

            let coordenadas = req.body;

            this.geoPosDAO.atualizarLocalizacao(id, coordenadas);

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

export default GeoPosController;