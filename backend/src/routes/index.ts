import { Router } from "express";

const routes = Router();

routes.get("/", (req, res) => {
  res.json({
    status: "ok",
    message: "API PreventivaPIM está funcionando!"
  });
});

export default routes;