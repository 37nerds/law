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
            'api' => ['string', 'max:255', "nullable"],
            'web' => ["nullable", 'array', "nullable"],
            'method' => ['string', 'max:255', "nullable"],
            'label' => ['string', 'max:255', "nullable"],
            'group' => [ 'string', 'max:255', "nullable"],
            "dependencies" => ["nullable", "array", "nullable"],
        ];
    }
}
