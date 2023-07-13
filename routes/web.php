<?php

use App\Http\Controllers\LocationController;
use App\Http\Controllers\ProfileController;
use App\Http\Controllers\SubscriptionController;
use Illuminate\Foundation\Application;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

/*
|--------------------------------------------------------------------------
| Web Routes
|--------------------------------------------------------------------------
|
| Here is where you can register web routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| contains the "web" middleware group. Now create something great!
|
*/

Route::redirect('/', '/location');

Route::get('/location', [LocationController::class, 'index']);
Route::get('/location/provinces', [LocationController::class, 'getProvinces']);
Route::get('/location/regencies/{provinceId}', [LocationController::class, 'getRegencies']);
Route::get('/location/districts/{regencyId}', [LocationController::class, 'getDistricts']);
Route::get('/location/villages/{districtId}', [LocationController::class, 'getVillages']);


Route::get('/subscriptions', [SubscriptionController::class, 'index'])->name('subscriptions.index');
Route::post('/subscriptions', [SubscriptionController::class, 'store'])->name('subscriptions.store');



require __DIR__.'/auth.php';
