import { Router } from "express";
import { EquipamentoController } from "../controllers/EquipamentoController.js";

const router = Router();
const controllers = new EquipamentoController();

router.post("/equipamentos", (req, res)=> controllers.create(req, res));


router.get("/equipamentos", (req, res)=> controllers.list(req, res));
router.put("/equipamentos/:codigo", (req, res)=> controllers.update(req, res)); 


export default router;