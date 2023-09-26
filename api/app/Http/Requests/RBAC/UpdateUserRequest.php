<?php

namespace App\Http\Requests\RBAC;

use Illuminate\Foundation\Http\FormRequest;

class UpdateUserRequest extends FormRequest
{
    public function authorize(): bool
    {
        return true;
    }

    public function rules(): array
    {
        return [
            "role_id" => ["string", "nullable"],

            'email' => ['string', 'email', 'max:255', "nullable"],
            "username" => ["string", "max:255", "nullable"],

            'name' => ['string', 'max:255', "nullable"],
            "phone" => ["string", "max:255", "nullable"],
            "active" => ["boolean", "nullable"],
            "address" => ["string", "max:255", "nullable"],
        ];
    }
}
