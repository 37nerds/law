<?php

namespace App\Http\Requests;

use Illuminate\Contracts\Validation\ValidationRule;
use Illuminate\Foundation\Http\FormRequest;

class UpdateClientRequest extends FormRequest
{
    /**
     * Determine if the user is authorized to make this request.
     */
    public function authorize(): bool
    {
        return true;
    }

    /**
     * Get the validation rules that apply to the request.
     *
     * @return array<string, ValidationRule|array|string>
     */
    public function rules(): array
    {
        return [
            'name' => 'sometimes|string|max:255',
            'unit_id' => 'sometimes|exists:units,id',
            'client_id' => 'nullable|string|max:50',
            'passport_no' => 'sometimes|string|max:50',
            'passport_issue_date' => 'nullable|date',
            'passport_valid_date' => 'nullable|date',
            'gender' => 'nullable|string|max:10',
            'position_hold' => 'nullable|string|max:100',
            'mobile' => 'sometimes|string|max:20',
            'email' => 'sometimes|email|max:255',
            'date_of_birth' => 'sometimes|date',
            'nationality' => 'nullable|string|max:50',
            'father_name' => 'sometimes|string|max:100',
            'mother_name' => 'sometimes|string|max:100',
            'tin_no' => 'nullable|string|max:50',
            'date_of_joining' => 'nullable|date',
            'current_wp_validity_date' => 'nullable|date',
            'visa_expire_date' => 'nullable|date',
            'max_entry_limit' => 'nullable|string|max:20',
            'entry_terms' => 'nullable|string',
            'address' => 'nullable|string',
            'bill_to' => 'nullable|string',
            'notes' => 'nullable|string',
        ];
    }
}
