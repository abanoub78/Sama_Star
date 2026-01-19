import { Component } from '@angular/core';
import { MatTableModule } from '@angular/material/table';
import { MatButtonModule } from '@angular/material/button';
import { BusService, Bus } from '../../core/services/bus-service';
import { MatDialogModule } from '@angular/material/dialog';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MatSelectModule } from '@angular/material/select';
import { MatFormFieldModule } from '@angular/material/form-field';
@Component({
  selector: 'app-buses',
  imports: [
    MatTableModule,
    MatButtonModule,
    MatDialogModule,
    CommonModule,
    FormsModule,
    MatSelectModule,
    MatFormFieldModule,
  ],
  templateUrl: './buses.html',
  styleUrl: './buses.css',
})
export class Buses {
  buses: Bus[] = [];
  displayedColumns = ['bus_number', 'bus_type', 'total_seats', 'actions'];
  newBus: Partial<Bus> = {};

  constructor(private busService: BusService) {}

  ngOnInit() {
    this.loadBuses();
  }
  editingBus: Partial<Bus> | null = null;

  startEdit(bus: Bus) {
    this.editingBus = { ...bus };
  }

  cancelEdit() {
    this.editingBus = null;
  }

  saveEdit() {
    if (!this.editingBus?.id) return;

    this.busService.updateBus(this.editingBus.id, this.editingBus).subscribe(() => {
      this.editingBus = null;
      this.loadBuses();
    });
  }

  loadBuses() {
    this.busService.getBuses().subscribe((res) => (this.buses = res));
  }

  addBus() {
    if (!this.newBus.bus_number || !this.newBus.bus_type || !this.newBus.total_seats) return;
    this.busService.addBus(this.newBus).subscribe(() => {
      this.newBus = {};
      this.loadBuses();
    });
  }

  deleteBus(id: number) {
    if (!confirm('Are you sure?')) return;
    this.busService.deleteBus(id).subscribe(() => this.loadBuses());
  }
}
