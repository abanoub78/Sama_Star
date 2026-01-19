import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../environments/environment';
import { Router } from '@angular/router';
@Injectable({ providedIn: 'root' })
export class AuthService {
  user: any = null;

  constructor(private http: HttpClient, private router: Router) {}

  login(data: any) {
    return this.http.post<any>(`${environment.apiUrl}/login`, data);
  }

  register(data: any) {
    return this.http.post<any>(`${environment.apiUrl}/register`, data);
  }

  saveToken(token: string, role?: string) {
    localStorage.setItem('token', token);
    if (role) {
      localStorage.setItem('role', role);
    }
    this.loadUser();
  }

  logout() {
    localStorage.removeItem('token');
    localStorage.removeItem('role'); // 🔥 مهم
    this.user = null;
    this.router.navigate(['/register']);
  }

  isLoggedIn(): boolean {
    return !!localStorage.getItem('token');
  }

  isAdmin(): boolean {
    // 1️⃣ لو user متحمّل
    if (this.user?.role) {
      return this.user.role === 'admin';
    }

    // 2️⃣ fallback من localStorage
    const role = localStorage.getItem('role');
    return role === 'admin';
  }

  loadUser() {
    if (this.isLoggedIn()) {
      // افترضنا Laravel API عنده endpoint /api/me
      this.http.get<any>(`${environment.apiUrl}/me`).subscribe({
        next: (res) => (this.user = res),
        error: () => (this.user = null),
      });
    }
  }

  updateProfile(data: any) {
    const formData = new FormData();

    if (data.name?.trim()) formData.append('name', data.name.trim());
    if (data.phone?.trim()) formData.append('phone', data.phone.trim());
    if (data.password?.trim()) formData.append('password', data.password.trim());
    if (data.profileImage instanceof File) formData.append('profileImage', data.profileImage);

    return this.http.post(`${environment.apiUrl}/profile`, formData);
  }
}
