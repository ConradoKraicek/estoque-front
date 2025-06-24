// src/app/services/estoque.service.ts
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';
import { EstoqueFilial } from '../models/estoque-filial.model';

@Injectable({
  providedIn: 'root',
})
export class EstoqueService {
  private apiUrl = `${environment.apiUrl}/estoque-filial`;

  constructor(private http: HttpClient) {}

  // Função auxiliar para obter os cabeçalhos
  private getHeaders(): { [header: string]: string } {
    const token = localStorage.getItem('token');
    return {
      Authorization: `Bearer ${token}`,
      Accept: '*/*',
    };
  }

  listarTodos(): Observable<EstoqueFilial[]> {
    return this.http.get<EstoqueFilial[]>(this.apiUrl, {
      headers: this.getHeaders(),
    });
  }

  buscarPorFilial(filialId: number): Observable<EstoqueFilial[]> {
    return this.http.get<EstoqueFilial[]>(`${this.apiUrl}/filial/${filialId}`, {
      headers: this.getHeaders(),
    });
  }

  buscarPorProduto(produtoId: number): Observable<EstoqueFilial[]> {
    return this.http.get<EstoqueFilial[]>(
      `${this.apiUrl}/produto/${produtoId}`,
      {
        headers: this.getHeaders(),
      }
    );
  }

  atualizarEstoque(estoque: EstoqueFilial): Observable<EstoqueFilial> {
    return this.http.put<EstoqueFilial>(
      `${this.apiUrl}/${estoque.id}`,
      estoque,
      {
        headers: this.getHeaders(),
      }
    );
  }

  transferirEstoque(
    origemId: number,
    destinoId: number,
    produtoId: number,
    quantidade: number
  ): Observable<void> {
    return this.http.post<void>(`${this.apiUrl}/transferir`, {
      origemId,
      destinoId,
      produtoId,
      quantidade,
    });
  }

  registrarEntrada(
    produtoId: number,
    filialId: number,
    quantidade: number
  ): Observable<EstoqueFilial> {
    return this.http.post<EstoqueFilial>(`${this.apiUrl}/entrada`, {
      produtoId,
      filialId,
      quantidade,
    });
  }

  registrarSaida(
    produtoId: number,
    filialId: number,
    quantidade: number
  ): Observable<EstoqueFilial> {
    return this.http.post<EstoqueFilial>(`${this.apiUrl}/saida`, {
      produtoId,
      filialId,
      quantidade,
    });
  }
}
