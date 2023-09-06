<?php

namespace App\Logic;

use Laravel\Fortify\Rules\Password;

class Rule
{
    public static function passwordRules(): array
    {
        return ['required', 'string', new Password, 'confirmed'];
    }
}
