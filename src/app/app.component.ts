import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, RouterOutlet],
  template: `
    <header>
      <h1>Controle de Estoque</h1>
      <nav>
        <a routerLink="/produtos">Produtos</a>
        <a routerLink="/login">Login</a>
      </nav>
    </header>
    <main>
      <router-outlet></router-outlet>
    </main>
  `,
  styles: [
    `
      /* Estilos básicos */
    `,
  ],
})
export class AppComponent {}
