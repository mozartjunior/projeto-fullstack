import 'dotenv/config'
import express from "express";
import cors from "cors";
import routes from "./routes/index.js";
import { errorHandler } from "./middlewares/errorHandler.js";

const app = express();

app.use(cors({
    origin: process.env.FRONTEND_URL || "http://localhost:4200",
}));
app.use(express.json());
app.use(routes);
app.use(errorHandler);

export default app;