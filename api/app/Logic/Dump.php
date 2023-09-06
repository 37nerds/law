<?php

namespace App\Logic;

class Dump
{
    public static function randomIdFromModel($model): string
    {
        $totalItems = $model::query()->count();
        $ids = collect($model::all())->map(fn($item) => $item->id);
        return $ids->get(fake()->randomNumber(1, $totalItems));
    }
}
