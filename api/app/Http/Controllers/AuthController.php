<?php

namespace App\Http\Controllers;

use App\Base\Controller;
use Illuminate\Http\Request;

class AuthController extends Controller
{
    public function loggedUser(Request $request)
    {
        return $request->user();
    }
}
