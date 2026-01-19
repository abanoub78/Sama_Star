<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use App\Models\Trip;
use App\Models\Seat;
use App\Models\User;
use App\Models\Payment;


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
    public function payment()
{
    return $this->hasOne(Payment::class);
}
}

