<?php

namespace App\DTO;

use Jenssegers\Agent\Agent;

class Device
{
    public string $browser;
    public string $platform;
    public string $device;

    public function __construct(
        public string $ip
    )
    {
        $agent = new Agent();

        $browser = $agent->browser();
        $platform = $agent->platform();

        $this->browser = "$browser - {$agent->version($browser)}";
        $this->platform = "$platform - {$agent->version($platform)}";

        $this->device = $agent->device();
    }
}
