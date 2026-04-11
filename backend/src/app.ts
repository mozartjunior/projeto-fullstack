import express from "express";
import router from "./routes/index.js";

const app = express();
const equipamentoRouter = router;

app.use(express.json());
app.use(equipamentoRouter);

// app.get("/test", (req, res) => {
//     res.json({ message: "Test endpoint" });
// });

export default app;