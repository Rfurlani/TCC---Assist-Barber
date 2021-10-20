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
     *
     */

    async inserirGeoPos(idBarbeiro, coordenandas) {

        let localizacao = {
            type: 'Point',
            coordinates: coordenandas
        }

        let geoPos = new GeoPos(
            idBarbeiro,
            localizacao
        );

        return await this.geoPosDAO.criarGeoPos(geoPos);

    }

    /**
     * @description Listar barbeiros ao redor
     */

    async buscarBarbeirosProximos(lng, lat, dist) {

        return await this.geoPosDAO.buscarGeoPos(lng, lat, dist);
    }

    /**
     * @description Atualizar coordenadas
     */

    atualizarLocalizacao(barbeiroId, coordenadas) {
        this.geoPosDAO.atualizarLocalizacao(barbeiroId, coordenadas);
    }

    excluirGeoPos(id){
        this.geoPosDAO.excluirGeoPos(id);
    }
}

export default GeoPosController;