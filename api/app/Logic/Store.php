<?php

namespace App\Logic;

use App\Models\Settings\Host;

class Store
{
    public static function createInitialHostEntryWithFixID(): Host
    {
        $configAbsolutePath = base_path("config");
        $hostConfig = require_once $configAbsolutePath . "/host.php";
        $hostEntryId = $hostConfig["host_entry_id"];

        $host = new Host();
        $host->id = $hostEntryId;
        $host->save();

        return $host;
    }
}
