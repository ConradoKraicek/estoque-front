import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class RelatorioService {
  private apiUrl = `${environment.apiUrl}/relatorios`;

  constructor(private http: HttpClient) {}

  // Função auxiliar para obter os cabeçalhos
  private getHeaders(): { [header: string]: string } {
    const token = localStorage.getItem('token');
    return {
      Authorization: `Bearer ${token}`,
      Accept: '*/*',
    };
  }

  gerarRelatorioEstoque(filialId?: number): Observable<any> {
    const params: any = {};
    if (filialId) params.filialId = filialId;

    return this.http.get(`${this.apiUrl}/estoque`, {
      params,
      responseType: 'blob',
    });
  }

  exportarExcel(filialId?: number): Observable<any> {
    const params: any = { tipo: 'excel' };
    if (filialId) params.filialId = filialId;

    return this.http.get(`${this.apiUrl}/estoque/exportar`, {
      params,
      responseType: 'blob',
      headers: this.getHeaders(),
    });
  }

  exportarPdf(filialId?: number): Observable<any> {
    const params: any = { tipo: 'pdf' };
    if (filialId) params.filialId = filialId;

    return this.http.get(`${this.apiUrl}/estoque/exportar`, {
      params,
      responseType: 'blob',
      headers: this.getHeaders(),
    });
  }
}
