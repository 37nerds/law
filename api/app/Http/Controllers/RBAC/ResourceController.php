<?php

namespace App\Http\Controllers\RBAC;

use App\Http\Controllers\Controller;
use App\Http\Requests\RBAC\CreateResourceRequest;
use App\Http\Requests\RBAC\UpdateResourceRequest;
use App\Http\Resources\RBAC\ResourceResource;
use App\Logic\Response;
use App\Models\RBAC\Resource;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;

class ResourceController extends Controller
{
    public function index(Request $request): JsonResponse
    {
        $resourceId = $request->query("id");
        if ($resourceId) {
            $resource = Resource::query()->findOrFail($resourceId);
            return Response::happy(200, new ResourceResource($resource));
        }

        $page = $request->query("page", 1);
        $perPage = $request->query("per_page", 10);

        $paginates = Resource::paginate(perPage: $perPage, page: $page);

        return Response::happy(200, $paginates);
    }

    public function store(CreateResourceRequest $request): JsonResponse
    {
        $resource = Resource::create($request->all());
        return Response::happy(201, new ResourceResource($resource));
    }

    public function update(UpdateResourceRequest $request): JsonResponse
    {
        $resourceId = $request->query("id");
        $resource = Resource::query()->findOrFail($resourceId);
        $resource->fill($request->all())->save();
        return Response::happy(200, new ResourceResource($resource));
    }

    public function destroy(Request $request): JsonResponse
    {
        $resourceId = $request->query("id");
        $resource = Resource::query()->findOrFail($resourceId);
        $resource->delete();
        return Response::happy(204);
    }
}
