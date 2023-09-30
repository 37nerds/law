<?php

namespace App\Http\Controllers\RBAC;

use App\Exceptions\JsonException;
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
use Illuminate\Support\Facades\Auth;

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

        $paginates = Index::paginatedSearchAndSort(
            request: $request,
            query: User::query()->with("role"),
            allowedColumnsForSearch: ["email", "username", "name", "phone", "address"]
        );
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
