import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { EquipamentosService } from '../../../services/equipamento.service';

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
  loading = false; // Adicionado para o botão de salvar

  constructor(
    private fb: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private equipamentoService: EquipamentosService
  ) {
    this.initForm();
  }

  ngOnInit(): void {
    this.assetId = this.route.snapshot.params['id'];
    if (this.assetId) {
      this.isEditMode = true;
      this.carregarDadosEquipamento(this.assetId);
    }
  }

  private initForm() {
    this.assetForm = this.fb.group({
      codigo: ['', [Validators.required]],
      nome: ['', [Validators.required]],
      tipo: ['', [Validators.required]],
      localizacao: ['', [Validators.required]],
      fabricante: [''],
      modelo: [''],
      ativo: [true] // Já nasce como true (Ligado)
    });
  }

  carregarDadosEquipamento(id: number) {
    // Busca no banco e preenche o form automaticamente!
    this.equipamentoService.buscarPorId(id).subscribe({
      next: (dados) => {
        this.assetForm.patchValue(dados);
      },
      error: (err) => console.error('Erro ao buscar equipamento', err)
    });
  }

  voltar() {
    this.router.navigate(['/assets']);
  }

  onSubmit() {
    // Marca todos os campos como tocados para mostrar os erros (bordas vermelhas) se o usuário tentar salvar vazio
    if (this.assetForm.invalid) {
      this.assetForm.markAllAsTouched();
      return;
    }

    this.loading = true;
    const dados = this.assetForm.value;
    
    // Se for edição, talvez você precise passar o ID (ajuste conforme o seu service)
    if (this.isEditMode) {
       dados.id = this.assetId; 
    }

    this.equipamentoService.salvar(dados).subscribe({
      next: () => {
        this.loading = false;
        this.router.navigate(['/assets']);
      },
      error: (err) => {
        console.error('Erro ao salvar', err);
        this.loading = false;
      }
    });
  }
}