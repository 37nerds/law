<?php

namespace App\Http\Requests\Customers;

use Illuminate\Foundation\Http\FormRequest;

class StoreGroupOfCompanyRequest extends FormRequest
{
    public function authorize(): bool
    {
        return true;
    }

    public function rules(): array
    {
        return [
            'name' => 'required|string|max:255',
            'address' => 'required|string',
            'telephone' => 'nullable|string|max:20',
            'mobile' => 'nullable|string|max:20',
            'email' => 'nullable|email|unique:group_of_companies,email',
            'website' => 'nullable|url',
            'trade_license_no' => 'nullable|string',
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
