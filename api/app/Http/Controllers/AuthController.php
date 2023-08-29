<?php

namespace App\Http\Controllers;

use App\Base\Controller;
use App\Helpers\X;
use App\Repositories\UserRepository;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
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

    public function uploadProfilePicture(Request $request): JsonResponse
    {
        $request->validate([
            'profile-picture' => ["required", "image"],
        ]);

        $image = $request->file('profile-picture');

        $name = X::generateProfilePictureName($image);

        $image->storeAs('public/profile/picture', $name);

        $user = UserRepository::update(Auth::user()->id, [
            "avatar" => $name
        ]);

        return $this->success2(200, $user);
    }
}
