import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../environments/environment';

@Injectable({ providedIn: 'root' })
export class SeatService {
  constructor(private http: HttpClient) {}

  getAvailableSeats(tripId: number) {
    return this.http.get<any[]>(`${environment.apiUrl}/trips/${tripId}/seats`);
  }
}
