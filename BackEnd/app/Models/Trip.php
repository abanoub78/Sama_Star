<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Trip extends Model
{
    protected $fillable = [
        'route_id','bus_id','driver_id',
        'trip_date','departure_time','arrival_time','price'
    ];

    public function route() {
        return $this->belongsTo(Route::class);
    }

    public function bus() {
        return $this->belongsTo(Bus::class);
    }

    public function bookings() {
        return $this->hasMany(Booking::class);
    }
    public function driver()
{
    return $this->belongsTo(Driver::class);
}

}

