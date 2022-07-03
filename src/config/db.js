import mongoose from "mongoose";

export const conectarDB = async () => {
    try {
        const connection = await mongoose.connect(process.env.MONGO_URITWO);
        console.log(connection.connection.host);
        console.log(connection.connection.port);
    } catch (err) {
        console.log(err);
        process.exit(1);
    }
};