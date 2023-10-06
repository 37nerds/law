<?php

namespace App\Models\Settings;

use App\Enums\Table;
use Illuminate\Database\Eloquent\Concerns\HasUuids;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Host extends Model
{
    use HasFactory, HasUuids;

    protected $table = Table::hosts;

    protected $fillable = [
        'name',
        'address',
        'telephone',
        'mobile',
        'email',
        'website',
        'trade_licence_no',
        'tin',
        'bin',
        'professional_licence_no',
        'membership_no',
        'financial_year_start',
        'currency_symbol',
        'tds_rate',
        'vds_rate',
        'payment_terms',
        'declaration',
        'salutation',
    ];
}
