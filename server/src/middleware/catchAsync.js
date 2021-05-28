//Middleware responsável por pegar erros assíncronos
export default catchAsync => async (req, res, next) => {
    try {
      await catchAsync(req, res, next);
    } catch (err) {
      return next(err);
    }
};