<?php

namespace App\Http\Requests\Customers;

use Illuminate\Foundation\Http\FormRequest;

class UpdateUnitRequest extends FormRequest
{
    public function authorize(): bool
    {
        return true;
    }

    public function rules(): array
    {
        return [
            'name' => 'nullable|string|max:255',
            'company_id' => 'nullable|exists:companies,id',
            'address' => 'nullable|string|max:500',
            'telephone' => 'nullable|string|max:20',
            'mobile' => 'nullable|string|max:20',
            'email' => 'nullable|email|max:255',
            'website' => 'nullable|url|max:255',
            'trade_license_no' => 'nullable|string|max:255',
            'tin' => 'nullable|string|max:10',
            'bin' => 'nullable|string|max:10',
            'bida_reg_no' => 'nullable|string|max:10',
            'incorporation_no' => 'nullable|string|max:10',
            'membership_no' => 'nullable|string|max:10',
            'member_of_the_association' => 'nullable|string|max:500',
            'business_field' => 'nullable|string|max:255',
            'legal_form' => 'nullable|string|max:255',
            'contact_person' => 'nullable|string|max:255',
            'contact_person_mobile' => 'nullable|string|max:20',
            'contact_person_email' => 'nullable|email|max:255',
        ];
    }
}
