import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface Booking {
  id: number;
  user: {
    id: number;
    name: string;
  };
  seat: {
    id: number;
    seat_number: string;
  };
  trip: {
    trip_date: string;
    route: {
      from_city: { name: string };
      to_city: { name: string };
    };
  };
}

@Injectable({ providedIn: 'root' })
export class BookingService {
  private baseUrl = 'http://localhost:8000/api';

  constructor(private http: HttpClient) {}

  getMyBookings() {
    return this.http.get<any[]>(`${this.baseUrl}/my-bookings`);
  }

  deleteMyBooking(id: number) {
    return this.http.delete(`${this.baseUrl}/my-bookings/${id}`);
  }

  getallBookings(): Observable<Booking[]> {
    return this.http.get<Booking[]>(`${this.baseUrl}/bookings`);
  }

  deleteBooking(id: number): Observable<any> {
    return this.http.delete(`${this.baseUrl}/bookings/${id}`);
  }
  getBooking(id: number): Observable<any> {
    return this.http.get(`${this.baseUrl}/bookings/${id}`);
  }
}
