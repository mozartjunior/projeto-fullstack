// src/routes/index.ts

import { Router } from "express";
import { EquipamentoController } from "../controllers/EquipamentoController.js";
import { SetorController } from "../controllers/SetorController.js";
import { UsuarioController } from "../controllers/UsuarioController.js";
import { AuthController } from "../controllers/AuthController.js";
import { PlanoManutencaoController } from "../controllers/PlanoManutencaoController.js";
import { ensureAuth } from "../middlewares/ensureAuth.js";
import { ensurePerfil } from "../middlewares/ensurePerfil.js";
import { validateBody } from "../middlewares/validateBody.js";
import { Perfil } from "../types/Perfil.js";
import { loginSchema, refreshSchema, logoutSchema } from "../dtos/AuthDTO.js";
import { createUserSchema } from "../dtos/createUserSchemaDTO.js";
import { createPlanoSchema, updatePlanoSchema } from "../dtos/createPlanoManutencaoDTO.js";

const routes = Router();
const equipamentoController = new EquipamentoController();
const setorController = new SetorController();
const usuarioController = new UsuarioController();
const authController = new AuthController();
const planoController = new PlanoManutencaoController();

routes.get("/", (req, res) => {
  res.json({ status: "ok", message: "API PreventivaPIM está funcionando!" });
});

// ─── Auth (públicas) ──────────────────────────────────────────────
routes.post("/auth/login", validateBody(loginSchema), (req, res, next) => authController.login(req, res, next));
routes.post("/auth/refresh", validateBody(refreshSchema), (req, res, next) => authController.refresh(req, res, next));
routes.post("/auth/logout", validateBody(logoutSchema), (req, res, next) => authController.logout(req, res, next));

// ─── Equipamentos ─────────────────────────────────────────────────
// Todos autenticados podem ver
routes.get("/equipamentos", ensureAuth, (req, res) => equipamentoController.getAll(req, res));
routes.get("/equipamentos/:id", ensureAuth, (req, res) => equipamentoController.getById(req, res));
// Só GESTOR e SUPERVISOR podem criar/editar/desativar
routes.post("/equipamentos", ensureAuth, ensurePerfil(Perfil.GESTOR, Perfil.SUPERVISOR), (req, res) => equipamentoController.create(req, res));
routes.put("/equipamentos/:codigo", ensureAuth, ensurePerfil(Perfil.GESTOR, Perfil.SUPERVISOR), (req, res) => equipamentoController.update(req, res));
routes.patch("/equipamentos/:id/desativar", ensureAuth, ensurePerfil(Perfil.GESTOR), (req, res) => equipamentoController.desativar(req, res));

// ─── Setores ──────────────────────────────────────────────────────
routes.get("/setores", ensureAuth, (req, res) => setorController.getAll(req, res));
routes.get("/setores/:id_setor", ensureAuth, (req, res) => setorController.getById(req, res));
routes.post("/setores", ensureAuth, ensurePerfil(Perfil.GESTOR), (req, res) => setorController.create(req, res));
routes.patch("/setores/:id_setor/desativar", ensureAuth, ensurePerfil(Perfil.GESTOR), (req, res) => setorController.desativar(req, res));

// ─── Usuários ─────────────────────────────────────────────────────
routes.post("/usuarios", validateBody(createUserSchema), (req, res) => usuarioController.create(req, res));
routes.get("/usuarios", ensureAuth, ensurePerfil(Perfil.GESTOR, Perfil.SUPERVISOR), (req, res) => usuarioController.getAll(req, res));
routes.get("/usuarios/:id_usuario", ensureAuth, (req, res) => usuarioController.getById(req, res));
routes.patch("/usuarios/:id_usuario/desativar", ensureAuth, ensurePerfil(Perfil.GESTOR), (req, res) => usuarioController.desativar(req, res));

// ─── Planos de Manutenção ─────────────────────────────────────────
// Todos autenticados podem ver
routes.get("/planos", ensureAuth, (req, res, next) => planoController.getAll(req, res, next));
routes.get("/planos/:id", ensureAuth, (req, res, next) => planoController.getById(req, res, next));
// Só GESTOR e SUPERVISOR podem criar/editar/desativar
routes.post("/planos", ensureAuth, ensurePerfil(Perfil.GESTOR, Perfil.SUPERVISOR), validateBody(createPlanoSchema), (req, res, next) => planoController.create(req, res, next));
routes.put("/planos/:id", ensureAuth, ensurePerfil(Perfil.GESTOR, Perfil.SUPERVISOR), validateBody(updatePlanoSchema), (req, res, next) => planoController.update(req, res, next));
routes.patch("/planos/:id/desativar", ensureAuth, ensurePerfil(Perfil.GESTOR, Perfil.SUPERVISOR), (req, res, next) => planoController.desativar(req, res, next));

export default routes;