<?php

namespace App\Http\Requests\Auth;

use App\Logic\Rule as RuleLogic;
use App\Models\User;
use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Validation\Rule;

class RegisterRequest extends FormRequest
{
    public function authorize(): bool
    {
        return true;
    }

    public function rules(): array
    {
        return [
            'name' => ['string', 'max:255'],
            "username" => ["required", "string", "max:255"],
            'email' => [
                'required',
                'string',
                'email',
                'max:255',
                Rule::unique(User::class),
            ],
            'password' => RuleLogic::passwordRules(),
            "remember" => ["nullable", "boolean"]
        ];
    }
}
