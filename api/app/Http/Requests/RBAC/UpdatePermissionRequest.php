<?php

namespace App\Http\Requests\RBAC;

use Illuminate\Foundation\Http\FormRequest;

class UpdatePermissionRequest extends FormRequest
{
    public function authorize(): bool
    {
        return true;
    }

    public function rules(): array
    {
        return [
            'role_id' => ['string', 'max:255'],
            'resource_id' => ['string', 'max:255'],
        ];
    }
}
