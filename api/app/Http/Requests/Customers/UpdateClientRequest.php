<?php

namespace App\Http\Requests\Customers;

use Illuminate\Foundation\Http\FormRequest;

class UpdateClientRequest extends FormRequest
{
    public function authorize(): bool
    {
        return true;
    }

    public function rules(): array
    {
        return [
            "status" => ["nullable", "string"],
            'name' => 'nullable|string|max:255',
            'unit_id' => 'nullable|exists:units,id',
            'client_id' => 'nullable|string|max:50',
            'passport_no' => 'nullable|string|max:50',
            'passport_issue_date' => 'nullable|date',
            'passport_valid_date' => 'nullable|date',
            'gender' => 'nullable|string|max:10',
            'position_hold' => 'nullable|string|max:100',
            'mobile' => 'nullable|string|max:20',
            'email' => 'nullable|email|max:255',
            'date_of_birth' => 'nullable|date',
            'nationality' => 'nullable|string|max:50',
            'father_name' => 'nullable|string|max:100',
            'mother_name' => 'nullable|string|max:100',
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
