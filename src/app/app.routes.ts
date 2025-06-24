import { Routes } from '@angular/router';
import { ProdutoListComponent } from './components/produto-list/produto-list.component';
import { ProdutoFormComponent } from './components/produto-form/produto-form.component';
import { LoginComponent } from './components/login/login.component';
import { EstoqueRelatorioComponent } from './components/relatorio/estoque-relatorio.component';
import { AuthGuard } from './services/auth.guard';

export const routes: Routes = [
  {
    path: 'produtos',
    component: ProdutoListComponent,
    canActivate: [AuthGuard],
  },
  {
    path: 'produtos/novo',
    component: ProdutoFormComponent,
    canActivate: [AuthGuard],
  },
  {
    path: 'produtos/editar/:id',
    component: ProdutoFormComponent,
    canActivate: [AuthGuard],
  },
  {
    path: 'relatorio-estoque',
    component: EstoqueRelatorioComponent,
    canActivate: [AuthGuard],
  },
  { path: 'login', component: LoginComponent },
  { path: '', redirectTo: '/login', pathMatch: 'full' },
  { path: '**', redirectTo: '/login' },
];
