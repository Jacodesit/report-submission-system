<?php

namespace App\Http\Controllers\FocalPerson;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;

class ViewController extends Controller
{
    public function dashboard(){

        return inertia('focal-person/dashboard/page');
    }
}
