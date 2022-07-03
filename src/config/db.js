import mongoose from 'mongoose';

export const conectarDB = async () => {
  const MONGO_URI =
    'mongodb+srv://dbUser:fpYzfHt5ipmeD91D@micluster.dkelb.mongodb.net/?retryWrites=true&w=majority';
  try {
    const connection = await mongoose.connect(MONGO_URI);
    console.log(connection.connection.host);
    console.log(connection.connection.port);
  } catch (err) {
    console.log(err);
    process.exit(1);
  }
};
