import { Component, input } from '@angular/core';
@Component({
selector: 'app-loading',
template: `
<div class="flex flex-col items-center justify-center py-12
text-gray-400">
<!-- O spinner: um círculo que gira com CSS -->
<div
class="w-10 h-10 border-4 border-gray-200 border-t-purple-700
rounded-full animate-spin mb-4"

></div>
<!-- Mensagem customizável via @Input -->
<p class="text-sm">{{ mensagem() }}</p>
</div>
`
})
export class LoadingComponent {
// Entrada opcional com valor padrão

mensagem = input('Carregando...');
}