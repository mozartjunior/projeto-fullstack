import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './login.html', // Verifique se o nome é exatamente login.html
  styleUrl: './login.css'       // Verifique se o nome é exatamente login.css
})
export class LoginComponent { // Verifique se está 'LoginComponent' aqui
  // 1. Declarando as variáveis que o HTML está pedindo:
  loading = false;
  error = '';
  loginForm: FormGroup;
  showPassword = false;
  isPasswordFocused = false;

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private router: Router
  ) {
    // 2. Inicializando o formulário:
    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]]
    });
  }

  // 3. Criando a função que o botão do HTML chama:
  onSubmit() {
    if (this.loginForm.valid) {
      // this.loading = true; // Variável para mostrar o spinner
      // this.error='';
      
      this.authService.login(this.loginForm.value).subscribe({
        next: () => {
          this.router.navigate(['/dashboard']);
        },
        error: (err) => {
          this.error = 'Credenciais inválidas. Por favor, tente novamente.';
          this.loading = false;
          console.error('Erro de login:', err);
        }
      });

    }
  }
}