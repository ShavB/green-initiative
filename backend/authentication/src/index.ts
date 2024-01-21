import express from "express";
import MongoDb from "./db/db-config";
import userRoutes from './routes/authRoute'
import bodyparser from 'body-parser';
import cors from 'cors';
import dotenv from 'dotenv'

dotenv.config();

const app = express();
const PORT = 8001;

MongoDb();

app.use(cors());
app.use(bodyparser.json());
app.use(bodyparser.urlencoded({ extended: true }));
app.use(userRoutes);

app.use((req: any, res: any, next: any) => {
    next(new Error("url not found"));
});

app.listen(PORT, () => {
    console.log(`server is listening at http://localhost:${PORT}`);
});
