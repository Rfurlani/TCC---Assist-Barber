/*
import sgMail from '@sendgrid/mail';
import { SENGRID_API, HOST_EMAIL } from '../constants';

sgMail.setApiKey(SENGRID_API);

const enviarEmail = async (email, subject, text, html) => {
    try {
        const msg = {
            html,
            text,
            subject,
            to: email,
            from: HOST_EMAIL,
        };
        await sgMail.send(msg);
        console.log("Email enviado.");
    } catch (err) {
        console.log("Erro ao enviar email\n", err.message);
    } finally{
        return;
    }
};

export default enviarEmail;
*/