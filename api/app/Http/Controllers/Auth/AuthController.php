<?php

namespace App\Http\Controllers\Auth;

use App\Base\Controller;
use App\Base\Response;
use App\Helpers\X;
use App\Models\User;
use App\Repositories\UserRepository;
use App\Traits\PasswordValidationRules;
use Exception;
use Illuminate\Auth\Events\Registered;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Redirect;
use Illuminate\Support\Facades\Validator;
use Illuminate\Validation\Rule;
use Illuminate\Validation\ValidationException;
use Laravel\Fortify\Rules\Password;

class AuthController extends Controller
{
    use PasswordValidationRules;

    public function show(Request $request)
    {
        return $request->user();
    }

    public function resetPasswordRedirect(Request $request, string $token): string
    {
        $email = $request->query("email");
        return Redirect::to(config("app.web_url") . "/rest-password?token=$token&email=$email");
    }

    public function uploadAvatar(Request $request): JsonResponse
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

        return Response::happy(200, $user);
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

        return Response::happy(201);
    }

    /**
     * @throws ValidationException
     */
    public function update(Request $request): JsonResponse
    {
        $payload = $request->all();

        $rules = [
            'name' => ['string', 'max:255'],
            "username" => ["string", "max:255"],
        ];

        if (Auth::user()->email !== $payload["email"]) {
            $rules["email"] = [
                'string',
                'email',
                'max:255',
                Rule::unique(User::class, "email"),
            ];
        }

        $validated = Validator::make($payload, $rules)->validate();

        $user = UserRepository::update(Auth::user()->id, $validated);

        return Response::happy(200, $user);
    }

    /**
     * @throws ValidationException
     * @throws Exception
     */
    public function updatePassword(Request $request): JsonResponse
    {
        $input = Validator::make($request->all(), [
            'current_password' => ['required', 'string', new Password],
            'new_password' => ['required', 'string', new Password],
        ])->validate();

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
