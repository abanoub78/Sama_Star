import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({ providedIn: 'root' })
export class ApiService {
  private api = 'http://localhost:8000/api';

  constructor(private http: HttpClient) {}

  get(url: string) {
    return this.http.get(`${this.api}${url}`);
  }

  post(url: string, data: any) {
    return this.http.post(`${this.api}${url}`, data);
  }
}
