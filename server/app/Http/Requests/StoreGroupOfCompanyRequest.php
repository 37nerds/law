<?php

namespace App\Http\Requests;

use Illuminate\Contracts\Validation\ValidationRule;
use Illuminate\Foundation\Http\FormRequest;

class StoreGroupOfCompanyRequest extends FormRequest
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
            'name' => 'required|string|max:255',
            'address' => 'required|string',
            'telephone' => 'nullable|string|max:20',
            'mobile' => 'required|string|max:20',
            'email' => 'required|email|unique:group_of_companies,email',
            'website' => 'nullable|url',
            'trade_license_no' => 'required|string',
            'tin' => 'nullable|string|max:10',
            'bin' => 'nullable|string|max:10',
            'incorporation_no' => 'nullable|string',
            'membership_no' => 'nullable|string|max:10',
            'member_of_the_association' => 'nullable|string',
            'business_field' => 'nullable|string|max:255',
            'legal_form' => 'nullable|string|max:255',
            'special_notes' => 'nullable|string',
            'is_active' => 'boolean'
        ];
    }
}
