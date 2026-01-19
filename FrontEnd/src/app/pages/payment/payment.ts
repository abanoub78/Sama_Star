import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { PaymentService } from '../../core/services/payment-service';

@Component({
  selector: 'app-payment',
  imports: [],
  templateUrl: './payment.html',
  styleUrl: './payment.css',
})
export class Payment {
  bookingId!: number;

  constructor(private route: ActivatedRoute, private paymentService: PaymentService) {}

  ngOnInit() {
    this.bookingId = +this.route.snapshot.paramMap.get('bookingId')!;
  }

  pay(method: 'visa' | 'wallet') {
    this.paymentService.pay(this.bookingId, method).subscribe((res: any) => {
      window.location.href = res.iframe_url;
    });
  }
}
