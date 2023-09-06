<?php

namespace App\Http\Requests\Customers;

use Illuminate\Foundation\Http\FormRequest;

class UpdateGroupOfCompanyRequest extends FormRequest
{
    public function authorize(): bool
    {
        return true;
    }

    public function rules(): array
    {
        return [
            'name' => 'nullable|string|max:255',
            'address' => 'nullable|string|max:255',
            'telephone' => 'nullable|string|max:20',
            'mobile' => 'nullable|string|max:20',
            'email' => 'nullable|email|unique:group_of_companies,email,' . $this->route('group_of_company')->id,
            'website' => 'nullable|url',
            'trade_license_no' => 'nullable|string|max:255',
            'tin' => 'nullable|numeric|digits:10',
            'bin' => 'nullable|numeric|digits:10',
            'incorporation_no' => 'nullable|string|max:255',
            'membership_no' => 'nullable|numeric|digits:10',
            'member_of_the_association' => 'nullable|string',
            'business_field' => 'nullable|string|max:255',
            'legal_form' => 'nullable|string|max:255',
            'special_notes' => 'nullable|string',
            'is_active' => 'nullable|boolean',
        ];
    }
}
