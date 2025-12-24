<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Driver extends Model
{
    protected $fillable = [
        'name',
        'phone'
    ];

    // Driver has many trips
    public function trips()
    {
        return $this->hasMany(Trip::class);
    }
}
