import { Router } from "express";
import { ensureAuth } from "../middlewares/ensureAuth.js";
import { ensurePerfil } from "../middlewares/ensurePerfil.js";

import { AuthController } from "../controllers/AuthController.js";
import { EquipamentoController } from "../controllers/EquipamentoController.js";
import { SetorController } from "../controllers/SetorController.js";
import { UsuarioController } from "../controllers/UsuarioController.js";

import { PlanoManutencaoController } from "../controllers/PlanoManutencaoController.js";
import { ExecucaoManutencaoController } from "../controllers/ExecucaoManutencaoController.js";
import { DashboardController } from "../controllers/DashboardController.js";
import { CalendarioController } from "../controllers/CalendarioController.js";

import { validateBody } from "../middlewares/validateBody.js";
import { Perfil } from "../types/Perfil.js";
import { loginSchema, refreshSchema, logoutSchema } from "../dtos/authDTO.js";
import { createUserSchema } from "../dtos/createUserSchemaDTO.js";
import { createPlanoSchema, updatePlanoSchema } from "../dtos/createPlanoManutencaoDTO.js";

const routes = Router();

const authController = new AuthController();
const equipamentoController = new EquipamentoController();
const setorController = new SetorController();
const usuarioController = new UsuarioController();
const planoController = new PlanoManutencaoController();
const execucaoController = new ExecucaoManutencaoController();
const dashboardController = new DashboardController();
const calendarioController = new CalendarioController();

// routes.get("/", (req, res) => {
//   res.json({ status: "ok", message: "API PreventivaPIM está funcionando!" });
// });

// ─── Auth (públicas) ──────────────────────────────────────────────
routes.post("/auth/login", validateBody(loginSchema), (req, res, next) => authController.login(req, res, next));
routes.post("/auth/refresh", validateBody(refreshSchema), (req, res, next) => authController.refresh(req, res, next));
routes.post("/auth/logout", validateBody(logoutSchema), (req, res, next) => authController.logout(req, res, next));


// ── A partir daqui: JWT obrigatório (RNF03) ──────────────────────────────────
routes.use(ensureAuth);

// ─── Equipamentos ─────────────────────────────────────────────────
// Todos autenticados podem ver
// routes.post("/usuarios", (req, res) => usuarioController.create(req, res));
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
routes.get("/planos/:id/historico", ensureAuth, (req, res, next) => planoController.historico(req, res, next));

// ─── Execuções de Manutenção ────────────────────────────────────
// Todos autenticados podem criar e ver detalhes de execução
routes.post("/execucoes", ensureAuth, (req, res, next) => execucaoController.create(req, res, next));
routes.get("/execucoes/:id", ensureAuth, (req, res, next) => execucaoController.getById(req, res, next));
routes.get("/calendario", ensureAuth, (req, res, next) => calendarioController.getCalendario(req, res, next));
routes.get("/dashboard", ensureAuth, (req, res, next) => dashboardController.getDashboard(req, res, next));

export default routes;
