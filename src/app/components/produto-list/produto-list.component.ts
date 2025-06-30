import { EstoqueRelatorioComponent } from './../relatorio/estoque-relatorio.component';
import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { MatButtonModule } from '@angular/material/button';
import { MatTableModule } from '@angular/material/table';
import { MatIconModule } from '@angular/material/icon';
import { ProdutoService } from '../../services/produto.service';
import { Produto } from '../../models/produto.model';

@Component({
  selector: 'app-produto-list',
  standalone: true,
  imports: [
    CommonModule,
    RouterLink,
    MatButtonModule,
    MatTableModule,
    MatIconModule,
  ],
  template: `
    <div class="header">
      <h2>Lista de Produtos</h2>
      <div class="actions">
        <button
          mat-raised-button
          color="accent"
          routerLink="/relatorio-estoque"
        >
          <mat-icon>description</mat-icon> Imprimir Relatório
        </button>
        <button
          mat-raised-button
          color="accent"
          (click)="gerarRelatorioProdutos()"
        >
          <mat-icon>picture_as_pdf</mat-icon> Relatório PDF
        </button>
        <button mat-raised-button color="accent" routerLink="/produtos/novo">
          <mat-icon>add</mat-icon> Novo Produto
        </button>
      </div>
    </div>

    <table mat-table [dataSource]="produtos" class="mat-elevation-z8">
      <!-- Coluna ID -->
      <ng-container matColumnDef="id">
        <th mat-header-cell *matHeaderCellDef>ID</th>
        <td mat-cell *matCellDef="let produto">{{ produto.id }}</td>
      </ng-container>

      <!-- Coluna Nome -->
      <ng-container matColumnDef="nome">
        <th mat-header-cell *matHeaderCellDef>Nome</th>
        <td mat-cell *matCellDef="let produto">{{ produto.nome }}</td>
      </ng-container>

      <!-- Coluna Descrição -->
      <ng-container matColumnDef="descricao">
        <th mat-header-cell *matHeaderCellDef>Descrição</th>
        <td mat-cell *matCellDef="let produto">{{ produto.descricao }}</td>
      </ng-container>

      <!-- Coluna Codigo de Barras -->
      <ng-container matColumnDef="codigoBarras">
        <th mat-header-cell *matHeaderCellDef>Código de Barras</th>
        <td mat-cell *matCellDef="let produto">{{ produto.codigoBarras }}</td>
      </ng-container>

      <!-- Coluna Preço -->
      <ng-container matColumnDef="preco">
        <th mat-header-cell *matHeaderCellDef>Preço</th>
        <td mat-cell *matCellDef="let produto">
          {{ produto.preco | currency : 'BRL' }}
        </td>
      </ng-container>

      <!-- Coluna Ações -->
      <ng-container matColumnDef="acoes">
        <th mat-header-cell *matHeaderCellDef>Ações</th>
        <td mat-cell *matCellDef="let produto">
          <button
            mat-icon-button
            color="primary"
            [routerLink]="['/produtos/editar', produto.id]"
          >
            <mat-icon>edit</mat-icon>
          </button>
          <button mat-icon-button color="warn" (click)="excluir(produto.id)">
            <mat-icon>delete</mat-icon>
          </button>
        </td>
      </ng-container>

      <tr mat-header-row *matHeaderRowDef="displayedColumns"></tr>
      <tr mat-row *matRowDef="let row; columns: displayedColumns"></tr>
    </table>
  `,
  styles: [
    `
      .header {
        display: flex;
        justify-content: space-between;
        align-items: center;
        margin-bottom: 20px;
      }
      table {
        width: 100%;
      }
    `,
  ],
})
export class ProdutoListComponent {
  displayedColumns: string[] = [
    'id',
    'nome',
    'descricao',
    'codigoBarras',
    'preco',
    'acoes',
  ];
  produtos: Produto[] = [];

  constructor(private produtoService: ProdutoService) {}

  ngOnInit() {
    this.carregarProdutos();
  }

  carregarProdutos() {
    this.produtoService.listarTodos().subscribe((produtos) => {
      this.produtos = produtos;
    });
  }

  excluir(id: number) {
    if (confirm('Tem certeza que deseja excluir este produto?')) {
      this.produtoService.excluir(id).subscribe(() => {
        this.carregarProdutos();
      });
    }
  }

  gerarRelatorioProdutos() {
    this.produtoService.gerarRelatorioPdf().subscribe({
      next: (blob) => {
        // Criar URL para o blob
        const url = window.URL.createObjectURL(blob);

        // Criar um link temporário para download
        const link = document.createElement('a');
        link.href = url;
        link.download = 'relatorio_produtos.pdf';

        // Simular clique no link para iniciar o download
        document.body.appendChild(link);
        link.click();

        // Limpar o link e URL
        document.body.removeChild(link);
        window.URL.revokeObjectURL(url);
      },
      error: (error) => {
        console.error('Erro ao gerar relatório:', error);
        alert('Erro ao gerar relatório de produtos. Tente novamente.');
      },
    });
  }
}
