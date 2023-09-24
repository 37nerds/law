<?php

namespace App\Repositories;

use App\Models\Customers\Unit;

class UnitRepository
{
    public static function create(array $properties)
    {
        // TODO: Implement create() method.
    }

    public static function update(Unit $unit, array $properties): Unit
    {
        $unit->fill($properties)->save();
        return $unit;
    }

    public static function delete(string $id)
    {
        // TODO: Implement delete() method.
    }
}
