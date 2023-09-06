<?php

namespace App\Http\Resources;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class UnitResource extends JsonResource
{
    public function toArray(Request $request): array
    {
        return [
            'id' => $this->id,
            'name' => $this->name,
            'company_id' => $this->company_id,
            'address' => $this->address,
            'telephone' => $this->telephone,
            'mobile' => $this->mobile,
            'email' => $this->email,
            'website' => $this->website,
            'trade_license_no' => $this->trade_license_no,
            'tin' => $this->tin,
            'bin' => $this->bin,
            'bida_reg_no' => $this->bida_reg_no,
            'incorporation_no' => $this->incorporation_no,
            'membership_no' => $this->membership_no,
            'member_of_the_association' => $this->member_of_the_association,
            'business_field' => $this->business_field,
            'legal_form' => $this->legal_form,
            'contact_person' => $this->contact_person,
            'contact_person_mobile' => $this->contact_person_mobile,
            'contact_person_email' => $this->contact_person_email,
            'created_at' => $this->created_at,
            'updated_at' => $this->updated_at,
        ];
    }
}
