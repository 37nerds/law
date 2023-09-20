<?php

namespace App\Http\Controllers\RBAC;

use App\Http\Controllers\Controller;
use App\Http\Requests\Auth\RegisterRequest;
use App\Http\Requests\Auth\UpdateLoggedUserRequest;
use App\Logic\Response;
use App\Models\User;
use App\Repositories\UserRepository;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;

class UserController extends Controller
{
    public function index(Request $request): JsonResponse
    {
        $userId = $request->query("id");

        if ($userId) {
            $user = User::query()->findOrFail($userId);
            return Response::happy(200, $user);

        }

        $searchString = $request->query("q");
        $page = $request->query("page", 1);
        $perPage = $request->query("per_page", 10);

        $paginates = User::paginate(perPage: $perPage, page: $page);

        return Response::happy(200, $paginates);
    }

    public function store(RegisterRequest $request): JsonResponse
    {
        $user = UserRepository::create($request->all());
        return Response::happy(201, $user);
    }

    public function update(UpdateLoggedUserRequest $request): JsonResponse
    {
        $userId = $request->query("id");
        $user = User::query()->findOrFail($userId);
        $user = UserRepository::update($user, $request->all());
        return Response::happy(200, $user);
    }

    public function destroy(UpdateLoggedUserRequest $request): JsonResponse
    {
        $userId = $request->query("id");
        User::query()->findOrFail($userId);
        UserRepository::delete($userId);
        return Response::happy(204);
    }
}
