<?php

namespace App\Http\Requests;

use Illuminate\Contracts\Validation\ValidationRule;
use Illuminate\Foundation\Http\FormRequest;

class StoreUnitRequest extends FormRequest
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
            'company_id' => 'required|exists:companies,id',
            'address' => 'required|string|max:500',
            'telephone' => 'nullable|string|max:20',
            'mobile' => 'required|string|max:20',
            'email' => 'required|email|max:255',
            'website' => 'nullable|url|max:255',
            'trade_license_no' => 'required|string|max:100',
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
