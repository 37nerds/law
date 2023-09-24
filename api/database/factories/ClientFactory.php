<?php

namespace Database\Factories;

use App\Logic\Dump;
use App\Models\Customers\Client;
use App\Models\Customers\Unit;
use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends Factory<Client>
 */
class ClientFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        return [
            'name' => fake()->name(),
            'unit_id' => Dump::randomIdFromModel(Unit::class),
            'client_id' => fake()->optional()->uuid(),
            'passport_no' => fake()->randomNumber(),
            'passport_issue_date' => fake()->optional()->date(),
            'passport_valid_date' => fake()->optional()->date(),
            'gender' => fake()->optional()->randomElement(['Male', 'Female']),
            'position_hold' => fake()->optional()->jobTitle(),
            'mobile' => fake()->phoneNumber(),
            'email' => fake()->email(),
            'date_of_birth' => fake()->date(),
            'nationality' => fake()->optional()->country,
            'father_name' => fake()->name(),
            'mother_name' => fake()->name(),
            'tin_no' => fake()->optional()->ean8(),
            'date_of_joining' => fake()->optional()->date(),
            'current_wp_validity_date' => fake()->optional()->date(),
            'visa_expire_date' => fake()->optional()->date(),
            'max_entry_limit' => fake()->optional()->numberBetween(1, 10),
            'entry_terms' => fake()->optional()->paragraph(),
            'address' => fake()->optional()->address(),
            'bill_to' => fake()->optional()->address(),
            'notes' => fake()->optional()->sentence(),
        ];
    }
}
