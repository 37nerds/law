<?php

namespace App\Http\Requests\RBAC;

use Illuminate\Foundation\Http\FormRequest;

class CreateRoleRequest extends FormRequest
{
    public function authorize(): bool
    {
        return true;
    }

    public function rules(): array
    {
        return [
            'name' => ["required", 'string', 'max:255'],
        ];
    }
}
