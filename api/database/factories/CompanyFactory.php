<?php

namespace Database\Factories;

use App\Logic\Dump;
use App\Models\Customers\Company;
use App\Models\Customers\GroupOfCompany;
use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends Factory<Company>
 */
class CompanyFactory extends Factory
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
            'group_of_company_id' => Dump::randomIdFromModel(GroupOfCompany::class),
            'address' => fake()->address(),
            'telephone' => fake()->optional()->phoneNumber(),
            'mobile' => fake()->phoneNumber(),
            'email' => fake()->email(),
            'website' => fake()->optional()->url(),
            'trade_license_no' => fake()->numerify('############'),
            'tin' => fake()->optional()->numerify('############'),
            'bin' => fake()->optional()->numerify('############'),
            'bida_reg_no' => fake()->optional()->numerify('############'),
            'incorporation_no' => fake()->optional()->numerify('############'),
            'membership_no' => fake()->optional()->numerify('############'),
            'member_of_the_association' => fake()->optional()->word(),
            'authorized_capital' => fake()->optional()->randomFloat(2, 1000, 100000),
            'paid_up_capital' => fake()->optional()->randomFloat(2, 1000, 100000),
            'business_field' => fake()->optional()->word(),
            'legal_form' => fake()->optional()->word(),
            'contact_person' => fake()->optional()->name(),
            'contact_person_mobile' => fake()->optional()->phoneNumber(),
            'contact_person_email' => fake()->optional()->safeEmail(),
        ];
    }
}
