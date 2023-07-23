<?php

namespace Database\Factories;

use App\Models\GroupOfCompany;
use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends Factory<GroupOfCompany>
 */
class GroupOfCompanyFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        return [
            'name' => fake()->company(),
            'address' => fake()->address(),
            'telephone' => fake()->phoneNumber(),
            'mobile' => fake()->phoneNumber(),
            'email' => fake()->unique()->safeEmail(),
            'website' => fake()->optional()->url(),
            'trade_license_no' => fake()->text(),
            'tin' => fake()->optional()->numerify('##########'),
            'bin' => fake()->optional()->numerify('##########'),
            'incorporation_no' => fake()->optional()->text(),
            'membership_no' => fake()->optional()->numerify('##########'),
            'member_of_the_association' => fake()->optional()->text(),
            'business_field' => fake()->optional()->word(),
            'legal_form' => fake()->optional()->word(),
            'special_notes' => fake()->optional()->paragraph(),
        ];
    }
}
