<?php

namespace App\Http\Controllers\Settings;

use App\Helpers\Response;
use App\Http\Controllers\Controller;
use App\Http\Requests\Settings\UpdateHostRequest;
use App\Http\Resources\Settings\HostResource;
use App\Models\Settings\Host;
use Illuminate\Http\JsonResponse;

class HostController extends Controller
{
    public function index(): JsonResponse
    {
        $hostId = config("host.host_entry_id", "");
        $host = Host::query()->findOrFail($hostId);
        return Response::happy(200, new HostResource($host));
    }

    public function update(UpdateHostRequest $request): JsonResponse
    {
        $hostId = config("host.host_entry_id", "");
        $host = Host::query()->findOrFail($hostId);
        $host->fill($request->all())->save();
        return Response::happy(200, new HostResource($host));
    }
}
