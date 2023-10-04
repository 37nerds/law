<?php

namespace App\Helpers;

class ArrayH
{
    public static function isIn(array $values, string $key): bool
    {
        return array_key_exists($key, $values);
    }
}
