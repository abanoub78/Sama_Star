<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\Api\CityController;
use App\Http\Controllers\Api\TripController;
use App\Http\Controllers\Api\BookingController;
use App\Http\Controllers\Api\AuthController;
use App\Http\Controllers\Api\BusController;
use App\Http\Controllers\Api\DriverController;
use App\Http\Controllers\Api\RouteController;
use App\Http\Controllers\Api\SeatController;
use App\Http\Controllers\Api\ProfileController;

// Public Routes
Route::post('/register', [AuthController::class, 'register']);
Route::post('/login', [AuthController::class, 'login']);

Route::get('/cities', [CityController::class, 'index']);
Route::get('/trips', [TripController::class, 'index']);
Route::get('/trips/{id}', [TripController::class, 'show']);
Route::get('/trips/{id}/seats', [SeatController::class, 'availableSeats']);

// ← حذفنا الـ route المخصص ده كله

// Protected Routes
Route::middleware('auth:sanctum')->group(function () {
    Route::get('/me', function (Request $request) {
       $user = $request->user();

    return [
        'id' => $user->id,
        'name' => $user->name,
        'phone' => $user->phone,
        'profile_image' => $user->profile_image
            ? asset('profile_images/' . $user->profile_image)
            : null,
    ];
    });

    Route::post('/profile', [ProfileController::class, 'update']); // تحديث البروفايل + رفع الصورة



Route::middleware('auth:sanctum')->group(function () {
    Route::post('/bookings', [BookingController::class, 'store']);
    Route::get('/my-bookings', [BookingController::class, 'myBookings']);
});


    // Admin routes
    Route::post('/buses', [BusController::class, 'store']);
    Route::post('/drivers', [DriverController::class, 'store']);
    Route::post('/routes', [RouteController::class, 'store']);
});