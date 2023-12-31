<?php

namespace App\Models\RBAC;

use App\Enums\Table;
use App\Logic\ModelTrait;
use Illuminate\Database\Eloquent\Concerns\HasUuids;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\HasMany;

class Role extends Model
{
    use ModelTrait, HasUuids;

    protected $table = Table::roles;

    protected $fillable = [
        'name',
        'disable'
    ];

    public function users(): HasMany
    {
        return $this->hasMany(User::class, "role_id");
    }

    public function permissions(): HasMany
    {
        return $this->hasMany(Permission::class, "role_id");
    }
}
