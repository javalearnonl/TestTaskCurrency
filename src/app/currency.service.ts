import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CurrencyService {
  private apiUrl = 'https://v6.exchangerate-api.com/v6';
  private apiKey = '26fa0dd8d514e81d3a38314e';

  constructor(private http: HttpClient) {}

  getExchangeRate(baseCurrency: string): Observable<any> {
    const url = `${this.apiUrl}/${this.apiKey}/latest/${baseCurrency}`;
    return this.http.get(url);
  }
}
