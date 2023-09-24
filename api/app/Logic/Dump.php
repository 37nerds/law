<?php

namespace App\Logic;

class Dump
{
    public static function randomIdFromModel($model): string
    {
        $ids = collect($model::all())->map(fn($item) => $item->id);
        return $ids->get(rand(0, $ids->count() - 1));
    }
}
