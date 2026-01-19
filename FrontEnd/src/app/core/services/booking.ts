import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../environments/environment';
@Injectable({ providedIn: 'root' })
export class BookingService {
  constructor(private http: HttpClient) {}

  book(data: any) {
    return this.http.post(`${environment.apiUrl}/bookings`, data);
  }

  myBookings() {
    return this.http.get(`${environment.apiUrl}/my-bookings`);
  }
}
