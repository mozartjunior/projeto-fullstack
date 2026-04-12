import { Router } from "express";
import { EquipamentoController } from "../controllers/EquipamentoController.js";
import { SetorController } from "../controllers/SetorController.js";
import { UsuarioController } from "../controllers/UsuarioController.js";
import { AuthController } from "../controllers/AuthController.js";
import { ensureAuth } from "../middlewares/ensureAuth.js";
import { validateBody } from "../middlewares/validateBody.js";
import { loginSchema, refreshSchema, logoutSchema } from "../dtos/AuthDTO.js";
import { createUserSchema } from "../dtos/createUserSchemaDTO.js";

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

// Auth (rotas públicas)
routes.post("/auth/login", validateBody(loginSchema), (req, res, next) => authController.login(req, res, next));
routes.post("/auth/refresh", validateBody(refreshSchema), (req, res, next) => authController.refresh(req, res, next));
routes.post("/auth/logout", validateBody(logoutSchema), (req, res, next) => authController.logout(req, res, next));

// Equipamentos (rotas protegidas)
routes.post("/equipamentos", ensureAuth, (req, res) => equipamentoController.create(req, res));
routes.get("/equipamentos", ensureAuth, (req, res) => equipamentoController.getAll(req, res));
routes.patch("/equipamentos/:id/desativar", ensureAuth, (req, res) => equipamentoController.desativar(req, res));
routes.get("/equipamentos/:id", ensureAuth, (req, res) => equipamentoController.getById(req, res));
routes.put("/equipamentos/:codigo", ensureAuth, (req, res) => equipamentoController.update(req, res));

// Setores (rotas protegidas)
routes.post("/setores", ensureAuth, (req, res) => setorController.create(req, res));
routes.get("/setores", ensureAuth, (req, res) => setorController.getAll(req, res));
routes.patch("/setores/:id_setor/desativar", ensureAuth, (req, res) => setorController.desativar(req, res));
routes.get("/setores/:id_setor", ensureAuth, (req, res) => setorController.getById(req, res));

// Usuários (rotas protegidas)
routes.post("/usuarios", validateBody(createUserSchema), (req, res) => usuarioController.create(req, res));
routes.get("/usuarios", ensureAuth, (req, res) => usuarioController.getAll(req, res));
routes.get("/usuarios/:id_usuario", ensureAuth, (req, res) => usuarioController.getById(req, res));

export default routes;