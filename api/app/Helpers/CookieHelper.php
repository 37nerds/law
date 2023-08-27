<?php

namespace App\Helpers;

use Illuminate\Support\Facades\Cookie;

class CookieHelper
{
    public static function removeAllCookieButNotCSRFAndSession(): void
    {
        foreach (Cookie::get() as $key => $item) {
            if ($key !== "XSRF-TOKEN" && $key !== config("session.cookie")) {
                Cookie::queue(Cookie::forget($key));
            }
        }
    }

    public static function removeAllCookie(): void
    {
        foreach (Cookie::get() as $key => $item) {
            Cookie::queue(Cookie::forget($key));
        }
    }
}
