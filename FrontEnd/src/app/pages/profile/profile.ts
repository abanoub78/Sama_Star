import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, NgForm } from '@angular/forms';
import { AuthService } from '../../core/services/auth';

@Component({
  selector: 'app-profile',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './profile.html',
  styleUrls: ['./profile.css'],
})
export class Profile {
  loading = false;
  showPopup = false;
  popupMessage = '';
  popupType: 'success' | 'error' = 'success';

  profileData = {
    name: '',
    phone: '',
    password: '',
  };

  previewImage: string | null = null;
  selectedFile: File | null = null;

  constructor(public auth: AuthService) {
    this.loadProfile();
  }

  onImageChange(event: any) {
    const file = event.target.files[0];
    if (file) {
      this.selectedFile = file;

      const reader = new FileReader();
      reader.onload = (e) => {
        this.previewImage = e.target?.result as string;
      };
      reader.readAsDataURL(file);
    }
  }
  saveProfile(form: NgForm) {
    if (!this.profileData.name.trim() || !this.profileData.phone.trim()) {
      this.showMessage('الاسم ورقم الهاتف مطلوبين', 'error');
      return;
    }

    this.loading = true;

    const data = {
      name: this.profileData.name,
      phone: this.profileData.phone,
      password: this.profileData.password,
      profileImage: this.selectedFile, // File فقط
    };

    this.auth.updateProfile(data).subscribe({
      next: (res: any) => {
        this.auth.user = res.user;

        // تحديث الصورة + cache buster
        this.previewImage = res.user.profile_image
          ? res.user.profile_image + '?t=' + Date.now()
          : null;

        this.selectedFile = null;

        // ✅ popup نجاح
        this.showMessage('تم حفظ البيانات بنجاح ✅', 'success');
      },
      error: (err) => {
        const msg = err?.error?.message || 'حدث خطأ أثناء حفظ البيانات';
        this.showMessage(msg, 'error');
      },
      complete: () => {
        this.loading = false;
      },
    });
  }

  loadProfile() {
    if (this.auth.isLoggedIn()) {
      this.auth.loadUser();

      const interval = setInterval(() => {
        if (this.auth.user) {
          this.profileData.name = this.auth.user.name || '';
          this.profileData.phone = this.auth.user.phone || '';

          // 👇 لازم URL كامل
          this.previewImage = this.auth.user.profile_image
            ? this.auth.user.profile_image + '?t=' + Date.now()
            : null;

          clearInterval(interval);
        }
      }, 100);
    }
  }

  showMessage(message: string, type: 'success' | 'error') {
    this.popupMessage = message;
    this.popupType = type;
    this.showPopup = true;
    setTimeout(() => (this.showPopup = false), 3000);
  }
}
