import { Injectable, inject, signal, computed } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { firstValueFrom } from 'rxjs';
import { Tarefa, NovaTarefa, AtualizacaoTarefa } from
'../models/tarefa.model';

@Injectable({ providedIn: 'root' })
export class TarefasService {

    private readonly apiUrl = 'https://sua-api.com/api/tarefas';
    private http = inject(HttpClient);
    
    // Estado central: todas as tarefas carregadas
    readonly tarefas = signal<Tarefa[]>([]);
    readonly carregando = signal(false);
    readonly erro = signal<string | null>(null);
    
    // Computeds: derivados do estado central
    readonly total = computed(() => this.tarefas().length);
    readonly concluidas = computed(() =>
        this.tarefas().filter(t => t.status === 'concluida').length
    );
    readonly pendentes = computed(() =>
        this.tarefas().filter(t => t.status === 'pendente').length
    );
    readonly urgentes = computed(() =>
        this.tarefas().filter(t => t.prioridade === 'urgente').length
    );

    async carregar(): Promise<void> {
        this.carregando.set(true);
        this.erro.set(null);
        try {
            const dados = await firstValueFrom(
                this.http.get<Tarefa[]>(this.apiUrl)
        );
        this.tarefas.set(dados);
        } catch {
        this.erro.set('Não foi possível carregar as tarefas. Tente novamente.');
        } finally {
            this.carregando.set(false);
    }}

    async buscarPorId(id: number): Promise<Tarefa> {
        return firstValueFrom(
            this.http.get<Tarefa>(`${this.apiUrl}/${id}`)
        );
    }
    
    async criar(dados: NovaTarefa): Promise<Tarefa> {
        const nova = await firstValueFrom(
            this.http.post<Tarefa>(this.apiUrl, dados)
        );
        this.tarefas.update(lista => [ ...lista, nova ]);
        return nova;
    }

    async atualizar(id: number, dados: AtualizacaoTarefa):Promise<Tarefa> {
        const atualizada = await firstValueFrom(
            this.http.put<Tarefa>(`${this.apiUrl}/${id}`, dados)
        );
        this.tarefas.update(lista =>
            lista.map(t => t.id === id ? atualizada : t)
        );
        return atualizada;

    // async excluir(id: number): Promise<void> {
    //     await firstValueFrom(
    //         this.http.delete<void>(`${this.apiUrl}/${id}`)
    //     );
    //     this.tarefas.update(lista => lista.filter(t => t.id !== id));
    // }    
}