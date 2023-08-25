<?php

namespace App\Base;

interface Repository
{
    public static function create(array $properties);
    public static function update(int $id, array $properties);
    public static function delete(int $id);
}
