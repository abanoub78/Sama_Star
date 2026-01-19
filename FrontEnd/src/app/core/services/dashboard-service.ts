import { Injectable } from '@angular/core';
import { BusService } from '../../core/services/bus-service';
import { TripService } from '../../core/services/trip-service';
import { DriverService } from '../../core/services/driver-service';
import { BookingService } from '../../core/services/booking-service';
import { forkJoin, Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable({ providedIn: 'root' })
export class DashboardService {
  constructor(
    private busService: BusService,
    private tripService: TripService,
    private driverService: DriverService,
    private bookingService: BookingService
  ) {}

  getStats(): Observable<{ buses: number; trips: number; drivers: number; bookings: number }> {
    return forkJoin({
      buses: this.busService.getBuses(),
      trips: this.tripService.getTrips(),
      drivers: this.driverService.getDrivers(),
      bookings: this.bookingService.getallBookings(),
    }).pipe(
      // تحويل المصفوفات لعدد
      map((res) => ({
        buses: res.buses.length,
        trips: res.trips.length,
        drivers: res.drivers.length,
        bookings: res.bookings.length,
      }))
    );
  }
}
