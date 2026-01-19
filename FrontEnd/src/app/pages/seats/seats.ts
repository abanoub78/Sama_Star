import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { seatService } from '../../core/services/seat-service';
import { CommonModule } from '@angular/common';

interface Seat {
  id: number;
  seat_number: number;
  status: 'empty' | 'selected' | 'pending' | 'paid' | 'disabled';
}

@Component({
  selector: 'app-seats',
  imports: [CommonModule],
  templateUrl: './seats.html',
  styleUrls: ['./seats.css'],
})
export class Seats implements OnInit {
  tripId!: number;
  seats: Seat[] = [];
  selectedSeats: number[] = [];
  loading = true;
  seatRows: { left: Seat[]; right: Seat[] }[] = [];

  constructor(private route: ActivatedRoute, private seatService: seatService) {}

  ngOnInit() {
    this.route.params.subscribe((params) => {
      this.tripId = +params['id'];
      this.loadSeats();
    });
  }

  loadSeats() {
    this.loading = true;

    // ✅ مهم جدًا
    this.seats = [];
    this.seatRows = [];
    this.selectedSeats = [];

    this.seatService.getSeats(this.tripId).subscribe((res: any) => {
      const seatsArray = Object.values(res);
      this.seats = seatsArray.map((s: any) => ({
        id: s.id,
        seat_number: Number(s.seat_number),
        status: s.status ?? 'empty', // now can be 'paid', 'pending', 'empty'
      }));

      for (let i = 0; i < this.seats.length; i += 4) {
        this.seatRows.push({
          left: this.seats.slice(i, i + 2),
          right: this.seats.slice(i + 2, i + 4),
        });
      }

      this.loading = false;
    });
  }

  toggleSeat(seat: Seat) {
    // ممنوع الضغط على المقاعد المدفوعة فقط
    if (seat.status === 'paid') {
      return;
    }

    // لو empty → اختارها
    if (seat.status === 'empty') {
      seat.status = 'selected';
      this.selectedSeats.push(seat.id);
    }
    // لو selected → إلغاء الاختيار
    else if (seat.status === 'selected') {
      seat.status = 'empty';
      this.selectedSeats = this.selectedSeats.filter((id) => id !== seat.id);
    }
  }

  // reserveSelectedSeats() {
  //   if (this.selectedSeats.length === 0) return alert('اختر مقاعد أولاً');

  //   this.seatService.bookSeats(this.tripId, this.selectedSeats).subscribe({
  //     next: () => {
  //       alert('تم حجز المقاعد بنجاح');
  //       this.loadSeats();
  //       this.selectedSeats = [];
  //     },
  //     error: (err) => {
  //       console.error(err);
  //       alert('حدث خطأ أثناء الحجز');
  //     },
  //   });
  // }

  reserveSelectedSeats() {
    if (this.selectedSeats.length === 0) {
      alert('اختر مقاعد أولاً');
      return;
    }

    this.seatService.bookSeats(this.tripId, this.selectedSeats).subscribe({
      next: (res: any) => {
        const bookingId = res.booking_ids[0]; // أول حجز
        // 👉 روح على صفحة الدفع
        window.location.href = `/payment/${bookingId}`;
      },
      error: () => alert('حدث خطأ أثناء الحجز'),
    });
  }

  cancelSelection() {
    this.selectedSeats.forEach((id) => {
      const seat = this.seats.find((s) => s.id === id);
      if (seat) seat.status = 'empty';
    });
    this.selectedSeats = [];
  }
}
