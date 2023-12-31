<?php

namespace App\Http\Controllers\RBAC;

use App\Helpers\Response;
use App\Http\Controllers\Controller;
use App\Http\Requests\RBAC\CreateResourceRequest;
use App\Http\Requests\RBAC\UpdateResourceRequest;
use App\Http\Resources\RBAC\ResourceResource;
use App\Logic\Destroy;
use App\Logic\Index;
use App\Models\RBAC\Resource;
use Illuminate\Contracts\Pagination\LengthAwarePaginator;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;

class ResourceController extends Controller
{
    public function index(Request $request): LengthAwarePaginator|JsonResponse
    {
        $resource = Index::validatedAndFindWithID(
            request: $request,
            query: Resource::query()
        );
        if ($resource) {
            return Response::happy(200, new ResourceResource($resource));
        }

        if (Index::isPaginatedRequest($request)) {
            $resources = Index::paginatedSearchAndSort(
                request: $request,
                query: Resource::query(),
                allowedColumnsForSearch: ['api', 'method', 'label', 'group', "created_at"],
                allowedColumnsForSorting: ['api', 'method', 'label', 'group', "created_at"]
            );
        } else {
            $resources = Resource::query()->get();
        }

        return Response::happy(200, $resources);
    }

    public function store(CreateResourceRequest $request): JsonResponse
    {
        $resource = Resource::query()->create($request->all());
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
        Destroy::destroyFromIdOrIds($request, Resource::query());
        return Response::happy(204);
    }
}
