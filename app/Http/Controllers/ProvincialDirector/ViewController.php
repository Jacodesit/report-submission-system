<?php

namespace App\Http\Controllers\ProvincialDirector;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;

class ViewController extends Controller
{
    public function dashboard(){
        return inertia('provincial-director/dashboard/page');
    }
}