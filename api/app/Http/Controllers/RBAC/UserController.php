<?php

namespace App\Http\Controllers\RBAC;

use App\Exceptions\JsonException;
use App\Helpers\Response;
use App\Http\Controllers\Controller;
use App\Http\Requests\RBAC\CreateUserRequest;
use App\Http\Requests\RBAC\UpdateUserRequest;
use App\Http\Resources\RBAC\UserResource;
use App\Logic\RBAC;
use App\Models\RBAC\User;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class UserController extends Controller
{
    public function index(Request $request): JsonResponse
    {
        $userId = $request->query("id");
        if ($userId) {
            $user = User::query()->findOrFail($userId);
            return Response::happy(200, new UserResource($user));
        }

        $page = $request->query("page", 1);
        $perPage = $request->query("per_page", 10);
        $sortColumn = $request->query("sort_column", "created_at"); // created_at, email, username, name, phone, active, address
        $sortOrder = $request->query("sort_order", "desc"); // "asc", "desc"
        $search = $request->query("search", "");

        $enableColumnForSearch = ["email", "username", "name", "phone", "address"];

        $paginates = User::with("role")
            ->when($search, function ($query) use ($search, $enableColumnForSearch) {
                $query->where(function ($innerQuery) use ($search, $enableColumnForSearch) {
                    foreach ($enableColumnForSearch as $column) {
                        $innerQuery->orWhere($column, 'LIKE', "%$search%");
                    }
                });
            })
            ->orderBy($sortColumn, $sortOrder)
            ->paginate($perPage, ['*'], 'page', $page);

        return Response::happy(200, $paginates);
    }

    public function store(CreateUserRequest $request): JsonResponse
    {
        $user = User::create($request->all());
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
        $userId = $request->query("id");
        $user = User::query()->findOrFail($userId);

        if ($user->id === Auth::id()) {
            return Response::error(400, "You can't delete yourself");
        }

        $user->delete();
        return Response::happy(204);
    }
}
