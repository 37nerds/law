<?php

namespace App\Models;

use App\Base\ModelTrait;
use Illuminate\Database\Eloquent\Concerns\HasUuids;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class GroupOfCompany extends Model
{
    use HasFactory, ModelTrait, HasUuids;

    protected $fillable = [
        'name',
        'address',
        'telephone',
        'mobile',
        'email',
        'website',
        'trade_license_no',
        'tin',
        'bin',
        'incorporation_no',
        'membership_no',
        'member_of_the_association',
        'business_field',
        'legal_form',
        'special_notes',
        "is_active"
    ];
}
