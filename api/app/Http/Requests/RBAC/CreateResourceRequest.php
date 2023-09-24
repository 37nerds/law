<?php

namespace App\Http\Requests\RBAC;

use Illuminate\Foundation\Http\FormRequest;

class CreateResourceRequest extends FormRequest
{
    public function authorize(): bool
    {
        return true;
    }

    public function rules(): array
    {
        return [
            'api' => ["required", 'string', 'max:255'],
            'web' => ["required", 'string', 'max:255'],
            'method' => ["required", 'string', 'max:255'],
            'label' => ["required", 'string', 'max:255'],
            'group' => ["required", 'string', 'max:255'],
        ];
    }
}
