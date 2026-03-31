import { Component } from "@angular/core";
import { RouterOutlet } from "@angular/router";

@Component({
    selector: 'app-auth-layout',
    imports: [RouterOutlet],
    template: `
        <div class="min-h-screen bg-gray-100 flex items-center
justify-center">
                <div class="w-full max-w-md">
                    <div class="text-center mb-8">
                        <h1 class="text-3xl font-bold text-purple-700">TaskFlow</h1>
                        <p class="text-gray-500 mt-1">Organize suas tarefas</p>
                    </div>
                    <router-outlet />
                    </div>
                </div>
`
})
export class AuthLayoutComponent { }