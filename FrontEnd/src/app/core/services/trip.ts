import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class Trip {
  constructor(private http: HttpClient) {}
  searchTrips(data: any) {
    return this.http.get<any[]>(`${environment.apiUrl}/trips`, {
      params: data,
    });
  }

  getTrip(id: number) {
    return this.http.get(`${environment.apiUrl}/trips/${id}`);
  }
}
