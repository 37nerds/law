<?php

use App\Enums\Status;
use App\Enums\Table;
use App\Models\Customers\Company;
use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration {
    public function up(): void
    {
        Schema::create(Table::units, function (Blueprint $table) {
            $table->uuid("id")->primary();
            $table->foreignIdFor(Company::class, "company_id");

            $table->timestamps();
            $table->string("status")->default(Status::active);

            $table->string('name');
            $table->text('address');
            $table->string('telephone')->nullable();
            $table->string('mobile');
            $table->string('email');
            $table->string('website')->nullable();
            $table->text('trade_license_no');
            $table->string('tin')->nullable();
            $table->string('bin')->nullable();
            $table->string('bida_reg_no')->nullable();
            $table->string('incorporation_no')->nullable();
            $table->string('membership_no')->nullable();
            $table->text('member_of_the_association')->nullable();
            $table->string('business_field')->nullable();
            $table->string('legal_form')->nullable();
            $table->string('contact_person')->nullable();
            $table->string('contact_person_mobile')->nullable();
            $table->string('contact_person_email')->nullable();
        });
    }

    public function down(): void
    {
        Schema::dropIfExists(Table::units);
    }
};
