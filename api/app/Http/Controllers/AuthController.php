<?php

namespace App\Http\Controllers;

use App\Base\Controller;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Redirect;

class AuthController extends Controller
{
    public function loggedUser(Request $request)
    {
        return $request->user();
    }

    public function resetPasswordRedirect(Request $request, string $token): string
    {
        $email = $request->query("email");
        return Redirect::to(config("app.web_url") . "/rest-password?token=$token&email=$email");
    }
}
