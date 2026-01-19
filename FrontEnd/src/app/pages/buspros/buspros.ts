import { ChangeDetectionStrategy, Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-buspros',
  imports: [CommonModule],
  templateUrl: './buspros.html',
  styleUrl: './buspros.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class Buspros {
  positions = [
    'top',
    'top-right',
    'right',
    'bottom-right',
    'bottom',
    'bottom-left',
    'left',
    'top-left',
  ];
  features = [
    {
      title: 'الأمان والسلامة',
      description: 'نطبق أحدث معايير السلامة والأمان في السفر على الطريق.',
      icon: 'shield',
    },
    {
      title: 'الراحة والرفاهية',
      description: 'مساحة أوسع، وأفضل وسائل الترفيه لسفر أكثر متعة.',
      icon: 'seat',
    },
    {
      title: 'تتبع رحلتك',
      description: 'خاصية تتبع خط سير الرحلة باستخدام رقم الحجز.',
      icon: 'track',
    },
    {
      title: 'طرق دفع متعددة وآمنة',
      description: 'خيارات دفع متنوعة مع أعلى معايير الأمان.',
      icon: 'payment',
    },
    {
      title: 'خيارات ترفيهية على متن الرحلة',
      description: 'استمتع بوسائل ترفيه حديثة طوال الرحلة.',
      icon: 'entertainment',
    },
    {
      title: 'طاقم عمل ودود ومحترف',
      description: 'فريق مدرب لتقديم أفضل تجربة سفر.',
      icon: 'crew',
    },
  ];
  onBookNow(): void {
    // Hook up to your booking flow or router navigation
    console.log('Book Now clicked');
  }
  iconPath(name: string): string {
    switch (name) {
      case 'shield':
        return 'M12 2l8 4v6c0 5.25-3.5 10-8 12-4.5-2-8-6.75-8-12V6l8-4z';
      case 'seat':
        return 'M6 4h12v6H6V4zm2 8h8l2 6H6l2-6z';
      case 'track':
        return 'M4 6h16v4H4V6zm2 10h12v2H6v-2zm2-6h8v2H8v-2z';
      case 'payment':
        return 'M3 6h18v12H3V6zm2 3h14V8H5v1zm0 5h8v2H5v-2z';
      case 'entertainment':
        return 'M4 6h16v10H4V6zm6 2l6 3-6 3V8z';
      case 'crew':
        return 'M12 7a3 3 0 110-6 3 3 0 010 6zm-7 13v-2a5 5 0 015-5h4a5 5 0 015 5v2H5z';
      default:
        return 'M12 2a10 10 0 100 20 10 10 0 000-20z';
    }
  }
}
