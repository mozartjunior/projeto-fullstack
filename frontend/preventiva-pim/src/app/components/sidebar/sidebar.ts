import { Component, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Router } from '@angular/router';

@Component({
  selector: 'app-sidebar',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './sidebar.html',
  styleUrl: './sidebar.css'
})
export class SidebarComponent implements OnInit {
  isCollapsed = false;
  private router = inject(Router);

  usuarioLogado: any = {
    nome: 'João Silva',
    perfil: 'Admin'
  };

  ngOnInit() {
    const dadosSalvos = localStorage.getItem('usuario');
    if (dadosSalvos) {
      this.usuarioLogado = JSON.parse(dadosSalvos);
    }
  }

  toggleSidebar() {
    this.isCollapsed = !this.isCollapsed;
  }

  logout() {
    localStorage.removeItem('access_token');
    localStorage.removeItem('usuario');
    this.router.navigate(['/login']);
  }
}