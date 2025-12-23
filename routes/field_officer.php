<?php

use App\Http\Controllers\FieldOfficer\ViewController;
use Illuminate\Support\Facades\Route;

Route::middleware(['auth', 'verified', 'role:field_officer'])->group(function () {

    Route::get('/field-officer/dashboard', [ViewController::class, 'dashboard'])->name('field-officer.dashboard');

});
