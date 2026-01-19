import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment';

export interface Trip {
  id: number;
  route: {
    id: number;
    fromCity: { id: number; name: string };
    toCity: { id: number; name: string };
  };
  bus: { id: number; bus_number: string; bus_type: string };
  driver: { id: number; name: string };
  trip_date: string;
  departure_time: string;
  arrival_time: string;
  price: number;
}

@Injectable({ providedIn: 'root' })
export class TripService {
  private baseUrl = environment.apiUrl;

  constructor(private http: HttpClient) {}

  getTrips(): Observable<Trip[]> {
    return this.http.get<Trip[]>(`${this.baseUrl}/trips`);
  }

  getRoutes(): Observable<any[]> {
    return this.http.get<any[]>(`${this.baseUrl}/routes`);
  }

  getBuses(): Observable<any[]> {
    return this.http.get<any[]>(`${this.baseUrl}/buses`);
  }

  getDrivers(): Observable<any[]> {
    return this.http.get<any[]>(`${this.baseUrl}/drivers`);
  }

  addTrip(trip: any): Observable<Trip> {
    return this.http.post<Trip>(`${this.baseUrl}/trips`, trip);
  }

  deleteTrip(id: number): Observable<any> {
    return this.http.delete(`${this.baseUrl}/trips/${id}`);
  }
  updateTrip(id: number, trip: any): Observable<Trip> {
    return this.http.put<Trip>(`${this.baseUrl}/trips/${id}`, trip);
  }
}
