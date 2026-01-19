import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface Bus {
  id: number;
  bus_number: string;
  bus_type: string;
  total_seats: number;
}

@Injectable({ providedIn: 'root' })
export class BusService {
  private baseUrl = 'http://localhost:8000/api'; // غيّر حسب backend

  constructor(private http: HttpClient) {}

  getBuses(): Observable<Bus[]> {
    return this.http.get<Bus[]>(`${this.baseUrl}/buses`);
  }

  addBus(bus: Partial<Bus>): Observable<Bus> {
    return this.http.post<Bus>(`${this.baseUrl}/buses`, bus);
  }

  deleteBus(id: number): Observable<any> {
    return this.http.delete(`${this.baseUrl}/buses/${id}`);
  }

  updateBus(id: number, bus: Partial<Bus>): Observable<Bus> {
    return this.http.put<Bus>(`${this.baseUrl}/buses/${id}`, bus);
  }
}
