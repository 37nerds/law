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
            "role_id" => ["string"],

            'email' => ['optional', 'string', 'email', 'max:255', 'unique:users,email'],
            "username" => ["string", "max:255", 'unique:users,username'],

            'name' => ['string', 'max:255'],
            "phone" => ["string", "max:255"],
            "active" => ["boolean"],
            "address" => ["string", "max:255"],
        ];
    }
}
