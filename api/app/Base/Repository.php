<?php

namespace App\Base;

interface Repository
{
    public static function create(array $properties);

    public static function update(string $id, array $properties);

    public static function delete(string $id);
}