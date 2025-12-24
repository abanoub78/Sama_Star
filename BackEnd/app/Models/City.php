<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class City extends Model
{
    protected $fillable = ['name'];

    public function fromRoutes() {
        return $this->hasMany(Route::class, 'from_city_id');
    }

    public function toRoutes() {
        return $this->hasMany(Route::class, 'to_city_id');
    }
}

