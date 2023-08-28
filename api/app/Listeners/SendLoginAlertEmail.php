<?php

namespace App\Listeners;

use App\Events\TryingLogin;
use App\Mail\LoginAlert;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Support\Facades\Mail;

class SendLoginAlertEmail implements ShouldQueue
{
    public function __construct()
    {
    }

    public function handle(TryingLogin $tryingLogin): void
    {
        Mail::to($tryingLogin->user->email)
            ->send(new LoginAlert(
                $tryingLogin->user->name,
                $tryingLogin->device->ip,
                $tryingLogin->device->browser,
                $tryingLogin->device->platform,
                $tryingLogin->device->device,
            ));
    }
}
