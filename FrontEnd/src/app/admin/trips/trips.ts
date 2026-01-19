import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MatTableModule } from '@angular/material/table';
import { MatButtonModule } from '@angular/material/button';
import { TripService } from '../../core/services/trip-service';

@Component({
  selector: 'app-trips',
  standalone: true,
  imports: [CommonModule, FormsModule, MatTableModule, MatButtonModule],
  templateUrl: './trips.html',
  styleUrls: ['./trips.css'],
})
export class Trips implements OnInit {
  trips: any[] = [];
  routes: any[] = [];
  buses: any[] = [];
  drivers: any[] = [];

  displayedColumns = ['route', 'bus', 'driver', 'trip_date', 'price', 'actions'];

  newTrip: any = {
    route_id: null,
    bus_id: null,
    driver_id: null,
    trip_date: '',
    departure_time: '',
    arrival_time: '',
    price: null,
  };

  editingTrip: any = null;

  constructor(private tripService: TripService) {}

  ngOnInit(): void {
    this.loadData();
  }

  loadData() {
    this.tripService.getTrips().subscribe((res) => (this.trips = res));
    this.tripService.getRoutes().subscribe((res) => (this.routes = res));
    this.tripService.getBuses().subscribe((res) => (this.buses = res));
    this.tripService.getDrivers().subscribe((res) => (this.drivers = res));
  }

  addTrip() {
    if (
      !this.newTrip.route_id ||
      !this.newTrip.bus_id ||
      !this.newTrip.driver_id ||
      !this.newTrip.trip_date
    )
      return;

    this.tripService.addTrip(this.newTrip).subscribe(() => {
      this.resetForm();
      this.loadData();
    });
  }

  deleteTrip(id: number) {
    if (!confirm('هل أنت متأكد من حذف الرحلة؟')) return;
    this.tripService.deleteTrip(id).subscribe(() => this.loadData());
  }

  startEdit(trip: any) {
    this.editingTrip = {
      id: trip.id,
      route_id: trip.route.id,
      bus_id: trip.bus.id,
      driver_id: trip.driver.id,
      trip_date: trip.trip_date,
      departure_time: trip.departure_time,
      arrival_time: trip.arrival_time,
      price: trip.price,
    };
  }

  cancelEdit() {
    this.editingTrip = null;
  }

  saveEdit() {
    if (!this.editingTrip) return;

    this.tripService.updateTrip(this.editingTrip.id, this.editingTrip).subscribe(() => {
      this.editingTrip = null;
      this.loadData();
    });
  }

  resetForm() {
    this.newTrip = {
      route_id: null,
      bus_id: null,
      driver_id: null,
      trip_date: '',
      departure_time: '',
      arrival_time: '',
      price: null,
    };
  }
}
