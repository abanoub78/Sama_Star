import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NgChartsModule } from 'ng2-charts';
import { ChartData, ChartOptions } from 'chart.js';
import { DashboardService } from '../../core/services/dashboard-service';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [CommonModule, NgChartsModule],
  templateUrl: './dashboard.html',
  styleUrl: './dashboard.css',
})
export class Dashboard implements OnInit {
  stats = { buses: 0, trips: 0, drivers: 0, bookings: 0 };

  // BAR
  barChartData: ChartData<'bar'> = {
    labels: ['Buses', 'Trips', 'Drivers', 'Bookings'],
    datasets: [
      {
        label: 'Total',
        data: [0, 0, 0, 0],
        backgroundColor: ['#2196f3', '#4caf50', '#ff9800', '#f44336'],
      },
    ],
  };

  barChartOptions: ChartOptions<'bar'> = {
    responsive: true,
    animation: { duration: 1500 },
    plugins: { legend: { display: false } },
  };

  // DOUGHNUT
  doughnutChartData: ChartData<'doughnut'> = {
    labels: ['Buses', 'Trips', 'Drivers', 'Bookings'],
    datasets: [
      {
        data: [0, 0, 0, 0],
        backgroundColor: ['#2196f3', '#4caf50', '#ff9800', '#f44336'],
      },
    ],
  };

  // LINE (Mock growth)
  lineChartData: ChartData<'line'> = {
    labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May'],
    datasets: [
      {
        label: 'Bookings Growth',
        data: [5, 15, 30, 45, 70],
        borderColor: '#1976d2',
        fill: true,
        tension: 0.4,
      },
    ],
  };

  lineChartOptions: ChartOptions<'line'> = {
    responsive: true,
    animation: { duration: 2000 },
  };

  constructor(private dashboardService: DashboardService) {}

  ngOnInit() {
    this.loadStats();
  }

  loadStats() {
    this.dashboardService.getStats().subscribe((res) => {
      this.stats = res;

      this.barChartData.datasets[0].data = [res.buses, res.trips, res.drivers, res.bookings];

      this.doughnutChartData.datasets[0].data = [res.buses, res.trips, res.drivers, res.bookings];
    });
  }
}
