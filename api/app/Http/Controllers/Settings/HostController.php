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
        $hostId = "ce35ce26-ea64-4733-bb6b-1edee87c6d32";
        $host = Host::query()->findOrFail($hostId);
        return Response::happy(200, new HostResource($host));
    }

    public function update(UpdateHostRequest $request): JsonResponse
    {
        $hostId = "ce35ce26-ea64-4733-bb6b-1edee87c6d32";
        $host = Host::query()->findOrFail($hostId);
        $host->fill($request->all())->save();
        return Response::happy(200, new HostResource($host));
    }
}
