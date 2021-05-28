//Trata erros específicos, enviando mensagens específicas

//Trata erros de Aplicacao
export class erroAplicacao extends Error {
    constructor(statusCode, message = "um erro ocorreu", erros) {
      super(message);
      this.statusCode = statusCode || 500;
      this.message = message;
      this.errors = erros;
    }
}
  
//Trata erros de recurso não encontrado
  export class erroNaoEncontrado extends erroAplicacao {
    constructor(message) {
      super(404, message || "recurso não encontrado");
    }
}