<?php

use App\Enums\Status;
use App\Enums\Table;
use App\Models\Customers\Unit;
use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration {
    public function up(): void
    {
        Schema::create(Table::clients, function (Blueprint $table) {
            $table->uuid("id")->primary();
            $table->foreignIdFor(Unit::class, "unit_id");

            $table->timestamps();
            $table->string("status")->default(Status::active);

            $table->string('name');
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
        });
    }

    public function down(): void
    {
        Schema::dropIfExists(Table::clients);
    }
};
