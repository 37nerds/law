<?php

namespace App\Logic;

use App\Models\Settings\Host;

use function Laravel\Prompts\error;

class Store
{
    public static function createInitialHostEntryWithFixID(): Host
    {
        // $configAbsolutePath = base_path("config");
        // $hostConfig = require_once $configAbsolutePath . "/host.php";
        // $hostEntryId = $hostConfig["host_entry_id"];

        $hostEntryId = "ce35ce26-ea64-4733-bb6b-1edee87c6d32";

        $host = new Host();
        $host->id = $hostEntryId;
        $host->save();

        return $host;
    }
}
