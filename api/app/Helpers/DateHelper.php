<?php

namespace App\Helpers;

use Illuminate\Support\Carbon;

class DateHelper
{
    public static function countDaysFromNow($date): int
    {
        $currentDateTime = Carbon::now();
        $carbonGivenDateTime = Carbon::createFromFormat('Y-m-d H:i:s', $date);
        return $currentDateTime->diffInDays($carbonGivenDateTime);
    }
}
