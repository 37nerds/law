<?php

namespace Database\Seeders;

use App\Logic\SeederTrait;
use App\Models\Client;
use App\Models\Company;
use App\Models\GroupOfCompany;
use App\Models\Permission;
use App\Models\Role;
use App\Models\Unit;
use App\Models\User;
use Illuminate\Database\Seeder;
use Illuminate\Support\Str;

class DatabaseSeeder extends Seeder
{
    use SeederTrait;

    /**
     * Seed the application's database.
     */
    public function run(): void
    {
        $this->truncate(User::class, 10);
        $this->truncate(GroupOfCompany::class, 15);
        $this->truncate(Company::class, 15);
        $this->truncate(Unit::class, 15);
        $this->truncate(Client::class, 50);

        Role::query()->create([
            "name" => "Admin",
        ]);

        Role::query()->create([
            "name" => "Manager",
        ]);

        Role::query()->create([
            "name" => "Lower",
        ]);

        Role::query()->create([
            "name" => "Foo",
        ]);

        Role::query()->create([
            "name" => "Bar",
        ]);


        Role::query()->create([
            "id" => "79f7c02e-11c0-4085-8f10-cef584b45c64",
            "name" => "user",
        ]);

        User::query()->create([
            "id" => "b9b24344-e97f-48a7-8f0e-af1de38eb380",
            'name' => "Shihab Mahamud",
            "username" => "@shihab",
            'email' => "shihab4t@gmail.com",
            "avatar" => "https://advanced-cropper.github.io/react-advanced-cropper/img/images/pexels-photo-3761018.jpeg",
            'email_verified_at' => now(),
            'password' => '$2y$10$92IXUNpkjO0rOQ5byMi.Ye4oKoEa3Ro9llC/.og/at2.uheWG/igi', // password
            'remember_token' => Str::random(10),
            "role_id" => "79f7c02e-11c0-4085-8f10-cef584b45c64"
        ]);

        Permission::query()->create([
            "role_id" => "79f7c02e-11c0-4085-8f10-cef584b45c64",
            "name" => "clients",
            "method" => "get",
        ]);

        Permission::query()->create([
            "role_id" => "79f7c02e-11c0-4085-8f10-cef584b45c64",
            "name" => "clients",
            "method" => "post",
        ]);
    }
}
