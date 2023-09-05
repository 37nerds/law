<?php

namespace App\Http\Resources;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class ClientResource extends JsonResource
{
    public function toArray(Request $request): array
    {
        return [
            'id' => $this->id,
            "status" => $this->status,
            'name' => $this->name,
            'unit_id' => $this->unit_id,
            "unit_name" => $this->unit->name,
            'client_id' => $this->client_id,
            'passport_no' => $this->passport_no,
            'passport_issue_date' => $this->passport_issue_date,
            'passport_valid_date' => $this->passport_valid_date,
            'gender' => $this->gender,
            'position_hold' => $this->position_hold,
            'mobile' => $this->mobile,
            'email' => $this->email,
            'date_of_birth' => $this->date_of_birth,
            'nationality' => $this->nationality,
            'father_name' => $this->father_name,
            'mother_name' => $this->mother_name,
            'tin_no' => $this->tin_no,
            'date_of_joining' => $this->date_of_joining,
            'current_wp_validity_date' => $this->current_wp_validity_date,
            'visa_expire_date' => $this->visa_expire_date,
            'max_entry_limit' => $this->max_entry_limit,
            'entry_terms' => $this->entry_terms,
            'address' => $this->address,
            'bill_to' => $this->bill_to,
            'notes' => $this->notes,
            'created_at' => $this->created_at,
            'updated_at' => $this->updated_at,
        ];
    }
}
