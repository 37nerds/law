<?php

namespace App\Http\Requests\RBAC;

use Illuminate\Foundation\Http\FormRequest;

class UpdateResourceRequest extends FormRequest
{
    public function authorize(): bool
    {
        return true;
    }

    public function rules(): array
    {
        return [
            'api' => ['string', 'max:255'],
            'web' => ['string', 'max:255'],
            'method' => ['string', 'max:255'],
            'label' => ['string', 'max:255'],
            'group' => ['string', 'max:255'],
        ];
    }
}
