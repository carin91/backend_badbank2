
import mongoose from "mongoose";

// DB Configuration

export const connectDB = async () => {
    try {

        const connection = await mongoose.connect( process.env.MONGO_URI ,{
            
            useUnifiedTopology: true
        })

    const url = `${connection.connection.host}:${connection.connection.port}`;
    console.log(`MongoDB conection in: ${url}`);
    }
    catch(error){
        console.log(`error: ${error.message}`);
        process.exit(1);
    }
}