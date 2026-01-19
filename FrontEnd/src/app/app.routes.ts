import { Routes } from '@angular/router';
import { Auth } from './pages/auth/auth';
import { Home } from './pages/home/home';
import { Notfound } from './pages/notfound/notfound';
import { Profile } from './pages/profile/profile';
import { Trips } from './pages/trips/trips';
import { Seats } from './pages/seats/seats';
import { Mybookings } from './pages/mybookings/mybookings';
import { Ticket } from './pages/ticket/ticket';
import { Payment } from './pages/payment/payment';
import { PaymentResult } from './pages/payment-result/payment-result';
import { Stations } from './pages/stations/stations';
import { About } from './pages/about/about';

export const routes: Routes = [
  { path: '', component: Home },
  { path: 'register', component: Auth },
  { path: 'profile', component: Profile },
  { path: 'stations', component: Stations },
  { path: 'about', component: About },

  { path: 'trips', component: Trips },
  { path: 'mybookings', component: Mybookings },
  { path: 'payment/:bookingId', component: Payment },

  { path: 'trips/:id/seats', component: Seats },
  { path: 'ticket/:id', component: Ticket },
  { path: 'payment-result', component: PaymentResult },

  // ✅ ربط الـ Admin هنا
  {
    path: 'admin',
    loadChildren: () => import('./admin/admin-routing-module').then((m) => m.AdminRoutingModule),
  },

  { path: '**', component: Notfound },
];
