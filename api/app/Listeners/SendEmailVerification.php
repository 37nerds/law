<?php

namespace App\Listeners;

use Illuminate\Auth\Listeners\SendEmailVerificationNotification;
use Illuminate\Contracts\Queue\ShouldQueue;

class SendEmailVerification extends SendEmailVerificationNotification implements ShouldQueue
{
    /**
     * Create the event listener.
     */
    public function __construct()
    {
        //
    }

    /**
     * Handle the event.
     *
     */
    public function handle($event): void
    {
        parent::handle($event);
    }
}
