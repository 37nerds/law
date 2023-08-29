<?php

use App\Models\GroupOfCompany;
use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration {
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('companies', function (Blueprint $table) {
            $table->id();
            $table->string('name');
            $table->foreignIdFor(GroupOfCompany::class, "group_of_company_id");
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
            $table->decimal('authorized_capital', 10)->nullable();
            $table->decimal('paid_up_capital', 10)->nullable();
            $table->string('business_field')->nullable();
            $table->string('legal_form')->nullable();
            $table->string('contact_person')->nullable();
            $table->string('contact_person_mobile')->nullable();
            $table->string('contact_person_email')->nullable();
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('companies');
    }
};