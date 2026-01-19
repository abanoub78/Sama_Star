import { Component, OnInit } from '@angular/core';
import { RouteService, Route, City } from '../../core/services/route-service';
import { MatTableModule } from '@angular/material/table';
import { MatButtonModule } from '@angular/material/button';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';
import { MatInputModule } from '@angular/material/input';

@Component({
  selector: 'app-routes',
  standalone: true,
  imports: [
    MatTableModule,
    MatButtonModule,
    CommonModule,
    FormsModule,
    MatFormFieldModule,
    MatSelectModule,
    MatInputModule,
  ],
  templateUrl: './routes.html',
  styleUrls: ['./routes.css'],
})
export class Routes implements OnInit {
  routes: Route[] = [];
  cities: City[] = [];
  displayedColumns = ['from_city', 'to_city', 'distance_km', 'actions'];

  newRoute: Partial<Route> = {
    from_city_id: undefined,
    to_city_id: undefined,
    distance_km: undefined,
  };

  // هنا نضيف editingRoute
  editingRoute: Partial<Route> | null = null;

  constructor(private routeService: RouteService) {}

  ngOnInit() {
    this.loadRoutes();
    this.loadCities();
  }

  loadRoutes() {
    this.routeService.getRoutes().subscribe((res) => (this.routes = res));
  }

  loadCities() {
    this.routeService.getCities().subscribe((res) => (this.cities = res));
  }

  addRoute() {
    if (
      this.newRoute.from_city_id === undefined ||
      this.newRoute.to_city_id === undefined ||
      this.newRoute.distance_km === undefined
    ) {
      alert('Please fill all fields');
      return;
    }

    this.routeService.addRoute(this.newRoute).subscribe({
      next: (res) => {
        this.loadRoutes();
        this.newRoute = { from_city_id: undefined, to_city_id: undefined, distance_km: undefined };
      },
      error: (err) => console.log(err),
    });
  }

  startEdit(route: Route) {
    // ننسخ البيانات للـ editingRoute
    this.editingRoute = { ...route };
  }

  cancelEdit() {
    this.editingRoute = null;
  }

  saveEdit() {
    if (!this.editingRoute || !this.editingRoute.id) return;

    this.routeService.updateRoute(this.editingRoute.id, this.editingRoute).subscribe(() => {
      this.loadRoutes();
      this.editingRoute = null;
    });
  }

  deleteRoute(id: number) {
    if (!confirm('Are you sure?')) return;
    this.routeService.deleteRoute(id).subscribe(() => this.loadRoutes());
  }
  getCityName(city_id: number | undefined): string {
    const city = this.cities.find((c) => c.id === city_id);
    return city ? city.name : '';
  }
}
