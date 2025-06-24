// src/app/services/filial.service.ts
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';
import { Filial } from '../models/filial.model';

@Injectable({
  providedIn: 'root',
})
export class FilialService {
  private apiUrl = `${environment.apiUrl}/filiais`;

  constructor(private http: HttpClient) {}

  // Função auxiliar para obter os cabeçalhos
  private getHeaders(): { [header: string]: string } {
    const token = localStorage.getItem('token');
    return {
      Authorization: `Bearer ${token}`,
      Accept: '*/*',
    };
  }

  listarTodos(): Observable<Filial[]> {
    return this.http.get<Filial[]>(this.apiUrl, {
      headers: this.getHeaders(),
    });
  }

  buscarPorId(id: number): Observable<Filial> {
    return this.http.get<Filial>(`${this.apiUrl}/${id}`, {
      headers: this.getHeaders(),
    });
  }

  criar(filial: Filial): Observable<Filial> {
    return this.http.post<Filial>(this.apiUrl, filial, {
      headers: this.getHeaders(),
    });
  }

  atualizar(filial: Filial): Observable<Filial> {
    return this.http.put<Filial>(`${this.apiUrl}/${filial.id}`, filial, {
      headers: this.getHeaders(),
    });
  }

  excluir(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`, {
      headers: this.getHeaders(),
    });
  }
}
