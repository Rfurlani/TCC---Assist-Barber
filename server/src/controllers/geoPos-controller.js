import GeoPos from '../domains/geoPos-domain.js';
import GeoPosDAO from '../repositories/geoPosDAO.js';

class GeoPosController {

    constructor(){
        this.geoPos = new GeoPos();
        this.geoPosDAO = new GeoPosDAO();
    }

    
}

export default GeoPosController;