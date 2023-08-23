<?php

namespace App\Helpers;

use Illuminate\Support\Str as LaraStr;

class Str
{
    public static function toSlug(string $title): string
    {
        return LaraStr::slug($title);
    }
    public static function toCapitalized(string $string): string
    {
        $x = ucwords($string);
        echo $x;
        return $x;
    }
}
