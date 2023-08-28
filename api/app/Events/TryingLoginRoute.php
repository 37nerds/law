<?php

namespace App\Events;

use App\Models\User;
use Illuminate\Queue\SerializesModels;

class TryingLoginRoute
{
    use SerializesModels;

    /**
     * Create a new event instance.
     */
    public function __construct(
        public User $user
    )
    {
    }
}
