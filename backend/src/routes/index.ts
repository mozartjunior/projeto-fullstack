import { Router } from "express";
import { EquipamentoController } from "../controllers/EquipamentoController.js";

const routes = Router();
const equipamentoController = new EquipamentoController();

routes.get("/", (req, res) => {
  res.json({
    status: "ok",
    message: "API PreventivaPIM está funcionando!"
  });
});

// Equipamentos
routes.post("/equipamentos", (req, res) => equipamentoController.create(req, res));
routes.get("/equipamentos", (req, res) => equipamentoController.getAll(req, res));
routes.get("/equipamentos/:id", (req, res) => equipamentoController.getById(req, res));
routes.put("/equipamentos/:codigo", (req, res) => equipamentoController.update(req, res));
routes.patch("/equipamentos/:id/desativar", (req, res) => equipamentoController.desativar(req, res));





export default routes;