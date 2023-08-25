<?php

namespace Tests\Feature;

use Illuminate\Foundation\Testing\RefreshDatabase;
use Illuminate\Foundation\Testing\WithFaker;
use Illuminate\Foundation\Testing\DatabaseMigrations;
use Tests\TestCase;

class GroupOfCompanyTest extends TestCase
{
    use RefreshDatabase, WithFaker, DatabaseMigrations;

    /**
     * Test store a new GroupOfCompany.
     *
     * @return void
     */
    public function testStoreGroupOfCompany()
    {
        // Test Case 1: Valid Data - All Fields Provided
        $data = [
            'name' => $this->faker->company,
            'address' => $this->faker->address,
            'telephone' => $this->faker->phoneNumber,
            'mobile' => $this->faker->phoneNumber,
            'email' => $this->faker->unique()->safeEmail,
            'website' => $this->faker->optional()->url,
            'trade_license_no' => $this->faker->text,
            'tin' => $this->faker->optional()->numerify('##########'),
            'bin' => $this->faker->optional()->numerify('##########'),
            'incorporation_no' => $this->faker->optional()->text,
            'membership_no' => $this->faker->optional()->numerify('##########'),
            'member_of_the_association' => $this->faker->optional()->text,
            'business_field' => $this->faker->optional()->word,
            'legal_form' => $this->faker->optional()->word,
            'special_notes' => $this->faker->optional()->paragraph,
            'is_active' => true,
        ];

        // Send a POST request with valid data
        $response = $this->post('/api/v1/group-of-companies', $data,["Accept" => "application/json"]);

        // Assert success response and database record creation
        $response->assertStatus(201);
        $this->assertDatabaseHas('group_of_companies', $data);

        // Test Case 2: Missing Required Fields
        $missingFieldsData = collect($data)->except(['name', 'address', 'mobile', 'email', 'trade_license_no'])->all();
        $response = $this->post('/api/v1/group-of-companies', $missingFieldsData, ["Accept" => "application/json"]);

        // Assert validation failure due to missing required fields
        $response->assertStatus(422);
        $response->assertJsonValidationErrors(['name', 'address', 'mobile', 'email', 'trade_license_no']);

        // Test Case 3: Invalid Email Format
        $invalidEmailData = array_merge($data, ['email' => 'invalid_email']);
        $response = $this->post('/api/v1/group-of-companies', $invalidEmailData, ["Accept" => "application/json"]);

        // Assert validation failure due to invalid email format
        $response->assertStatus(422);
        $response->assertJsonValidationErrors(['email']);

        // Add more test cases for other validation rules if necessary...

        // Test Case N: Any other failure cases you want to cover
        // ...

        // Test Case N+1: Unique Email Constraint (assuming the first data has already been stored)
        $response = $this->post('/api/v1/group-of-companies', $data, ["Accept" => "application/json"]);

        // Assert validation failure due to unique email constraint
        $response->assertStatus(422);
        $response->assertJsonValidationErrors(['email']);
    }
}
