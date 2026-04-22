import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router'; // 1. Importe o RouterModule
import { EquipamentosService } from '../../services/equipamento.service';
import { Equipamento } from '../../models/equipamento.model';

@Component({
  selector: 'app-assets',
  standalone: true,
  imports: [CommonModule, RouterModule], // 2. Adicione aqui nos imports
  templateUrl: './assets.html',
})
export class Assets implements OnInit {
  equipamentos: Equipamento[] = [];
  loading: boolean = false;

  constructor(
    private equipamentosService: EquipamentosService,
    private cd: ChangeDetectorRef
  ) {}

  ngOnInit(): void {
    this.carregarEquipamentos();
  }

  carregarEquipamentos(): void {
    this.loading = true;
    this.equipamentosService.listarTodos().subscribe({
      next: (data) => {
        this.equipamentos = data;
        this.loading = false;
        this.cd.detectChanges();
      },
      error: (err) => {
        console.error('Erro ao carregar equipamentos:', err);
        this.loading = false;
      }
    });
}}