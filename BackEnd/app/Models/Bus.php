<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Bus extends Model
{
    protected $fillable = [
        'bus_number',
        'bus_type',
        'total_seats'
    ];

    // Bus has many trips
    public function trips()
    {
        return $this->hasMany(Trip::class);
    }

    // Bus has many seats
    public function seats()
    {
        return $this->hasMany(Seat::class);
    }
}
