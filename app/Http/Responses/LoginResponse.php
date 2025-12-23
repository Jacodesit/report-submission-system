<?php

namespace App\Http\Responses;

use Illuminate\Support\Facades\Auth;
use Laravel\Fortify\Contracts\LoginResponse as LoginResponseContract;

class LoginResponse implements LoginResponseContract
{
    /**
     * Create an HTTP response that represents the object.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Symfony\Component\HttpFoundation\Response
     */
    public function toResponse($request)
    {

        $user = Auth::user();

        return match (true) {
            $user->hasRole('field_officer') =>
                redirect()->route('field-officer.dashboard'),

            $user->hasRole('focal_person') =>
                redirect()->route('focal-person.dashboard'),

            $user->hasRole('program_head') =>
                redirect()->route('program-head.dashboard'),

            $user->hasRole('provincial_director') =>
                redirect()->route('provincial-director.dashboard'),

            default => redirect()->route('dashboard'),
        };
    }
}
