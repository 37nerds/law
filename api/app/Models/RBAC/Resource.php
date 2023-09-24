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
}
