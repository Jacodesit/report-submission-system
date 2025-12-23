<?php

use App\Http\Controllers\ProgramHead\ViewController;
use Illuminate\Support\Facades\Route;

Route::middleware(['auth', 'verified', 'role:program_head'])->group(function () {
    Route::get('/program-head/dashboard', [ViewController::class, 'dashboard'])->name('program-head.dashboard');
});
