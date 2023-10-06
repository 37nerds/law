<?php

namespace App\Http\Requests\Settings;

use Illuminate\Foundation\Http\FormRequest;

class UpdateHostRequest extends FormRequest
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
            'email' => 'nullable|email|max:255',
            'website' => 'nullable|string|max:255',
            'trade_licence_no' => 'nullable|string|max:255',
            'tin' => 'nullable|string|max:255',
            'bin' => 'nullable|string|max:255',
            'professional_licence_no' => 'nullable|string|max:255',
            'membership_no' => 'nullable|string|max:255',
            'financial_year_start' => 'nullable|date',
            'currency_symbol' => 'nullable|string|max:5',
            'tds_rate' => 'nullable|numeric',
            'vds_rate' => 'nullable|numeric',
            'payment_terms' => 'nullable|string',
            'declaration' => 'nullable|string',
            'salutation' => 'nullable|string',
        ];
    }
}
