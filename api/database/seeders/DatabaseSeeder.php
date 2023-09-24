<?php

namespace Database\Seeders;

use App\Logic\SeederTrait;
use Illuminate\Database\Seeder;

class DatabaseSeeder extends Seeder
{
    use SeederTrait;

    /**
     * Seed the application's database.
     */
    public function run(): void
    {
        $this->call([
            CustomerSeeder::class,
            RBACSeeder::class
        ]);
    }
}
