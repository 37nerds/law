<?php

namespace App\Http\Resources;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class GroupOfCompanyResource extends JsonResource
{
    public function toArray(Request $request): array
    {
        return [
            'id' => $this->id,
            'name' => $this->name,
            'address' => $this->address,
            'telephone' => $this->telephone,
            'mobile' => $this->mobile,
            'email' => $this->email,
            'website' => $this->website,
            'trade_license_no' => $this->trade_license_no,
            'tin' => $this->tin,
            'bin' => $this->bin,
            'incorporation_no' => $this->incorporation_no,
            'membership_no' => $this->membership_no,
            'member_of_the_association' => $this->member_of_the_association,
            'business_field' => $this->business_field,
            'legal_form' => $this->legal_form,
            'special_notes' => $this->special_notes,
            'is_active' => (bool)$this->is_active,
            'created_at' => $this->created_at,
            'updated_at' => $this->updated_at,
        ];
    }
}
