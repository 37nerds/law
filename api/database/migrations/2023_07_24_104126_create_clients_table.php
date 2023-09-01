<?php

use App\Models\Unit;
use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration {
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('clients', function (Blueprint $table) {
            $table->uuid("id")->primary();
            $table->string('name');
            $table->foreignIdFor(Unit::class, "unit_id");
            $table->string('client_id')->nullable();
            $table->string('passport_no')->nullable();
            $table->string('passport_issue_date')->nullable();
            $table->string('passport_valid_date')->nullable();
            $table->string('gender')->nullable();
            $table->string('position_hold')->nullable();
            $table->string('mobile');
            $table->string('email');
            $table->string('date_of_birth')->nullable();
            $table->string('nationality')->nullable();
            $table->string('father_name');
            $table->string('mother_name');
            $table->string('tin_no')->nullable();
            $table->date('date_of_joining')->nullable();
            $table->date('current_wp_validity_date')->nullable();
            $table->date('visa_expire_date')->nullable();
            $table->string('max_entry_limit')->nullable();
            $table->text('entry_terms')->nullable();
            $table->text('address')->nullable();
            $table->text('bill_to')->nullable();
            $table->text('notes')->nullable();
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('clients');
    }
};
