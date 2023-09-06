<?php

namespace App\Http\Requests\Auth;

use App\Models\User;
use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Support\Facades\Auth;
use Illuminate\Validation\Rule;

class UpdateLoggedUserRequest extends FormRequest
{
    public function authorize(): bool
    {
        return true;
    }

    public function rules(): array
    {
        $rules = [
            'name' => ['string', 'max:255'],
            "username" => ["string", "max:255"],
        ];

        if (Auth::user()->email !== $this->request->email) {
            $rules["email"] = [
                'string',
                'email',
                'max:255',
                Rule::unique(User::class, "email"),
            ];
        }

        return $rules;
    }
}
