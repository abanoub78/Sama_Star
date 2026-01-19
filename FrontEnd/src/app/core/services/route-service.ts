import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface City {
  id: number;
  name: string;
}

export interface Route {
  id: number;
  from_city_id?: number;
  to_city_id?: number;
  distance_km?: number;
  fromCity?: City;
  toCity?: City;
}

@Injectable({ providedIn: 'root' })
export class RouteService {
  private baseUrl = 'http://localhost:8000/api';

  constructor(private http: HttpClient) {}

  getRoutes(): Observable<Route[]> {
    return this.http.get<Route[]>(`${this.baseUrl}/routes`);
  }

  getCities(): Observable<City[]> {
    return this.http.get<City[]>(`${this.baseUrl}/cities`);
  }

  addRoute(route: Partial<Route>): Observable<Route> {
    return this.http.post<Route>(`${this.baseUrl}/routes`, route);
  }

  updateRoute(id: number, route: Partial<Route>): Observable<Route> {
    return this.http.put<Route>(`${this.baseUrl}/routes/${id}`, route);
  }

  deleteRoute(id: number): Observable<any> {
    return this.http.delete(`${this.baseUrl}/routes/${id}`);
  }
}
