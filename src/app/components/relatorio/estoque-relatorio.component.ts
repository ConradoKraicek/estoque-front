import { Component, OnInit } from '@angular/core';
import { Filial } from '../../models/filial.model';
import { Produto } from '../../models/produto.model';
import { EstoqueFilial } from '../../models/estoque-filial.model';
import { FilialService } from '../../services/filial.service';
import { ProdutoService } from '../../services/produto.service';
import { EstoqueService } from '../../services/estoque.service';
import { RelatorioService } from '../../services/relatorio.service';
import { saveAs } from 'file-saver';
import { MatFormFieldModule } from '@angular/material/form-field';
import { CommonModule } from '@angular/common';
import { MatSelectModule } from '@angular/material/select';
import { MatOptionModule } from '@angular/material/core';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatTableModule } from '@angular/material/table';
import { Router } from '@angular/router';

@Component({
  selector: 'app-estoque-relatorio',
  templateUrl: './estoque-relatorio.component.html',
  styleUrls: ['./estoque-relatorio.component.scss'],
  imports: [
    CommonModule,
    MatFormFieldModule,
    MatSelectModule,
    MatOptionModule,
    MatButtonModule,
    MatIconModule,
    MatProgressSpinnerModule,
    MatTableModule,
  ],
})
export class EstoqueRelatorioComponent implements OnInit {
  filiais: Filial[] = [];
  produtos: Produto[] = [];
  estoques: EstoqueFilial[] = [];
  filialSelecionada: number | null = null;
  isLoading = false;

  constructor(
    private filialService: FilialService,
    private produtoService: ProdutoService,
    private estoqueService: EstoqueService,
    private router: Router,
    private relatorioService: RelatorioService
  ) {}

  ngOnInit(): void {
    this.carregarDadosIniciais();
  }

  carregarDadosIniciais(): void {
    this.isLoading = true;

    this.filialService.listarTodos().subscribe({
      next: (filiais) => {
        this.filiais = filiais;
        this.carregarProdutos();
      },
      error: () => (this.isLoading = false),
    });
  }

  carregarProdutos(): void {
    this.produtoService.listarTodos().subscribe({
      next: (produtos) => {
        this.produtos = produtos;
        this.carregarEstoques();
      },
      error: () => (this.isLoading = false),
    });
  }

  carregarEstoques(): void {
    if (this.filialSelecionada) {
      this.estoqueService.buscarPorFilial(this.filialSelecionada).subscribe({
        next: (estoques) => {
          this.estoques = estoques;
          this.isLoading = false;
        },
        error: () => (this.isLoading = false),
      });
    } else {
      this.estoqueService.listarTodos().subscribe({
        next: (estoques) => {
          this.estoques = estoques;
          this.isLoading = false;
        },
        error: () => (this.isLoading = false),
      });
    }
  }

  onFilialChange(): void {
    this.isLoading = true;
    this.carregarEstoques();
  }

  exportarExcel(): void {
    this.relatorioService
      .exportarExcel(this.filialSelecionada || undefined)
      .subscribe((blob) => {
        saveAs(
          blob,
          `relatorio_estoque_${new Date().toISOString().split('T')[0]}.xlsx`
        );
      });
  }

  exportarPdf(): void {
    this.relatorioService
      .exportarPdf(this.filialSelecionada || undefined)
      .subscribe((blob) => {
        saveAs(
          blob,
          `relatorio_estoque_${new Date().toISOString().split('T')[0]}.pdf`
        );
      });
  }

  getStatusEstoque(estoque: EstoqueFilial): string {
    if (estoque.quantidade === 0) return 'ESGOTADO';
    if (estoque.quantidade < (estoque.produto?.estoqueMinimo ?? 0))
      return 'ESTOQUE BAIXO';
    return 'OK';
  }

  getStatusClass(estoque: EstoqueFilial): string {
    if (estoque.quantidade === 0) return 'estoque-esgotado';
    if (estoque.quantidade < (estoque.produto?.estoqueMinimo ?? 0))
      return 'estoque-baixo';
    return 'estoque-ok';
  }

  cancelar(): void {
    this.router.navigate(['/produtos']);
  }
}
