import { Component, OnInit } from '@angular/core';
import { BookingService } from '../../core/services/booking-service';
import { CommonModule } from '@angular/common';
import { MatTableModule } from '@angular/material/table';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'app-mybookings',
  standalone: true,
  imports: [CommonModule, MatTableModule, MatButtonModule, MatIconModule],
  templateUrl: './mybookings.html',
  styleUrls: ['./mybookings.css'],
})
export class Mybookings implements OnInit {
  bookings: any[] = [];
  displayedColumns = ['route', 'date', 'seat', 'actions'];

  // الحجز الحالي اللي هيظهر في التذكرة
  selectedBooking: any = null;

  constructor(private bookingService: BookingService) {}

  ngOnInit() {
    this.loadBookings();
  }

  loadBookings() {
    this.bookingService.getMyBookings().subscribe((res) => (this.bookings = res));
  }

  cancelBooking(id: number) {
    if (!confirm('هل تريد إلغاء هذا الحجز؟')) return;

    this.bookingService.deleteMyBooking(id).subscribe(() => this.loadBookings());
  }

  showTicket(booking: any) {
    this.selectedBooking = booking;
  }

  closeTicket() {
    this.selectedBooking = null;
  }

  // دالة لتوليد بيانات الـ QR Code (يمكن تخصيصها أكثر)
  getQrData(booking: any): string {
    if (!booking) return '';
    return `Booking ID: ${booking.id}
Route: ${booking.trip?.route?.from_city?.name} → ${booking.trip?.route?.to_city?.name}
Date: ${booking.trip?.trip_date}
Seat: ${booking.seat?.seat_number}
Price: ${booking.trip?.price} جنيه`;
  }

  printTicket() {
    window.print();
  }
}
