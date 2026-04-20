import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router'; // Importante para o conteúdo mudar
import { SidebarComponent } from '../sidebar/sidebar'; // Ajuste o caminho se necessário
import { CommonModule } from '@angular/common';
import { HeaderComponent } from '../header/header'; // Importe o HeaderComponent

@Component({
  selector: 'app-layout',
  standalone: true, // Garanta que está como standalone
  imports: [RouterOutlet, SidebarComponent, CommonModule, HeaderComponent],
  templateUrl: './layout.html',
  styleUrl: './layout.css',
})
export class Layout {}