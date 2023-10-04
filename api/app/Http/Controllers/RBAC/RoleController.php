<?php

namespace App\Http\Controllers\RBAC;

use App\Helpers\Response;
use App\Http\Controllers\Controller;
use App\Http\Requests\RBAC\CreateRoleRequest;
use App\Http\Requests\RBAC\UpdateRoleRequest;
use App\Http\Resources\RBAC\RoleResource;
use App\Logic\Destroy;
use App\Logic\Index;
use App\Models\RBAC\Role;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;

class RoleController extends Controller
{
    public function index(Request $request): JsonResponse
    {
        $role = Index::validatedAndFindWithID(
            request: $request,
            query: Role::query()
        );
        if ($role) {
            return Response::happy(200, new RoleResource($role));
        }

        $query = Role::query()->with("permissions");
        if (Index::isPaginatedRequest($request)) {
            $roles = Index::paginatedSearchAndSort(
                request: $request,
                query: $query,
                allowedColumnsForSearch: ["name"],
                allowedColumnsForSorting: ["name", "disable"]
            );
        } else {
            $roles = $query->get();
        }

        return Response::happy(200, $roles);
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

        if ($role->name !== $request->name) {
            $temp = Role::query()->where("name", "=", $request->name)->first();
            if ($temp) {
                return Response::json([
                    "message" => "Validation error",
                    "errors" => [
                        "name" => ["This name already taken"]
                    ]
                ], 400);
            }
        }

        $role->fill($request->all())->save();
        return Response::happy(200, new RoleResource($role));
    }

    public function destroy(Request $request): JsonResponse
    {
        Destroy::destroyFromIdOrIds($request, Role::query());
        return Response::happy(204);
    }
}
