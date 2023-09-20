<?php

namespace App\Http\Middleware;

use App\Models\Permission;
use Closure;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Symfony\Component\HttpFoundation\Response;

class Protect
{
    /**
     * Handle an incoming request.
     *
     * @param Closure(Request): (Response) $next
     */
    public function handle(Request $request, Closure $next): Response
    {
        $path = $request->path();
        $method = $request->method();

        $relativePathPermissionConfig = config("permissions.$path");

        if (!$relativePathPermissionConfig)
            return $next($request);

        if (array_key_exists($method, $relativePathPermissionConfig["methods"]))
            return $next($request);

        $permissionName = $relativePathPermissionConfig["name"];
        $roleId = Auth::user()->role_id;

        $permission = Permission::query()
            ->where("name", "=", $permissionName)
            ->where("method", "=", $method)
            ->where("role_id", "=", $roleId)->first();

        if (!$permission) {
            return \App\Logic\Response::json([
                "message" => "Unauthorized"
            ], 403);
        }

        return $next($request);
    }
}
