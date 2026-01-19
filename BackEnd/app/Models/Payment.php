<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use App\Models\Booking;
use App\Models\User;



class Payment extends Model
{
    protected $fillable = [
        'user_id',
        'booking_id',
        'method',
        'amount',
        'order_id',
        'transaction_id',
        'status'
    ];

    public function booking()
    {
        return $this->belongsTo(Booking::class);
    }

    public function user()
    {
        return $this->belongsTo(User::class);
    }
}

