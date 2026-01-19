import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
type Station = { name: string; address?: string; lat?: number; lng?: number };
type CityGroup = { title: string; subtitle?: string; stations: Station[]; expanded?: boolean };
@Component({
  selector: 'app-stations',
  imports: [CommonModule],
  templateUrl: './stations.html',
  styleUrl: './stations.css',
})
export class Stations {
  readonly dir = 'rtl';

  cityGroups: CityGroup[] = [
    {
      title: 'القاهرة',
      subtitle: 'محطة ',
      stations: [
        {
          name: 'محطة رمسيس',
          address: ' 9 ش رمسيس مبنى هندسة السكه الحديد أمام محطة مصر ',
          lat: 27.186,
          lng: 33.796,
        },
        {
          name: 'محطة 6 أكتوبر',
          address: ' غرب سوميد أمام سور النادى الممشى السياحى ',
          lat: 27.186,
          lng: 33.796,
        },
      ],
    },
    {
      title: ' الجيزة',
      subtitle: 'محطة الجيزة',
      stations: [
        {
          name: 'محطة الجيزة',
          address: ' 15 ش مراد الجيزة - أمام السوبر جيت ',
          lat: 27.186,
          lng: 33.796,
        },
      ],
    },
    {
      title: ' الاسكندرية',
      subtitle: 'محطة ',
      stations: [
        {
          name: 'محطة العامرية',
          address:
            'العامريه على الصحراوى أمام كوبرى المشاه و امام شارع قسم العامريه و مستشفى العامريه  ',
          lat: 27.186,
          lng: 33.796,
        },
        {
          name: 'محطة سيدي جابر',
          address:
            ' خلف محطة سيدى جابر بداخل مول الملتقى بجوار كارفور اكسبريس سموحة. مواعيد العمل : 24 ساعة ',
          lat: 27.186,
          lng: 33.796,
        },
      ],
    },
    {
      title: 'طنطا ',
      subtitle: 'محطة طنطا',
      stations: [{ name: 'محطة طنطا', address: '  ١ شارع عبد الوهاب مع الفاتح امام موقف سوق الجمله', lat: 27.186, lng: 33.796 }],
    },
    {
      title: ' أسيوط',
      subtitle: 'محطة ',
      stations: [{ name: 'موقف المعلمين الجديد ', address: ' موقف مصر الجديد الموجود على الطريق الدائرى امتداد كوبري الواسطى على النيل بمنطقه المعلمين ', lat: 27.186, lng: 33.796 },
        { name: 'موقف الهلالي  ', address: ' سيوط ( الهلالي ) : شارع الهلالي مطلع كوبرى الهلالى بجوار نقابه التطبيقين الرحلات من ١١ مساء الى ٧ صباحا', lat: 27.186, lng: 33.796 }
      ],
    },
  ];

  mapError = true;
  toggleGroup(group: CityGroup): void {
    group.expanded = !group.expanded;
  }
  openDirections(station: Station): void {
    let query = '';
    if (station.lat != null && station.lng != null) {
      query = `${station.lat},${station.lng}`;
    } else if (station.address) {
      query = encodeURIComponent(station.address);
    } else {
      query = encodeURIComponent(station.name);
    }
    const url = `https://www.google.com/maps/dir/?api=1&destination=${query}`;
    window.open(url, '_blank');
  }
}
