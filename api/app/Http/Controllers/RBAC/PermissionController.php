<?php

namespace App\Http\Controllers\RBAC;

use App\Http\Controllers\Controller;
use App\Http\Requests\RBAC\CreatePermissionRequest;
use App\Http\Requests\RBAC\UpdatePermissionRequest;
use App\Http\Resources\RBAC\PermissionResource;
use App\Logic\Response;
use App\Models\RBAC\Permission;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;

class PermissionController extends Controller
{
    public function index(Request $request): JsonResponse
    {
        $permissionId = $request->query("id");
        if ($permissionId) {
            $permission = Permission::query()->findOrFail($permissionId);
            return Response::happy(200, new PermissionResource($permission));
        }

        $page = $request->query("page", 1);
        $perPage = $request->query("per_page", 10);

        $paginates = Permission::with("role")->with("resource")->paginate(perPage: $perPage, page: $page);

        return Response::happy(200, $paginates);
    }

    public function store(CreatePermissionRequest $request): JsonResponse
    {
        $permission = Permission::create($request->all());
        return Response::happy(201, new PermissionResource($permission));
    }

    public function update(UpdatePermissionRequest $request): JsonResponse
    {
        $permissionId = $request->query("id");
        $permission = Permission::query()->findOrFail($permissionId);
        $permission->fill($request->all())->save();
        return Response::happy(200, new PermissionResource($permission));
    }

    public function destroy(Request $request): JsonResponse
    {
        $permissionId = $request->query("id");
        $permission = Permission::query()->findOrFail($permissionId);
        $permission->delete();
        return Response::happy(204);
    }
}
