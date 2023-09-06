<?php

namespace Database\Seeders;

use App\Logic\SeederTrait;
use App\Models\Client;
use App\Models\Company;
use App\Models\GroupOfCompany;
use App\Models\Unit;
use App\Models\User;
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
        $this->truncate(GroupOfCompany::class, 15);
        $this->truncate(Company::class, 15);
        $this->truncate(Unit::class, 15);
        $this->truncate(Client::class, 50);
    }
}
