<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\City;

class CitySeeder extends Seeder
{
    public function run(): void
    {
        $cities = [
            'القاهرة',
            'الإسكندرية',
            'المنصورة',
            'طنطا',
            'أسيوط',
            'سوهاج'
        ];

        foreach ($cities as $city) {
            City::create(['name' => $city]);
        }
    }
}
