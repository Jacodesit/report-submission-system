<?php

namespace App\Http\Controllers\ProgramHead;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;

class ViewController extends Controller
{
    public function dashboard(){
        return inertia('program-head/dashboard/page');
    }
}