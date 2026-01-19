import { Component, OnInit } from '@angular/core';
import { BookingService, Booking } from '../../core/services/booking-service';
import { MatTableModule } from '@angular/material/table';
import { MatButtonModule } from '@angular/material/button';
import { CommonModule } from '@angular/common';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'app-bookings',
  imports: [MatTableModule, MatButtonModule, CommonModule, MatIconModule],
  templateUrl: './bookings.html',
  styleUrl: './bookings.css',
})
export class Bookings {
  bookings: Booking[] = [];
  displayedColumns = ['user', 'trip', 'seat', 'actions'];

  constructor(private bookingService: BookingService) {}

  ngOnInit() {
    this.loadBookings();
  }

  loadBookings() {
    this.bookingService.getallBookings().subscribe((res) => (this.bookings = res));
  }

  deleteBooking(id: number) {
    if (!confirm('Are you sure?')) return;
    this.bookingService.deleteBooking(id).subscribe(() => this.loadBookings());
  }
}
