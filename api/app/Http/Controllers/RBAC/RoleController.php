<?php

namespace App\Http\Controllers\RBAC;

use App\Http\Controllers\Controller;
use App\Http\Requests\RBAC\CreateRoleRequest;
use App\Http\Requests\RBAC\UpdateRoleRequest;
use App\Http\Resources\RBAC\RoleResource;
use App\Logic\Response;
use App\Models\RBAC\Role;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;

class RoleController extends Controller
{
    public function index(Request $request): JsonResponse
    {
        $roleId = $request->query("id");
        if ($roleId) {
            $role = Role::query()->findOrFail($roleId);
            return Response::happy(200, new RoleResource($role));
        }

        $page = $request->query("page", 1);
        $perPage = $request->query("per_page", 10);

        $paginates = Role::paginate(perPage: $perPage, page: $page);

        return Response::happy(200, $paginates);
    }

    public function store(CreateRoleRequest $request): JsonResponse
    {
        $user = Role::create($request->all());
        return Response::happy(201, new RoleResource($user));
    }

    public function update(UpdateRoleRequest $request): JsonResponse
    {
        $roleId = $request->query("id");
        $role = Role::query()->findOrFail($roleId);
        $role->fill($request->all())->save();
        return Response::happy(200, new RoleResource($role));
    }

    public function destroy(Request $request): JsonResponse
    {
        $roleId = $request->query("id");
        $role = Role::query()->findOrFail($roleId);
        $role->delete();
        return Response::happy(204);
    }
}
