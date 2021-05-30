import { validationResult } from 'express-validator';

//Retorna erros caso validação fracasse 
const validacaoMiddleware = (req, res, next) => {
    let err = validationResult(req);
    if(!err.isEmpty()) {
        return res.json({
            err: err.array(),
        })
    }
    next();
};

export default validacaoMiddleware;