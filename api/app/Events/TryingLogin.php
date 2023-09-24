<?php

namespace App\Events;

use App\DTO\Device;
use App\Models\RBAC\User;
use Illuminate\Queue\SerializesModels;

class TryingLogin
{
    use SerializesModels;

    public function __construct(
        public User   $user,
        public Device $device
    )
    {
    }
}
