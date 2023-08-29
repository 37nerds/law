<?php

namespace App\Http\Controllers;

use App\Base\Controller;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Log;
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
        Log::info($request->hasFile('profile-picture'));
        Log::info('Request data:', $request->all());
        Log::info("CT: " . $request->header("Content-Type"));

        if ($request->hasFile('profile-picture')) {
            $image = $request->file('profile-picture');
            $imageName = time() . '.' . $image->getClientOriginalExtension();
            $image->storeAs('public/images', $imageName);
            return response()->json(['message' => 'Image uploaded successfully']);
        }

        return response()->json(['message' => 'Image upload failed'], 400);
    }
}
