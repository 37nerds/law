<?php

namespace App\Models;

use App\Base\ModelTrait;
use Illuminate\Database\Eloquent\Concerns\HasUuids;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class Client extends Model
{
    use HasFactory, ModelTrait, HasUuids;

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

    public function unit(): BelongsTo
    {
        return $this->belongsTo(Unit::class, "unit_id");
    }
}
