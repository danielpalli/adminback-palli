import mongoose from 'mongoose';

export const conectarDB = async () => {
  try {
    const connection = await mongoose.connect(
      'mongodb+srv://dbUser:fpYzfHt5ipmeD91D@micluster.dkelb.mongodb.net/?retryWrites=true&w=majority'
    );
    console.log(connection.connection.host);
    console.log(connection.connection.port);
  } catch (err) {
    console.log(err);
    process.exit(1);
  }
};
