<?php

namespace App\Base;

trait ModelTrait
{
    public static function table()
    {
        return with(new static)->getTable();
    }
}
