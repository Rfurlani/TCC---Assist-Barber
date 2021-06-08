import { SECRET } from '../constants';
import { sign } from 'jsonwebtoken';

class ManageJWT{

    constructor(){}

    gerarJWT(payload){
        return sign(payload, SECRET, { expiresIn: 86400, });
    }

}

export default ManageJWT;