import { genSaltSync, hashSync, compareSync } from 'bcryptjs';

export const encriptar = (dado) => {
    var salt = genSaltSync(10);

    return dado = hashSync(dado, salt);
}

export const compararSenha = (senha, hash) => {
    if(!compareSync(senha, hash)){
        throw Error("Senha/Email incorreta(o).")
    }
}