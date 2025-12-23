<?php

namespace App\Http\Controllers\FieldOfficer;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;

class ViewController extends Controller
{
    public function dashboard(){
        return inertia('field-officer/dashboard/page');
    }
}