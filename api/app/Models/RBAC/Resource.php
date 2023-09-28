<?php

namespace App\Models\RBAC;

use App\Enums\Table;
use App\Logic\ModelTrait;
use Illuminate\Database\Eloquent\Concerns\HasUuids;
use Illuminate\Database\Eloquent\Model;

class Resource extends Model
{
    use ModelTrait, HasUuids;

    protected $table = Table::resources;

    protected $fillable = [
        'id',
        'api',
        'web',
        'method',
        'label',
        'group',
        'dependencies'
    ];

    public function getWebAttribute($value)
    {
        return json_decode($value, true) ?? [];
    }

    public function setWebAttribute($value): void
    {
        $this->attributes['web'] = json_encode($value);
    }

    public function getDependenciesAttribute($value)
    {
        return json_decode($value, true) ?? [];
    }

    public function setDependenciesAttribute($value): void
    {
        $this->attributes['dependencies'] = json_encode($value);
    }
}
