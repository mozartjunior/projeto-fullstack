import { Router } from "express";
import { EquipamentoController } from "../controllers/EquipamentoController.js";

const router = Router();
const controllers = new EquipamentoController();

router.post("/equipamentos", (req, res)=> controllers.create(req, res));

export default router;