<?php

namespace App\Helpers;

use Illuminate\Support\Carbon;

class Date
{
    public static function countDaysToNow($date): int
    {
        $currentDateTime = Carbon::now();
        $carbonGivenDateTime = Carbon::createFromFormat('Y-m-d H:i:s', $date);
        return $currentDateTime->diffInDays($carbonGivenDateTime);
    }
}
