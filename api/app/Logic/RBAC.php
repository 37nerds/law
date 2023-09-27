<?php

namespace App\Logic;

use App\Exceptions\JsonException;
use App\Models\RBAC\Permission;
use App\Models\RBAC\User;
use Illuminate\Database\Eloquent\Collection;
use Illuminate\Http\Request;

class RBAC
{
    /**
     * @throws JsonException
     */
    public static function updateUser(string $userId, Request $request): User
    {
        $user = User::query()->findOrFail($userId);

        if ($user->username !== $request->username) {
            $temp = User::query()->where("username", "=", $request->username)->first();
            if ($temp) {
                throw new JsonException(
                    400,
                    "Validation error",
                    ["username" => ["This username already taken"]]
                );
            }
        }

        if ($user->email !== $request->email) {
            $temp = User::query()->where("email", "=", $request->email)->first();
            if ($temp) {
                throw new JsonException(
                    400,
                    "Validation error",
                    ["email" => ["This email already taken"]]
                );
            }
        }

        $user->fill($request->all())->save();
        return $user;
    }

    public static function getPermissionWithResource($user): Collection|array
    {
        return Permission::with('resource')
            ->where("role_id", "=", $user->role_id)
            ->get();
    }
}
