<?php

namespace Database\Seeders;

use App\Logic\SeederTrait;
use App\Models\Permission;
use App\Models\Resources;
use App\Models\Role;
use App\Models\User;
use Illuminate\Database\Seeder;
use Illuminate\Support\Str;

class RBACSeeder extends Seeder
{
    use SeederTrait;

    public function run(): void
    {

        $superAdmin = Role::query()->create(["name" => "Super Admin",]);
        Role::query()->create(["name" => "Admin",]);
        Role::query()->create(["name" => "Manager",]);
        Role::query()->create(["name" => "User",]);

        $resources = config("resources");

        collect($resources)->each(function ($resource) use ($superAdmin) {
            $re = Resources::query()->create($resource);
            Permission::query()->create(["role_id" => $superAdmin->id, "resource_id" => $re->id]);
        });

        $this->truncate(User::class, 10);

        User::query()->create([
            'name' => "Super User",
            "username" => "@super",
            'email' => "super@l12erp.com",
            "avatar" => "https://advanced-cropper.github.io/react-advanced-cropper/img/images/pexels-photo-3761018.jpeg",
            'email_verified_at' => now(),
            'password' => '$2y$10$92IXUNpkjO0rOQ5byMi.Ye4oKoEa3Ro9llC/.og/at2.uheWG/igi', // password
            'remember_token' => Str::random(10),
            "role_id" => $superAdmin->id,
        ]);
    }
}
