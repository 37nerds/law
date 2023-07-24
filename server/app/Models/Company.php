<?php

namespace App\Models;

use App\Traits\ModelTrait;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

/**
 * @method static create(mixed $validated)
 * @method static select(string $string, string $string1 = "", string $string2 = "")
 * @property mixed $address
 * @property mixed $name
 * @property mixed $id
 */
class Company extends Model
{
    use HasFactory, ModelTrait;

    protected $fillable = [
        'name',
        'group_of_company_id',
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
        'authorized_capital',
        'paid_up_capital',
        'business_field',
        'legal_form',
        'contact_person',
        'contact_person_mobile',
        'contact_person_email',
    ];

    public function group_of_company(): BelongsTo
    {
        return $this->belongsTo(GroupOfCompany::class, "group_of_company_id");
    }
}
