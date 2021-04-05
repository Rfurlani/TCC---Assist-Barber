import mongoose from "mongoose";
const init = () => {
  mongoose
    .connect(process.env.DB_URL, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      useCreateIndex:true
    })
    .catch((err) => {
      console.error('Erro: ' + err.stack);
      process.exit(1);
    });
  mongoose.connection.on('open', () => {
    console.log('Conectado ao banco de dados');
  });

};

mongoose.Promise = global.Promise;

export default init();