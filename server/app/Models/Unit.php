<?php

namespace App\Models;

use App\Traits\ModelTrait;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

/**
 * @method static create(mixed $validated)
 * @method static select(string $string, string $string1, string $string2)
 */
class Unit extends Model
{
    use HasFactory, ModelTrait;

    protected $fillable = [
        'name',
        'company_id',
        'address',
        'telephone',
        'mobile',
        'email',
        'website',
        'trade_license_no',
        'tin',
        'bin',
        'bida_reg_no',
        'incorporation_no',
        'membership_no',
        'member_of_the_association',
        'business_field',
        'legal_form',
        'contact_person',
        'contact_person_mobile',
        'contact_person_email',
    ];
}
