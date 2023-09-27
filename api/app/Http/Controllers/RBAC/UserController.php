<?php

namespace App\Http\Controllers\RBAC;

use App\Http\Controllers\Controller;
use App\Http\Requests\RBAC\CreateUserRequest;
use App\Http\Requests\RBAC\UpdateUserRequest;
use App\Http\Resources\RBAC\UserResource;
use App\Logic\Response;
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

        $paginates = User::with("role")->paginate(perPage: $perPage, page: $page);
        return Response::happy(200, $paginates);
    }

    public function store(CreateUserRequest $request): JsonResponse
    {
        $user = User::create($request->all());
        return Response::happy(201, new UserResource($user));
    }

    public function update(UpdateUserRequest $request): JsonResponse
    {
        $userId = $request->query("id");
        $user = User::query()->findOrFail($userId);

        if ($user->username !== $request->username) {
            $temp = User::query()->where("username", "=", $request->username)->first();
            if ($temp) {
                return Response::error(400, "Validation error", [
                    "errors" => [
                        "username" => ["This username already taken"]
                    ]
                ]);
            }
        }

        if ($user->email !== $request->email) {
            $temp = User::query()->where("email", "=", $request->email)->first();
            if ($temp) {
                return Response::error(400, "Validation error", [
                    "errors" => ["email" => ["This email already taken"]]
                ]);
            }
        }

        $user->fill($request->all())->save();
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
