import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface Driver {
  id: number;
  name: string;
  phone: string;
}

@Injectable({ providedIn: 'root' })
export class DriverService {
  private baseUrl = 'http://localhost:8000/api';

  constructor(private http: HttpClient) {}

  getDrivers(): Observable<Driver[]> {
    return this.http.get<Driver[]>(`${this.baseUrl}/drivers`);
  }

  addDriver(driver: Partial<Driver>): Observable<Driver> {
    return this.http.post<Driver>(`${this.baseUrl}/drivers`, driver);
  }
  updateDriver(id: number, driver: Partial<Driver>): Observable<Driver> {
    return this.http.put<Driver>(`${this.baseUrl}/drivers/${id}`, driver);
  }

  deleteDriver(id: number): Observable<any> {
    return this.http.delete(`${this.baseUrl}/drivers/${id}`);
  }
}
