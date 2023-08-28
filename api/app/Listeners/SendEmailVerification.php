<?php

namespace App\Listeners;

use App\Events\TryingLogin;
use Illuminate\Auth\Events\Registered;
use Illuminate\Contracts\Auth\MustVerifyEmail;
use Illuminate\Contracts\Queue\ShouldQueue;

class SendEmailVerification implements ShouldQueue
{
    public function __construct()
    {
    }

    public function handle(Registered|TryingLogin $event): void
    {
        if ($event->user instanceof MustVerifyEmail && !$event->user->hasVerifiedEmail()) {
            $event->user->sendEmailVerificationNotification();
        }
    }
}
