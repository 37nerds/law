<?php

namespace Database\Seeders;

use App\Logic\SeederTrait;
use App\Models\Customers\Client;
use App\Models\Customers\Company;
use App\Models\Customers\GroupOfCompany;
use App\Models\Customers\Unit;
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
