<?php

namespace App\Http\Requests\Auth;

use Illuminate\Foundation\Http\FormRequest;

class UpdateLoggedUserRequest extends FormRequest
{
    public function authorize(): bool
    {
        return true;
    }

    public function rules(): array
    {
        return [
            'email' => ['string', 'email', 'max:255', "nullable"],
            "username" => ["string", "max:255", "nullable"],

            'name' => ['string', 'max:255', "nullable"],
            "phone" => ["string", "max:255", "nullable"],
            "address" => ["string", "max:255", "nullable"],
        ];
    }
}
