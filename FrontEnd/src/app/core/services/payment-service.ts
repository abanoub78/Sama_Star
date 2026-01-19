import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class PaymentService {
  apiUrl = 'http://127.0.0.1:8000/api';

  constructor(private http: HttpClient) {}

  pay(bookingId: number, method: string) {
    return this.http.post(`${this.apiUrl}/pay/${bookingId}`, { method });
  }
}
