import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { catchError, Observable, throwError } from 'rxjs';
import { environment } from '../../environments/environment';
import { Produto } from '../models/produto.model';

@Injectable({
  providedIn: 'root',
})
export class ProdutoService {
  private apiUrl = `${environment.apiUrl}/produtos`;

  constructor(private http: HttpClient) {}

  // Função auxiliar para obter os cabeçalhos
  private getHeaders(): { [header: string]: string } {
    const token = localStorage.getItem('token');
    return {
      Authorization: `Bearer ${token}`,
      Accept: '*/*',
    };
  }

  listarTodos(): Observable<Produto[]> {
    return this.http
      .get<Produto[]>(this.apiUrl, { headers: this.getHeaders() })
      .pipe(
        catchError((error) => {
          console.error('Erro ao listar produtos:', error);
          return throwError(
            () => new Error(`Erro ao listar produtos: ${error.message}`)
          );
        })
      );
  }

  buscarPorId(id: number): Observable<Produto> {
    return this.http.get<Produto>(`${this.apiUrl}/${id}`, {
      headers: this.getHeaders(),
    });
  }

  criar(produto: Produto): Observable<Produto> {
    return this.http.post<Produto>(this.apiUrl, produto, {
      headers: this.getHeaders(),
    });
  }

  atualizar(produto: Produto): Observable<Produto> {
    return this.http.put<Produto>(`${this.apiUrl}/${produto.id}`, produto, {
      headers: this.getHeaders(),
    });
  }

  excluir(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`, {
      headers: this.getHeaders(),
    });
  }

  salvar(produto: Produto): Observable<Produto> {
    return produto.id ? this.atualizar(produto) : this.criar(produto);
  }
}
