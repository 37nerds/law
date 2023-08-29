<?php

namespace App\Helpers;

use Illuminate\Http\UploadedFile;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Str;

class X
{
    public static function generateProfilePictureName(UploadedFile $profilePicture): string
    {
        $time = now();
        $name = Auth::user()->name;
        $extension = $profilePicture->getClientOriginalExtension();

        return Str::slug("$time-$name") . ".$extension";
    }
}
