import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { FaIconLibrary } from '@fortawesome/angular-fontawesome';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { faLock } from '@fortawesome/free-solid-svg-icons';

@Component({
  standalone: true,
  selector: 'app-access-denied',
  imports: [CommonModule, RouterModule, FontAwesomeModule],
  template: `
    <main class="flex items-center justify-center h-screen bg-gray-100 animate-fade-in">
      <div class="bg-white p-10 rounded-2xl shadow-2xl max-w-md w-full text-center">
        <div class="text-red-400 mb-4 text-6xl flex justify-center">
          <fa-icon [icon]="['fas', 'lock']"></fa-icon>
        </div>
        <h1 class="text-3xl font-bold text-gray-800 mb-3">Acceso denegado</h1>
        <p class="text-gray-600 mb-6">No tienes permisos para ver esta página.</p>
        <a
          routerLink="/"
          class="px-6 py-3 rounded-lg bg-red-400 text-white font-semibold hover:bg-red-500 transition-colors"
        >
          Volver al inicio
        </a>
      </div>
    </main>
  `,
})
export class AccessDeniedComponent {
  constructor(iconLibrary: FaIconLibrary) {
    iconLibrary.addIcons(faLock);
  }
}
