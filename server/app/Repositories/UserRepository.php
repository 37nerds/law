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
            "password" => $properties["password"],
            "role" => $properties["role"] ?? "user"
        ]);
    }

    public static function update(int $id, array $properties): User
    {
        $user = User::find($id);

        $user->name ??= $properties["name"];
        $user->email ??= $properties["email"];
        $user->password ??= $properties["password"];
        $user->role ??= $properties["role"];

        $user->save();

        return $user;
    }

    public static function delete(int $id): User
    {
        $user = User::find(1);

        $user->delete();

        return $user;
    }
}
