<?php

use App\Enums\Table;
use App\Models\RBAC\Resource;
use App\Models\RBAC\Role;
use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration {
    public function up(): void
    {
        Schema::create(Table::permissions, function (Blueprint $table) {
            $table->uuid("id");
            $table->foreignIdFor(Role::class, "role_id");
            $table->foreignIdFor(Resource::class, "resource_id");
            $table->timestamps();
        });
    }

    public function down(): void
    {
        Schema::dropIfExists(Table::permissions);
    }
};
