<?php

namespace App\Helpers;

use Illuminate\Support\Facades\Cookie as CookieFacade;

class Cookie
{
    public static function removeAllCookieButNotCSRFAndSession(): void
    {
        foreach (CookieFacade::get() as $key => $item) {
            if ($key !== "XSRF-TOKEN" && $key !== config("session.cookie")) {
                CookieFacade::queue(CookieFacade::forget($key));
            }
        }
    }

    public static function removeAllCookie(): void
    {
        foreach (CookieFacade::get() as $key => $item) {
            CookieFacade::queue(CookieFacade::forget($key));
        }
    }
}
