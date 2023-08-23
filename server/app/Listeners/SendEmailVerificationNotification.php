<?php

namespace App\Listeners;

use Illuminate\Auth\Events\Registered;
use Illuminate\Auth\Listeners\SendEmailVerificationNotification as InternalSendEmailVerificationNotification;
use Illuminate\Contracts\Queue\ShouldQueue;

class SendEmailVerificationNotification
    extends InternalSendEmailVerificationNotification
    implements ShouldQueue
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
    public function handle(Registered $event): void
    {
        parent::handle($event);
    }
}
