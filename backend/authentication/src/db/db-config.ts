import mongoose, { ConnectOptions } from "mongoose";
import dotenv from "dotenv";
dotenv.config();

const MongoDb = () => {
    try {
        const url: string | undefined = process.env.MONGODB_URL;
        if (!url) {
            throw new Error("mongodb issue");
        }
        mongoose.connect(url);        
        console.log("db connected");
    } catch (e) {
        console.log(e);
    }
};

export default MongoDb;
