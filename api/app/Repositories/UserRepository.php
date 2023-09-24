<?php

namespace App\Repositories;

use App\Models\RBAC\User;

class UserRepository
{
    public static function create(array $properties): User
    {
        return User::create([
            "name" => $properties["name"],
            "email" => $properties["email"],
            "username" => $properties["username"],
            "password" => $properties["password"],
            "role_id" => $properties["role_id"] ?? "79f7c02e-11c0-4085-8f10-cef584b45c64"
        ]);
    }

    public static function update(User $user, array $properties): User
    {
        $user->name = $properties["name"] ?? $user->name;
        $user->username = $properties["username"] ?? $user->username;
        $user->email = $properties["email"] ?? $user->email;
        $user->password = $properties["password"] ?? $user->password;
        $user->role_id = $properties["role_id"] ?? $user->role_id;
        $user->avatar = $properties["avatar"] ?? $user->avatar;

        $user->save();

        return $user;
    }

    public static function delete(string $id): User
    {
        $user = User::find($id);
        $user->delete();
        return $user;
    }
}
