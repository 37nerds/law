<?php

use App\Enums\Table;
use App\Models\RBAC\Role;
use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration {
    public function up(): void
    {
        Schema::create(Table::users, function (Blueprint $table) {
            $table->uuid("id");
            $table->foreignIdFor(Role::class, "role_id");

            $table->timestamp('email_verified_at')->nullable();
            $table->rememberToken();
            $table->timestamps();

            $table->string('email')->unique();
            $table->string("username")->unique();
            $table->string('password');

            $table->string('name')->nullable();
            $table->string("avatar")->nullable();
            $table->string("phone")->nullable();
            $table->boolean("active")->default(true);
            $table->string("address")->nullable();
        });
    }

    public function down(): void
    {
        Schema::dropIfExists(Table::users);
    }
};
