<?php

namespace App\Http\Controllers\RBAC;

use App\Http\Controllers\Controller;
use App\Logic\Response;
use App\Models\Role;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;

class RoleController extends Controller
{
    public function index(Request $request): JsonResponse
    {
        $page = $request->query("page", 1);
        $perPage = $request->query("per_page", 10);

        $paginates = Role::paginate(perPage: $perPage, page: $page);

        return Response::happy(200, $paginates);
    }
}
