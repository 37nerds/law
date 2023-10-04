<?php

namespace App\Http\Requests\RBAC;

use Illuminate\Foundation\Http\FormRequest;

/**
 * @property string $role_id
 */
class CreatePermissionAllRequest extends FormRequest
{
    public function authorize(): bool
    {
        return true;
    }

    public function rules(): array
    {
        return [
            'role_id' => ["required", 'string', 'max:255'],
        ];
    }
}
