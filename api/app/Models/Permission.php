<?php

namespace App\Models;

use App\Enums\Table;
use App\Logic\ModelTrait;
use Illuminate\Database\Eloquent\Concerns\HasUuids;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class Permission extends Model
{
    use HasFactory, ModelTrait, HasUuids;

    protected $table = Table::permissions;

    public function role(): BelongsTo
    {
        return $this->belongsTo(Role::class, "role_id");
    }

    public function resource(): BelongsTo
    {
        return $this->belongsTo(Resources::class, "resource_id");
    }
}
