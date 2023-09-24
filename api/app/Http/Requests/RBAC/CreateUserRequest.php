<?php

namespace App\Http\Requests\RBAC;

use App\Logic\Rule as RuleLogic;
use Illuminate\Foundation\Http\FormRequest;

class CreateUserRequest extends FormRequest
{
    public function authorize(): bool
    {
        return true;
    }

    public function rules(): array
    {
        return [
            "role_id" => ["required", "string"],

            'email' => ['required', 'string', 'email', 'max:255', 'unique:users,email'],
            "username" => ["required", "string", "max:255"],
            'password' => RuleLogic::passwordRules(),

            'name' => ['string', 'max:255'],
            "phone" => ["nullable", "string", "max:255"],
            "active" => ["nullable", "boolean"],
            "address" => ["nullable", "string", "max:255"],
        ];
    }
}
