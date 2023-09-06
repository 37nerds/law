<?php

namespace App\Logic;

use Illuminate\Support\Carbon;

class Date
{
    public static function countDaysFromNow($date): int
    {
        $currentDateTime = Carbon::now();
        $carbonGivenDateTime = Carbon::createFromFormat('Y-m-d H:i:s', $date);
        return $currentDateTime->diffInDays($carbonGivenDateTime);
    }
}
