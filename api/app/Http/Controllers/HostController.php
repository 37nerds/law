<?php

namespace App\Http\Controllers;

use App\Helpers\Response;
use App\Http\Requests\UpdateHostRequest;
use App\Http\Resources\RBAC\UserResource;
use App\Models\Host;
use Illuminate\Http\JsonResponse;

class HostController extends Controller
{
    public function index(): JsonResponse
    {
        $hostId = config("host.host_entry_id", "");
        $host = Host::query()->findOrFail($hostId);
        if (!$host) {
            return Response::error(404, "Host entry not found");
        }
        return Response::happy(200, new UserResource($host));
    }

    public function update(UpdateHostRequest $request): JsonResponse
    {
        $hostId = config("host.host_entry_id", "");
        $host = Host::query()->findOrFail($hostId);
        $host->fill($request->all())->save();
        return Response::happy(200, $host);
    }
}
