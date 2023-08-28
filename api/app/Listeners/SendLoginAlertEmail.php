<?php

namespace App\Listeners;

use App\Events\TryingLogin;
use Illuminate\Contracts\Queue\ShouldQueue;

class SendLoginAlertEmail implements ShouldQueue
{
    public function __construct()
    {
    }

    public function handle(TryingLogin $tryingLogin): void
    {
    }
}
