import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class seatService {
  apiUrl = 'http://127.0.0.1:8000/api';

  constructor(private http: HttpClient) {}

  getSeats(tripId: number): Observable<any> {
    return this.http.get(`${this.apiUrl}/trips/${tripId}/seats`);
  }

  bookSeats(tripId: number, seatIds: number[]): Observable<any> {
    return this.http.post(`${this.apiUrl}/bookings`, {
      trip_id: tripId,
      seat_ids: seatIds,
    });
  }
}
