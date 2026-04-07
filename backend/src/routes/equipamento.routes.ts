import { Router } from "express";
import { EquipamentoController } from "../controllers/EquipamentoController.js";

const router = Router();
const controllers = new EquipamentoController();

router.post("/equipamentos", (req, res)=> controllers.create(req, res));

// Ainda não está finalizado essa parte, pois depende de outras funcionalidades que ainda não foram implementadas, como a listagem e atualização dos equipamentos. Por isso, os endpoints para essas ações estão comentados por enquanto.
// router.get("/equipamentos", (req, res)=> controllers.list(req, res));
// router.put("/equipamentos/:codigo", (req, res)=> controllers.update(req, res));


export default router;