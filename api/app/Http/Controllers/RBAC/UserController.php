<?php

namespace App\Http\Controllers\RBAC;

use App\Exceptions\JsonException;
use App\Helpers\ArrayH;
use App\Helpers\Response;
use App\Http\Controllers\Controller;
use App\Http\Requests\RBAC\CreateUserRequest;
use App\Http\Requests\RBAC\UpdateUserRequest;
use App\Http\Resources\RBAC\UserResource;
use App\Logic\Index;
use App\Logic\RBAC;
use App\Models\RBAC\User;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Log;

class UserController extends Controller
{
    public function index(Request $request): JsonResponse
    {
        $user = Index::validatedAndFindWithID(
            request: $request,
            query: User::query()
        );
        if ($user) {
            return Response::happy(200, new UserResource($user));
        }

        $query = User::query()->with("role");

        $validated = $request->validate([
           "filter_role_id" => ["nullable", "string"]
        ]);
        if (ArrayH::isIn($validated, "filter_role_id") && $validated["filter_role_id"] ) {
            $query = $query->where("role_id", "=", $validated["filter_role_id"]);
        }

        $paginates = Index::paginatedSearchAndSort(
            request: $request,
            query: $query,
            allowedColumnsForSearch: ["email", "username", "name", "phone", "address"],
            allowedColumnsForSorting: ["created_at", "email", "username", "name", "phone", "active", "address"]
        );
        return Response::happy(200, $paginates);
    }

    public function store(CreateUserRequest $request): JsonResponse
    {
        $user = User::query()->create($request->all());
        return Response::happy(201, new UserResource($user));
    }

    public function update(UpdateUserRequest $request): JsonResponse
    {
        try {
            $user = RBAC::updateUser($request->query("id"), $request);
        } catch (JsonException $exception) {
            return $exception->response();
        }
        return Response::happy(200, new UserResource($user));
    }

    public function destroy(Request $request): JsonResponse
    {
        $validated = $request->validate([
            "id" => ["nullable", "string"],
            "ids" => ["nullable", "array"]
        ]);
        if (ArrayH::isIn($validated, "id")) {
           User::query()->findOrFail($validated["id"])->delete();
        }
        else if (ArrayH::isIn($validated, "ids")) {
            collect($validated["ids"])->each(function (string $id) {
                Log::info($id);
                User::query()->findOrFail($id)->delete();
            });
        }
        return Response::happy(204);
    }
}
