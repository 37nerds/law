<?php

namespace App\Repositories;

use App\Base\Repository;
use App\Models\User;

class UserRepository implements Repository
{
    public static function create(array $properties): User
    {
        return User::create([
            "name" => $properties["name"],
            "email" => $properties["email"],
            "username" => $properties["username"],
            "password" => $properties["password"],
            "role" => $properties["role"] ?? "user"
        ]);
    }

    public static function update(string $id, array $properties): User
    {
        $user = User::find($id);

        $user->name = $properties["name"] ?? $user->name;
        $user->username = $properties["username"] ?? $user->username;
        $user->email = $properties["email"] ?? $user->email;
        $user->password = $properties["password"] ?? $user->password;
        $user->role = $properties["role"] ?? $user->role;
        $user->avatar = $properties["avatar"] ?? $user->avatar;

        $user->save();

        return $user;
    }

    public static function delete(string $id): User
    {
        $user = User::find(1);

        $user->delete();

        return $user;
    }
}
