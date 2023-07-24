<?php

namespace App\Models;

use App\Traits\ModelTrait;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

/**
 * @method static create(mixed $validated)
 */
class Client extends Model
{
    use HasFactory, ModelTrait;

    protected $fillable = [
        'name',
        'unit_id',
        'client_id',
        'passport_no',
        'passport_issue_date',
        'passport_valid_date',
        'gender',
        'position_hold',
        'mobile',
        'email',
        'date_of_birth',
        'nationality',
        'father_name',
        'mother_name',
        'tin_no',
        'date_of_joining',
        'current_wp_validity_date',
        'visa_expire_date',
        'max_entry_limit',
        'entry_terms',
        'address',
        'bill_to',
        'notes',
    ];
}
