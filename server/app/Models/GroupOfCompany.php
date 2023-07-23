<?php

namespace App\Models;

use App\Traits\ModelTrait;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

/**
 * @method static create(mixed $validated)
 */
class GroupOfCompany extends Model
{
    use HasFactory, ModelTrait;

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
