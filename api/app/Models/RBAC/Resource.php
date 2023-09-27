<?php

namespace App\Models\RBAC;

use App\Enums\Table;
use App\Logic\ModelTrait;
use Illuminate\Database\Eloquent\Concerns\HasUuids;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Resource extends Model
{
    use HasFactory, ModelTrait, HasUuids;

    protected $table = Table::resources;

    protected $fillable = [
        'id',
        'api',
        'web',
        'method',
        'label',
        'group',
    ];

    public function getWebAttribute($value)
    {
        return json_decode($value, true) ?? [];
    }

    public function setWebAttribute($value): void
    {
        $this->attributes['web'] = json_encode($value);
    }
}
