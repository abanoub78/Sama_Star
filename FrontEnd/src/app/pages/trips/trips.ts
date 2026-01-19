import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { CommonModule } from '@angular/common';
import { TripService } from '../../core/services/trip-service';
import { Trip } from '../../core/services/trip';

@Component({
  selector: 'app-trips',
  imports: [CommonModule],
  templateUrl: './trips.html',
  styleUrl: './trips.css',
})
export class Trips {
  trips: any[] = [];
  loading = true;

  constructor(private route: ActivatedRoute, private tripService: Trip, private router: Router) {}

  ngOnInit() {
    this.route.queryParams.subscribe((params) => {
      const { from, to, date } = params;

      this.tripService.searchTrips({ from, to, date }).subscribe((res: any) => {
        this.trips = res;
        this.loading = false;
      });
    });
  }
  goToSeats(trip: any) {
    // هنا تضع الـ trip.id في الرابط
    this.router.navigate(['/trips', trip.id, 'seats']);
  }
}
