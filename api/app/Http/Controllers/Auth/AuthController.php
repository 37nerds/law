<?php

namespace App\Http\Controllers\Auth;

use App\Http\Controllers\Controller;
use App\Http\Requests\Auth\RegisterRequest;
use App\Http\Requests\Auth\UpdateLoggedUserRequest;
use App\Http\Requests\Auth\UpdatePasswordRequest;
use App\Http\Requests\Auth\UploadAvatarRequest;
use App\Logic\Response;
use App\Logic\X;
use App\Repositories\UserRepository;
use Illuminate\Auth\Events\Registered;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Redirect;

class AuthController extends Controller
{
    public function show(Request $request)
    {
        return $request->user();
    }

    public function resetPasswordRedirect(Request $request, string $token): string
    {
        $email = $request->query("email");
        return Redirect::to(config("app.web_url") . "/rest-password?token=$token&email=$email");
    }

    public function uploadAvatar(UploadAvatarRequest $request): JsonResponse
    {
        $image = $request->file('profile-picture');
        $name = X::generateProfilePictureName($image);
        $image->storeAs('public/profile/picture', $name);

        $user = UserRepository::update(Auth::user()->id, [
            "avatar" => $name
        ]);

        return Response::happy(200, $user);
    }

    public function register(RegisterRequest $request): JsonResponse
    {
        $user = UserRepository::create($request->all());

        event(new Registered($user));

        Auth::login($user, $request->boolean("remember"));

        return Response::happy(201);
    }

    public function update(UpdateLoggedUserRequest $request): JsonResponse
    {
        $validated = $request->all();
        $user = UserRepository::update(Auth::user()->id, $validated);
        return Response::happy(200, $user);
    }

    public function updatePassword(UpdatePasswordRequest $request): JsonResponse
    {
        $input = $request->all();

        $flag = Hash::check($input["current_password"], Auth::user()->password);

        if (!$flag) {
            return Response::happy(400, [
                "message" => "Current Password is incorrect",
                "errors" => [
                    "current_password" => [
                        "Current Password is incorrect"
                    ]
                ]
            ]);
        }

        $user = UserRepository::update(Auth::user()->id, ["password" => $input["new_password"]]);

        auth()->guard('web')->logout();
        auth()->guard("web")->login($user);
        session()->regenerate();

        return Response::happy(200, $user);
    }
}
