/**
 * @DESC Checa o cargo dos usuario para conceder permissão em determinadas requests. Recebe o cargo do nível de acesso que a rota necessita e compara com o do usuário, retornando um erro de autorização caso falhe.
 * 
 */

const checarCargos = cargos => (req, res, next) =>
  !cargos.includes(req.user.cargo)
    ? res.status(401).json("Operação não autorizada!")
    : next();

export default checarCargos;