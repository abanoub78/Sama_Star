import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute } from '@angular/router';
import { BookingService } from '../../core/services/booking-service';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'app-ticket',
  imports: [CommonModule, MatIconModule],
  templateUrl: './ticket.html',
  styleUrl: './ticket.css',
})
export class Ticket {
  ticket: any;
  selectedBooking: any = null;

  constructor(private bookingService: BookingService, private route: ActivatedRoute) {}

  ngOnInit() {
    const bookingId = Number(this.route.snapshot.paramMap.get('id'));
    this.loadTicket(bookingId);
  }

  loadTicket(id: number) {
    this.bookingService.getBooking(id).subscribe((res) => {
      this.ticket = res;
    });
  }
  showTicket(booking: any) {
    this.selectedBooking = booking;
  }

  closeTicket() {
    this.selectedBooking = null;
  }
}
