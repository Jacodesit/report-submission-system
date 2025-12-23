<?php

use App\Http\Controllers\FocalPerson\ViewController;
use Illuminate\Support\Facades\Route;

Route::middleware(['auth', 'verified', 'role:focal_person'])->group(function () {
    Route::get('/focal-person/dashboard', [ViewController::class, 'dashboard'])->name('focal-person.dashboard');
});
