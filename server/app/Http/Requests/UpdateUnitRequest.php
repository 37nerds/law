<?php

namespace App\Http\Requests;

use Illuminate\Contracts\Validation\ValidationRule;
use Illuminate\Foundation\Http\FormRequest;

class UpdateUnitRequest extends FormRequest
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
            'company_id' => 'sometimes|exists:companies,id',
            'address' => 'sometimes|string|max:500',
            'telephone' => 'sometimes|string|max:20',
            'mobile' => 'sometimes|string|max:20',
            'email' => 'sometimes|email|max:255',
            'website' => 'nullable|url|max:255',
            'trade_license_no' => 'sometimes|string|max:100',
            'tin' => 'sometimes|string|max:10',
            'bin' => 'sometimes|string|max:10',
            'bida_reg_no' => 'sometimes|string|max:10',
            'incorporation_no' => 'sometimes|string|max:10',
            'membership_no' => 'sometimes|string|max:10',
            'member_of_the_association' => 'sometimes|string|max:500',
            'business_field' => 'sometimes|string|max:255',
            'legal_form' => 'sometimes|string|max:255',
            'contact_person' => 'sometimes|string|max:255',
            'contact_person_mobile' => 'sometimes|string|max:20',
            'contact_person_email' => 'sometimes|email|max:255',
        ];
    }
}
