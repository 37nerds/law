<?php

namespace App\Http\Controllers\RBAC;

use App\Helpers\Response;
use App\Http\Controllers\Controller;
use App\Http\Requests\RBAC\CreatePermissionAllRequest;
use App\Http\Requests\RBAC\CreatePermissionRequest;
use App\Http\Resources\RBAC\PermissionResource;
use App\Models\RBAC\Permission;
use App\Models\RBAC\Resource;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;

class PermissionController extends Controller
{
    public function store(CreatePermissionRequest $request): JsonResponse
    {
        $permission = Permission::create($request->all());

        $resource = Resource::query()->where("id", "=", $request->resource_id)->first();

        collect($resource["dependencies"])->each(function ($dependency) use ($request) {
            $dependencyResource = Resource::query()
                ->where("api", "=", $dependency["api"])
                ->where("method", "=", $dependency["method"])
                ->first();

            $dependencyPermission = \App\Logic\Permission::find($request->role_id, $dependencyResource["id"]);
            if ($dependencyPermission) {
                return;
            }

            Permission::create([
                "role_id" => $request->role_id,
                "resource_id" => $dependencyResource["id"]
            ]);
        });


        return Response::happy(201, new PermissionResource($permission));
    }

    public function storeAll(CreatePermissionAllRequest $request): JsonResponse
    {
        $resources = Resource::query()->get();

        collect($resources->each(function (Resource $resource) use ($request) {
            $permission = \App\Logic\Permission::find($request->role_id, $resource->id);
            if ($permission) {
                return;
            }
            Permission::create([
                "role_id" => $request->role_id,
                "resource_id" => $resource->id
            ]);
        }));

        return Response::happy(204);
    }

    public function destroy(Request $request): JsonResponse
    {
        $permissionId = $request->query("id");
        $permission = Permission::query()->findOrFail($permissionId);
        $permission->delete();
        return Response::happy(204);
    }

    public function destroyAll(Request $request): JsonResponse
    {
        $roleId = $request->query("role_id");
        Permission::query()->where("role_id", "=", $roleId)->delete();
        return Response::happy(204);
    }
}
