import type { Request, Response, NextFunction } from 'express';
import { PlanoService } from '../services/manutencao/plano.service';
import { ExecucaoService } from '../services/manutencao/CreateExecucaoService.js';
// import * as PlanoService from '../services/manutencao/plano.service';
// import * as ExecucaoService from '../services/manutencao/execucao.service';

// POST /planos
export async function criar(req: Request, res: Response, next: NextFunction) {
  try {
    const plano = await PlanoService.criarPlano(req.body);
    res.status(201).json(plano);
  } catch (err) {
    next(err);
  }
}

// GET /planos  |  GET /planos?equipamento_id=X
export async function listar(req: Request, res: Response, next: NextFunction) {
  try {
    const equipamento_id = req.query.equipamento_id
      ? Number(req.query.equipamento_id)
      : undefined;

    const planos = await PlanoService.listarPlanos(equipamento_id);
    res.json(planos);
  } catch (err) {
    next(err);
  }
}

// GET /planos/:id
export async function buscar(req: Request, res: Response, next: NextFunction) {
  try {
    const plano = await PlanoService.buscarPorId(Number(req.params.id));
    if (!plano) {
      res.status(404).json({ message: 'Plano não encontrado' });
      return;
    }
    res.json({
      ...plano,
      status_prazo: PlanoService.calcularStatusPrazo(plano.proxima_em),
      dias_atraso:  PlanoService.calcularDiasAtraso(plano.proxima_em),
    });
  } catch (err) {
    next(err);
  }
}

// PUT /planos/:id
export async function atualizar(req: Request, res: Response, next: NextFunction) {
  try {
    const atualizado = await PlanoService.atualizarPlano(Number(req.params.id), req.body);
    if (!atualizado) {
      res.status(404).json({ message: 'Plano não encontrado' });
      return;
    }
    res.json(atualizado);
  } catch (err) {
    next(err);
  }
}

// DELETE /planos/:id  (soft delete — marca como inativo)
export async function desativar(req: Request, res: Response, next: NextFunction) {
  try {
    const ok = await PlanoService.desativarPlano(Number(req.params.id));
    if (!ok) {
      res.status(404).json({ message: 'Plano não encontrado' });
      return;
    }
    res.status(204).send();
  } catch (err) {
    next(err);
  }
}

// GET /planos/:id/historico
export async function historico(req: Request, res: Response, next: NextFunction) {
  try {
    const execucoes = await ExecucaoService.historicoDePlano(Number(req.params.id));
    res.json(execucoes);
  } catch (err) {
    next(err);
  }
}