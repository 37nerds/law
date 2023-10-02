<?php

namespace App\Http\Middleware;

use App\Models\RBAC\Permission;
use App\Models\RBAC\Resource;
use App\Models\RBAC\Role;
use Closure;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Str;
use Symfony\Component\HttpFoundation\Response;

class Protect
{
    /**
     * Handle an incoming request.
     *
     * @param Closure(Request): (Response) $next
     */
    public function handle(Request $request, Closure $next)
    {
        $role = Role::query()->find(Auth::user()->role_id);
        if ($role->disable) {
            abort(403, "Forbidden !!");
        }

        $path = $request->path();
        $method = Str::lower($request->method());

        $resource = Resource::query()
            ->where("api", "=", $path)
            ->where("method", "=", $method)
            ->first();

        if (!$resource) {
            return $next($request);
        }

        $permission = Permission::query()
            ->where("resource_id", "=", $resource->id)
            ->where("role_id", "=", Auth::user()->role_id)
            ->first();

        if (!$permission) {
            abort(403, "Forbidden");
        }

        return $next($request);
    }
}
