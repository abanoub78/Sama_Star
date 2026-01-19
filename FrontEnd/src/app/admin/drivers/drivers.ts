import { Component, OnInit } from '@angular/core';
import { DriverService, Driver } from '../../core/services/driver-service';
import { MatTableModule } from '@angular/material/table';
import { MatButtonModule } from '@angular/material/button';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
@Component({
  selector: 'app-drivers',
  imports: [MatTableModule, MatButtonModule, CommonModule, FormsModule],
  templateUrl: './drivers.html',
  styleUrl: './drivers.css',
})
export class Drivers {
  drivers: Driver[] = [];
  displayedColumns = ['name', 'phone', 'actions'];
  newDriver: Partial<Driver> = {};
  editingDriver: Partial<Driver> | null = null;

  constructor(private driverService: DriverService) {}

  ngOnInit() {
    this.loadDrivers();
  }

  loadDrivers() {
    this.driverService.getDrivers().subscribe((res) => (this.drivers = res));
  }

  addDriver() {
    if (!this.newDriver.name || !this.newDriver.phone) return;
    this.driverService.addDriver(this.newDriver).subscribe(() => {
      this.newDriver = {};
      this.loadDrivers();
    });
  }

  deleteDriver(id: number) {
    if (!confirm('Are you sure?')) return;
    this.driverService.deleteDriver(id).subscribe(() => this.loadDrivers());
  }

  // Start editing a driver
  startEdit(driver: Driver) {
    this.editingDriver = { ...driver }; // clone to avoid modifying table before save
  }

  // Cancel editing
  cancelEdit() {
    this.editingDriver = null;
  }

  // Save editing
  saveEdit() {
    if (!this.editingDriver?.id) return;
    this.driverService.updateDriver(this.editingDriver.id, this.editingDriver).subscribe(() => {
      this.editingDriver = null;
      this.loadDrivers();
    });
  }
}
