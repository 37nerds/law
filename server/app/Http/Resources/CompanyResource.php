<?php

namespace App\Http\Resources;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

/**
 * @property mixed $id
 * @property mixed $name
 * @property mixed $updated_at
 * @property mixed $created_at
 * @property mixed $contact_person_email
 * @property mixed $contact_person_mobile
 * @property mixed $contact_person
 * @property mixed $legal_form
 * @property mixed $business_field
 * @property mixed $paid_up_capital
 * @property mixed $authorized_capital
 * @property mixed $member_of_the_association
 * @property mixed $membership_no
 * @property mixed $incorporation_no
 * @property mixed $bida_reg_no
 * @property mixed $bin
 * @property mixed $tin
 * @property mixed $trade_license_no
 * @property mixed $website
 * @property mixed $email
 * @property mixed $mobile
 * @property mixed $telephone
 * @property mixed $address
 * @property mixed $group_of_company
 */
class CompanyResource extends JsonResource
{
    /**
     * Transform the resource into an array.
     *
     * @return array<string, mixed>
     */
    public function toArray(Request $request): array
    {
        return ['id' => $this->id,
            'name' => $this->name,
            'group_of_company' => $this->group_of_company,
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
            'authorized_capital' => $this->authorized_capital,
            'paid_up_capital' => $this->paid_up_capital,
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
