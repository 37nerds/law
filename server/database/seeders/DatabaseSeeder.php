<?php

namespace Database\Seeders;

use App\Models\GroupOfCompany;
use App\Models\User;
use App\Traits\SeederTrait;
use Illuminate\Database\Seeder;

class DatabaseSeeder extends Seeder
{
    use SeederTrait;

    /**
     * Seed the application's database.
     */
    public function run(): void
    {
        $this->truncate(User::class, 10);
        $this->truncate(GroupOfCompany::class, 100);
    }
}
