<?php

namespace App\Http\Resources;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

/**
 * @property mixed $updated_at
 * @property mixed $created_at
 * @property mixed $is_active
 * @property mixed $special_notes
 * @property mixed $legal_form
 * @property mixed $business_field
 * @property mixed $member_of_the_association
 * @property mixed $membership_no
 * @property mixed $incorporation_no
 * @property mixed $bin
 * @property mixed $tin
 * @property mixed $trade_license_no
 * @property mixed $website
 * @property mixed $email
 * @property mixed $mobile
 * @property mixed $telephone
 * @property mixed $address
 * @property mixed $name
 * @property mixed $id
 */
class GroupOfCompanyResource extends JsonResource
{
    /**
     * Transform the resource into an array.
     *
     * @return array<string, mixed>
     */
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
