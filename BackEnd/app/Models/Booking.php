<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Booking extends Model
{
    protected $fillable = ['user_id','trip_id','seat_id','status'];

    public function trip() {
        return $this->belongsTo(Trip::class);
    }

    public function seat() {
        return $this->belongsTo(Seat::class);
    }

    public function user() {
        return $this->belongsTo(User::class);
    }
}

