import { Component, HostListener } from '@angular/core';
import { Router } from '@angular/router';
import { MatIconModule } from '@angular/material/icon';

// Angular Material Modules
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatListModule } from '@angular/material/list';
import { MatButtonModule } from '@angular/material/button';
import { RouterModule } from '@angular/router';
import { AuthService } from '../../core/services/auth';
import { MatMenuModule } from '@angular/material/menu'; // ← هذا المهم
@Component({
  selector: 'app-admin',
  templateUrl: './admin.html',
  styleUrl: './admin.css',
  imports: [
    MatSidenavModule,
    MatToolbarModule,
    MatListModule,
    MatButtonModule,
    RouterModule,
    MatIconModule,
    MatMenuModule, // ← هذا المهم
  ],
})
export class Admin {
  constructor(private router: Router, public auth: AuthService) {}
  ngOnInit() {
    this.auth.loadUser();
  }
  isDesktop: boolean = window.innerWidth > 768;

  @HostListener('window:resize', ['$event'])
  onResize(event: any) {
    this.isDesktop = event.target.innerWidth > 768;
  }

  logout() {
    localStorage.clear();
    this.router.navigate(['/register']);
  }
}
