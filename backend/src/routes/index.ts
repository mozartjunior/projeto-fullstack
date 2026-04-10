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

// routes.get("/equipamentos", (req, res) => {
//   res.json({
//     status: "ok",
//     message: "Endpoint de equipamentos funcionando!"
//   });
// })

// routes.get("/equipamentos", (req, res)=> equipamentoController.list(req, res));
routes.get("/equipamentos",equipamentoController.list.bind(equipamentoController));





export default routes;