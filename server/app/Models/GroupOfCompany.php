<?php

namespace App\Models;

use App\Traits\ModelTrait;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

/**
 * @method static create(mixed $validated)
 * @method static select(string $string, string $string1 = "", string $string2 = "")
 * @property mixed $id
 * @property mixed $name
 * @property mixed $address
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
