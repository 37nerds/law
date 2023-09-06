<?php

namespace App\Logic;

trait ModelTrait
{
    public static function table()
    {
        return with(new static)->getTable();
    }
}
