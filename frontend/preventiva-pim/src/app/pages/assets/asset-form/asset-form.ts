import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { EquipamentosService } from '../../../services/equipamento.service';

@Component({
  selector: 'app-asset-form',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, RouterModule],
  templateUrl: './asset-form.html',
})
export class AssetForm implements OnInit {
  assetForm!: FormGroup;
  isEditMode = false;
  assetId?: number;

  constructor(
    private fb: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private equipamentoService: EquipamentosService
  ) {
    this.initForm();
  }

  ngOnInit(): void {
    // Verifica se estamos editando um equipamento existente
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
      ativo: [true]
    });
  }

  carregarDadosEquipamento(id: number) {
    console.log('Buscando dados do equipamento ID:', id);
    // Aqui você chamará seu service futuramente
    // this.assetForm.patchValue(dadosDoBanco);
  }

  onSubmit() {
    if (this.assetForm.valid) {
      const dados = this.assetForm.value;
      
      this.equipamentoService.salvar(dados).subscribe({
        next: (response: any) => {
          console.log('Equipamento salvo com sucesso:', response);
          // Aqui enviaremos para o backend via service
          this.router.navigate(['/assets']);
        },
        error: (err) => {
          console.error('Erro ao salvar no banco', err)
        }
      });
    }
  }
}