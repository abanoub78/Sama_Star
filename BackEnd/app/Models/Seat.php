<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Seat extends Model
{
    public $timestamps = false;

    protected $fillable = [
        'bus_id',
        'seat_number'
    ];

    // Seat belongs to bus
    public function bus()
    {
        return $this->belongsTo(Bus::class);
    }

    // Seat can be booked many times (different trips)
    public function bookings()
    {
        return $this->hasMany(Booking::class);
    }
}
