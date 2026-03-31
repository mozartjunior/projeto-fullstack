import { Component, inject, signal } from "@angular/core";
import { ReactiveFormsModule, FormBuilder, Validators } from "@angular/forms";
import { AuthService } from "./core/services/auth.service";
import { sign } from "crypto";

@Component({
    selector: 'app-login',
    imports: [ReactiveFormsModule],
    templateUrl: './login.html',
})
export class LoginComponent {
    private fb = inject(FormBuilder);
    private auth = inject(AuthService);

    enviando = signal(false);
    erroLogin = signal<string | null>(null);

    form = this.fb.group({
        email: ['', [Validators.required, Validators.email]],
        password: ['', [Validators.required, Validators.minLength(6)]],
    });

    get email() { return this.form.get('email'); }
    get password() { return this.form.get('password'); }

    async enviar() {
        if (this.form.invalid) return;

        this.enviando.set(true);
        this.erroLogin.set(null);

        try {
            await this.auth.login({
              email: this.email?.value,
              password: this.password?.value
            });
        }