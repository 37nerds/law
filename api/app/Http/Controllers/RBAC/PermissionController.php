<?php

namespace App\Http\Controllers\RBAC;

use App\Exceptions\JsonException;
use App\Helpers\Response;
use App\Http\Controllers\Controller;
use App\Http\Requests\RBAC\CreatePermissionRequest;
use App\Http\Resources\RBAC\PermissionResource;
use App\Models\RBAC\Permission;
use App\Models\RBAC\Resource;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class PermissionController extends Controller
{
    /**
     * @throws JsonException
     */
    public function store(CreatePermissionRequest $request): JsonResponse
    {
        if (Auth::user()->role_id === $request->role_id) {
            throw new JsonException(403, "You can't change your role permission");
        }

        $permission = Permission::create($request->all());

        $resource = Resource::query()->where("id", "=", $request->resource_id)->first();

        collect($resource["dependencies"])->each(function ($dependency) use ($request) {
            $dependencyResource = Resource::query()
                ->where("api", "=", $dependency["api"])
                ->where("method", "=", $dependency["method"])
                ->first();

            $dependencyPermission = Permission::query()
                ->where("role_id", "=", $request->role_id)
                ->where("resource_id", "=", $dependencyResource["id"])
                ->first();

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

    /**
     * @throws JsonException
     */
    public function destroy(Request $request): JsonResponse
    {
        if (Auth::user()->role_id === $request->query("role_id")) {
            throw new JsonException(403, "You can't change your role permission");
        }
        $permissionId = $request->query("id");
        $permission = Permission::query()->findOrFail($permissionId);
        $permission->delete();
        return Response::happy(204);
    }
}
