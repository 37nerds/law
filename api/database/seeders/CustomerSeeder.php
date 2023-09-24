<?php

namespace Database\Seeders;

use App\Logic\SeederTrait;
use App\Models\Client;
use App\Models\Company;
use App\Models\GroupOfCompany;
use App\Models\Unit;
use Illuminate\Database\Seeder;

class CustomerSeeder extends Seeder
{
    use SeederTrait;

    public function run(): void
    {
        $this->truncate(GroupOfCompany::class, 15);
        $this->truncate(Company::class, 15);
        $this->truncate(Unit::class, 15);
        $this->truncate(Client::class, 50);
    }
}
