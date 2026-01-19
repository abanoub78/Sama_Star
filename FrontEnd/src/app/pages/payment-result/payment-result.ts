import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-payment-result',
  imports: [CommonModule],
  templateUrl: './payment-result.html',
  styleUrl: './payment-result.css',
})
export class PaymentResult {
  success: boolean | null = null;

  constructor(private router: Router) {}

  ngOnInit() {
    const params = new URLSearchParams(window.location.search);
    const successParam = params.get('success');
    this.success = successParam === 'true' ? true : false;

    if (this.success) {
      setTimeout(() => {
        this.router.navigate(['mybookings']);
      }, 5000);
    }
  }
}
