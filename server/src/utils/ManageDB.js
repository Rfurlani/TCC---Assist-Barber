import mongoose from 'mongoose';
import { DB } from '../constants';

class ManageDB {

    static async connect(){
        await mongoose.connect(DB, {
            useNewUrlParser: true,
            useFindAndModify: false,
            useUnifiedTopology: true
        }).catch((err)=>{
            console.log(`Erro conexão: ${err}`);
        })

        console.log('CONECTADO AO BANCO!');

    }

    static async close(){
        await mongoose.connection.close().catch((err) => {
            console.log(`Erro ao fechar conexão: ${err}`);
        });

        console.log('BANCO FECHADO!');
    }
    
}

export default ManageDB;