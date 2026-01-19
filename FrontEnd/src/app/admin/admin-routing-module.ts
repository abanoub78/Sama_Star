import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { Admin } from './admin/admin';
import { Dashboard } from './dashboard/dashboard';
import { Buses } from './buses/buses';
import { Trips } from './trips/trips';
import { Routes as BusRoutes } from './routes/routes';
import { Drivers } from './drivers/drivers';
import { Bookings } from './bookings/bookings';
import { adminGuard } from '../core/guards/admin-guard';

const routes: Routes = [
  {
    path: '',
    component: Admin,
    canActivate: [adminGuard],
    children: [
      { path: '', component: Dashboard },
      { path: 'buses', component: Buses },
      { path: 'trips', component: Trips },
      { path: 'routes', component: BusRoutes },
      { path: 'drivers', component: Drivers },
      { path: 'bookings', component: Bookings },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AdminRoutingModule {}
