<?php

namespace Database\Factories;

use App\Helpers\Dump;
use App\Models\Company;
use App\Models\Unit;
use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends Factory<Unit>
 */
class UnitFactory extends Factory
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
            'company_id' => Dump::randomIdFromModel(Company::class),
            'address' => fake()->address(),
            'telephone' => fake()->optional()->phoneNumber(),
            'mobile' => fake()->phoneNumber(),
            'email' => fake()->email(),
            'website' => fake()->optional()->url(),
            'trade_license_no' => fake()->text(),
            'tin' => fake()->optional()->text(10),
            'bin' => fake()->optional()->text(10),
            'bida_reg_no' => fake()->optional()->text(10),
            'incorporation_no' => fake()->optional()->text(10),
            'membership_no' => fake()->optional()->text(10),
            'member_of_the_association' => fake()->optional()->text(),
            'business_field' => fake()->optional()->text(),
            'legal_form' => fake()->optional()->text(),
            'contact_person' => fake()->optional()->name(),
            'contact_person_mobile' => fake()->optional()->phoneNumber(),
            'contact_person_email' => fake()->optional()->email(),
        ];
    }
}
