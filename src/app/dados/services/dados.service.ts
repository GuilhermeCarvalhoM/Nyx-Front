import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class DadosService {
  constructor(private http: HttpClient) {}

  public despesasTotaisPorMes() {
    return this.http.get('http://localhost:8080/api/despesasTotaisPorMes');
  }

  public despesasTotaisPorCategorias() {
    return this.http.get(
      'http://localhost:8080/api/despesasTotaisPorCategorias'
    );


  }

  public agrupamentoPorFonte() {
    return this.http.get('http://localhost:8080/api/agrupamentoPorFonte');
  }
}
