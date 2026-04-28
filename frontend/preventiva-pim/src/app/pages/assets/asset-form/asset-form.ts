import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';

import { EquipamentosService } from '../../../services/equipamento.service';
import { Equipamento } from '../../../models/equipamento.model';
import { SetorService } from '../../../services/setor.service'; // Importação do novo serviço
import { Setor } from '../../../models/setor.model'; // Importação da Interface

@Component({
  selector: 'app-asset-form',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, RouterModule],
  templateUrl: './asset-form.html'
})
export class AssetForm implements OnInit {
  assetForm!: FormGroup;
  isEditMode = false;
  assetId?: number;
  loading = false;
  
  // Agora a lista tem um tipo definido em vez de "any"
  setores: Setor[] = []; 

  constructor(
    private fb: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private equipamentoService: EquipamentosService,
    private setorService: SetorService // Serviço Injetado
  ) {
    this.initForm();
  }

  ngOnInit(): void {
    this.carregarSetores();

    const id = this.route.snapshot.params['id'];
    if (id) {
      this.assetId = Number(id);
      this.isEditMode = true;
      this.carregarDadosEquipamento(this.assetId);
    }
  }

  private initForm() {
    this.assetForm = this.fb.group({
      codigo: ['', [Validators.required]],
      nome: ['', [Validators.required]],
      tipo: ['', [Validators.required]],
      id_setor: ['', [Validators.required]], // Inicializa vazio para o select funcionar
      fabricante: [''],
      modelo: [''],
      ativo: [true]
    });
  }

  carregarSetores() {
    this.setorService.listar().subscribe({
      next: (dados: Setor[]) => {
        this.setores = dados;
      },
      error: (err) => console.error('Erro ao buscar lista de setores', err)
    });
  }

  carregarDadosEquipamento(id: number) {
    this.equipamentoService.buscarPorId(id).subscribe({
      next: (dados: Equipamento) => {
        this.assetForm.patchValue({
          ...dados,
          id_setor: dados.setor?.id_setor || dados.id_setor
        });
      },
      error: (err) => console.error('Erro ao buscar equipamento', err)
    });
  }

  voltar() {
    this.router.navigate(['/assets']);
  }

  onSubmit() {
    if (this.assetForm.invalid) {
      this.assetForm.markAllAsTouched();
      return;
    }

    this.loading = true;
    
    // 1. Pega os valores originais do formulário
    const formValues = this.assetForm.value;

    // 2. Normaliza o campo "tipo" (e você pode fazer o mesmo para "nome" se quiser)
    // Ex: transforma "compresSor" em "Compressor"
    let tipoNormalizado = formValues.tipo ? formValues.tipo.trim().toLowerCase() : '';
    if (tipoNormalizado.length > 0) {
      tipoNormalizado = tipoNormalizado.charAt(0).toUpperCase() + tipoNormalizado.slice(1);
    }

    // 3. Monta o objeto final para salvar, substituindo o tipo pelo normalizado
    const dadosParaSalvar: Equipamento = {
      ...formValues,
      tipo: tipoNormalizado, // Sobrescreve com o texto formatado
      id: this.assetId
    };

    this.equipamentoService.salvar(dadosParaSalvar).subscribe({
      next: (res) => {
        console.log('Sucesso:', res);
        this.loading = false;
        this.router.navigate(['/assets']);
      },
      error: (err) => {
        console.error('Erro ao salvar no Postgres:', err);
        this.loading = false;
        alert('Ocorreu um erro ao salvar o equipamento. Verifique o console.');
      }
    });
  }
}