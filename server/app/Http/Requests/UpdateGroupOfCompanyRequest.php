<?php

namespace App\Http\Requests;

use Illuminate\Contracts\Validation\ValidationRule;
use Illuminate\Foundation\Http\FormRequest;

class UpdateGroupOfCompanyRequest extends FormRequest
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
            'name' => 'sometimes|string|max:255', // The "sometimes" rule allows the field to be optional
            'address' => 'sometimes|string|max:255',
            'telephone' => 'sometimes|string|max:20',
            'mobile' => 'sometimes|string|max:20',
            'email' => 'sometimes|email|unique:group_of_companies,email,' . $this->route('group_of_company')->id,
            'website' => 'nullable|url',
            'trade_license_no' => 'sometimes|string|max:255',
            'tin' => 'nullable|numeric|digits:10',
            'bin' => 'nullable|numeric|digits:10',
            'incorporation_no' => 'nullable|string|max:255',
            'membership_no' => 'nullable|numeric|digits:10',
            'member_of_the_association' => 'nullable|string',
            'business_field' => 'nullable|string|max:255',
            'legal_form' => 'nullable|string|max:255',
            'special_notes' => 'nullable|string',
            'is_active' => 'sometimes|boolean',
        ];
    }
}
