import { Router } from "express";
import { EquipamentoController } from "../controllers/EquipamentoController.js";
import { SetorController } from "../controllers/SetorController.js";
import { UsuarioController } from "../controllers/UsuarioController.js";
import { AuthController } from "../controllers/AuthController.js";

const routes = Router();
const equipamentoController = new EquipamentoController();
const setorController = new SetorController();
const usuarioController = new UsuarioController();
const authController = new AuthController();

routes.get("/", (req, res) => {
  res.json({
    status: "ok",
    message: "API PreventivaPIM está funcionando!"
  });
});

// Auth
routes.post("/auth/login", (req, res) => authController.login(req, res));
routes.post("/auth/refresh", (req, res) => authController.refresh(req, res));
routes.post("/auth/logout", (req, res) => authController.logout(req, res));

// Equipamentos
routes.post("/equipamentos", (req, res) => equipamentoController.create(req, res));
routes.get("/equipamentos", (req, res) => equipamentoController.getAll(req, res));
routes.patch("/equipamentos/:id/desativar", (req, res) => equipamentoController.desativar(req, res));
routes.get("/equipamentos/:id", (req, res) => equipamentoController.getById(req, res));
routes.put("/equipamentos/:codigo", (req, res) => equipamentoController.update(req, res));

// Setores
routes.post("/setores", (req, res) => setorController.create(req, res));
routes.get("/setores", (req, res) => setorController.getAll(req, res));
routes.patch("/setores/:id_setor/desativar", (req, res) => setorController.desativar(req, res));
routes.get("/setores/:id_setor", (req, res) => setorController.getById(req, res));

// Usuários
routes.post("/usuarios", (req, res) => usuarioController.create(req, res));
routes.get("/usuarios", (req, res) => usuarioController.getAll(req, res));
routes.get("/usuarios/:id_usuario", (req, res) => usuarioController.getById(req, res));

export default routes;