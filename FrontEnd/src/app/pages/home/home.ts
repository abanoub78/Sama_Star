import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { Buspros } from '../buspros/buspros';
import { About } from '../about/about';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule, FormsModule, Buspros, About],
  templateUrl: './home.html',
  styleUrls: ['./home.css'],
})
export class Home {
  constructor(private router: Router) {}

  passengers = 1;
  cities: any[] = [
    { id: 1, name: 'القاهرة' },
    { id: 2, name: 'الإسكندرية' },
    { id: 3, name: 'المنصورة' },
    { id: 4, name: 'طنطا' },
    { id: 5, name: 'أسيوط' },
    { id: 6, name: 'سوهاج' },
  ];

  fromCity: any | null = null;
  toCity: any | null = null;

  departureDate: string | null = null;
  returnDate: string | null = null;

  isRoundTrip = false;

  today = new Date().toISOString().split('T')[0];

  showPopup = false;
  popupMessage = '';
  popupType: 'success' | 'error' = 'success';

  onRoundTripChange() {
    if (!this.isRoundTrip) this.returnDate = null;
  }

  get filteredToCities(): any[] {
    return this.cities.filter((city) => city !== this.fromCity);
  }

  searchTrips() {
    if (!this.fromCity || !this.toCity || !this.departureDate) {
      this.showMessage('من فضلك اكمل بيانات البحث', 'error');
      return;
    }

    this.router.navigate(['/trips'], {
      queryParams: {
        from: this.fromCity.id,
        to: this.toCity.id,
        date: this.departureDate,
      },
    });
  }

  showMessage(message: string, type: 'success' | 'error') {
    this.popupMessage = message;
    this.popupType = type;
    this.showPopup = true;

    setTimeout(() => (this.showPopup = false), 3000);
  }
}
