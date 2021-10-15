import nodemailer from 'nodemailer';
import { HOST_EMAIL, HOST_EMAIL_PASSWORD } from '../constants';

class GerenciadorEmails {

    constructor(){}

    //Email transporter do APP
    criarEmail(email, assunto, info){
        //Configurando email Host do APP como transport
        console.log(HOST_EMAIL, HOST_EMAIL_PASSWORD)
        let transporter = nodemailer.createTransport({
            service: 'gmail',
            auth: {
                user: HOST_EMAIL,
                pass: HOST_EMAIL_PASSWORD
            }
        })

        //Construindo Email
        let opcoesEmail = {
            from: HOST_EMAIL,
            to: email,
            subject: assunto,
            text: `${info}
             Clique no link a seguir para conferir: `
        }

        //Enviando Email
        transporter.sendMail(opcoesEmail, function(err, data){
            if(err){
                console.log("Error ocurred", err)
                return err;
            } else {
                console.log("Email enviado", data)
                return data;
            }
        })
    }

}

export default GerenciadorEmails;