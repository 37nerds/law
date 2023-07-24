<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration {
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('group_of_companies', function (Blueprint $table) {
            $table->id();
            $table->string("name");
            $table->text("address");
            $table->string("telephone")->nullable();
            $table->string("mobile")->nullable();
            $table->string("email")->nullable();
            $table->string("website")->nullable();
            $table->text("trade_license_no")->nullable();
            $table->string("tin")->nullable();
            $table->string("bin")->nullable();
            $table->string("incorporation_no")->nullable();
            $table->string("membership_no")->nullable();
            $table->text("member_of_the_association")->nullable();
            $table->string("business_field")->nullable();
            $table->string("legal_form")->nullable();
            $table->text("special_notes")->nullable();
            $table->string("is_active")->default(true);
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('group_of_companies');
    }
};
