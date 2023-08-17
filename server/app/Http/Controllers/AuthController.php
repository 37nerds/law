<?php

namespace App\Http\Controllers;

use App\Models\User;

//use Illuminate\Auth\Events\Registered;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;
use Laravel\Sanctum\PersonalAccessToken;

class AuthController extends Controller
{
    public function register(Request $request)
    {
        $payload = $request->validate([
            "name" => "required|string|min:1|max:255",
            "email" => "required|string|min:5|max:255|unique:users,email",
            "password" => "required|string|min:3|max:32"
        ]);
        $user = User::create($payload);

        $token = $user->createToken("register_on_token", [$user->role]);

//        event(new Registered($user));

        $response = $this->success2(
            201,
            [
                "name" => $user->name,
                "email" => $user->email,
            ],
        );

        $response->cookie('auth_token', $token->plainTextToken, 60 * 24, null, null, false, true); // HTTP-only cookie

        return $response;
    }

    public function login(Request $request)
    {
        $payload = $request->validate([
            "email" => "required|string|min:5|max:255",
            "password" => "required|string|min:3|max:32"
        ]);
        $user = User::where("email", $payload["email"])->first();

        if (!Hash::check($payload["password"], $user->password)) {
            abort(400, "Not matching email or password");
        }

        $token = $user->createToken("register_on_token", [$user->role]);

        $response = $this->success2(
            201,
            [
                "name" => $user->name,
                "email" => $user->email,
            ],
        );

        $response->cookie('auth_token', $token->plainTextToken, 60 * 24, null, null, false, true); // HTTP-only cookie

        return $response;
    }

    public function logout(Request $request)
    {
        $accessToken = $request->bearerToken();
        $token = PersonalAccessToken::findToken($accessToken);
        $token->delete();
        return $this->success2(200);
    }
}
