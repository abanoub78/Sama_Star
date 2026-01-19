import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AuthService } from '../../core/services/auth';
import { FormsModule, NgForm } from '@angular/forms'; // ← أضف ده
import { Router } from '@angular/router';

@Component({
  selector: 'app-auth',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './auth.html',
  styleUrls: ['./auth.css'],
})
export class Auth {
  isLogin = true;
  // 🔔 Popup state
  showPopup = false;
  popupMessage = '';
  popupType: 'success' | 'error' = 'success';

  loading = false; // 🔔 حالة الـ Loading

  loginData = {
    email: '',
    password: '',
  };

  registerData = {
    name: '',
    phone: '',
    email: '',
    password: '',
    password_confirmation: '',
  };

  constructor(private auth: AuthService, private router: Router) {}

  onSubmit(form: NgForm) {
    if (form.invalid) {
      this.showMessage('الرجاء تعبئة جميع الحقول بشكل صحيح', 'error');
      return;
    }

    this.loading = true;

    if (this.isLogin) {
      this.auth.login(this.loginData).subscribe({
        next: (res: any) => {
          this.auth.saveToken(res.token, res.user.role);

          this.showMessage('تم تسجيل الدخول بنجاح', 'success');

          setTimeout(() => {
            if (res.user.role === 'admin') {
              this.router.navigate(['/admin']); // ← لو Admin يروح للدashboard
            } else {
              this.router.navigate(['/']); // ← المستخدم العادي يروح للـ Home
            }
          }, 1500);
        },
        error: () => {
          this.showMessage('بيانات الدخول غير صحيحة', 'error');
          form.resetForm();
          this.loading = false;
        },
        complete: () => (this.loading = false),
      });
    } else {
      if (this.registerData.password !== this.registerData.password_confirmation) {
        this.showMessage('كلمة المرور وتأكيدها غير متطابقين', 'error');
        this.loading = false;
        return;
      }

      this.auth.register(this.registerData).subscribe({
        next: (res: any) => {
          this.auth.saveToken(res.token);
          this.showMessage('تم إنشاء الحساب بنجاح 🎉', 'success');
          setTimeout(() => this.router.navigate(['/']), 3000);
        },
        error: (err) => this.showMessage(err.error?.message || 'حدث خطأ', 'error'),
        complete: () => (this.loading = false),
      });
    }
  }

  showMessage(message: string, type: 'success' | 'error') {
    this.popupMessage = message;
    this.popupType = type;
    this.showPopup = true;

    setTimeout(() => {
      this.showPopup = false;
    }, 3000);
  }
}
