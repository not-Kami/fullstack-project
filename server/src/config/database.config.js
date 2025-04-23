import mongoose from 'mongoose';

const mongoURI = `mongodb+srv://${process.env.MONGO_USER}:${process.env.MONGO_PWD}@server.vc5ro49.mongodb.net/?retryWrites=true&w=majority&appName=server`;

mongoose.connect(mongoURI)
  .then(() => console.log('Connexion à MongoDB réussie !'))
  .catch((err) => {
    console.error('Connexion à MongoDB échouée !', err.message);
  });

  
export default mongoose;