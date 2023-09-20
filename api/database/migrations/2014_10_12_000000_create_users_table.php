<?php

use App\Enums\Table;
use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration {
    public function up(): void
    {
        Schema::create(Table::users, function (Blueprint $table) {
            $table->uuid("id");
            $table->string("username")->unique();
            $table->string('email')->unique();
            $table->string('name')->nullable();
            $table->string("avatar")->nullable();
            $table->timestamp('email_verified_at')->nullable();
            $table->string('password');
            $table->string("role_id")->default("79f7c02e-11c0-4085-8f10-cef584b45c64");
            $table->rememberToken();
            $table->timestamps();
        });
    }

    public function down(): void
    {
        Schema::dropIfExists(Table::users);
    }
};
