<?php

namespace App\Http\Controllers;

use App\Base\Controller;
use App\Helpers\X;
use App\Models\User;
use App\Repositories\UserRepository;
use App\Traits\PasswordValidationRules;
use Illuminate\Auth\Events\Registered;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Redirect;
use Illuminate\Support\Facades\Validator;
use Illuminate\Validation\Rule;
use Illuminate\Validation\ValidationException;

class AuthController extends Controller
{
    use PasswordValidationRules;

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

    /**
     * @throws ValidationException
     */
    public function register(Request $request): JsonResponse
    {
        $validated = Validator::make($request->all(), [
            'name' => ['string', 'max:255'],
            "username" => ["required", "string", "max:255"],
            'email' => [
                'required',
                'string',
                'email',
                'max:255',
                Rule::unique(User::class),
            ],
            'password' => $this->passwordRules(),
        ])->validate();

        // Here the validated data only has validated key with values.
        $user = UserRepository::create($validated);

        event(new Registered($user));

        Auth::login($user, $request->boolean("remember"));

        return $this->success2(201);
    }
}
