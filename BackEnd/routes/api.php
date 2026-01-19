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
use App\Http\Controllers\Api\PaymentController;

/*
|--------------------------------------------------------------------------
| Public Routes
|--------------------------------------------------------------------------
*/
Route::post('/register', [AuthController::class, 'register']);
Route::post('/login', [AuthController::class, 'login']);

Route::get('/cities', [CityController::class, 'index']);
Route::get('/trips', [TripController::class, 'index']);
Route::get('/trips/{id}', [TripController::class, 'show']);
Route::get('/trips/{id}/seats', [SeatController::class, 'availableSeats']);

/*
|--------------------------------------------------------------------------
| Authenticated User Routes
|--------------------------------------------------------------------------
*/
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

    Route::post('/profile', [ProfileController::class, 'update']);

    // USER BOOKINGS
    Route::post('/bookings', [BookingController::class, 'store']);
    Route::get('/my-bookings', [BookingController::class, 'myBookings']);
    Route::delete('/my-bookings/{id}', [BookingController::class, 'destroyMyBooking']);
    Route::get('/bookings/{id}', [BookingController::class, 'show']);
    Route::get('/trips', [TripController::class, 'index']);

        Route::post('/pay/{booking}', [PaymentController::class, 'pay']);



});
Route::post('/paymob/webhook', [PaymentController::class, 'webhook']);
Route::match(['get', 'post'], '/paymob/callback', [PaymentController::class, 'callback']);


/*
|--------------------------------------------------------------------------
| Admin Routes
|--------------------------------------------------------------------------
*/
Route::middleware(['auth:sanctum', 'admin'])->group(function () {

    Route::get('/bookings', [BookingController::class, 'allBookings']);
    Route::delete('/bookings/{id}', [BookingController::class, 'destroy']);
    
    Route::apiResource('buses', BusController::class);
    Route::apiResource('drivers', DriverController::class);
    Route::apiResource('cities', CityController::class);
    Route::apiResource('routes', RouteController::class);
Route::apiResource('trips', TripController::class)->except(['index']);

});
