<?php

use App\Enums\Table;
use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration {
    public function up(): void
    {
        Schema::create(Table::resources, function (Blueprint $table) {
            $table->uuid("id");
            $table->string("api");
            $table->string("web");
            $table->string("method");
            $table->string("label");
            $table->string("group")->default("Unknown");
            $table->timestamps();
        });
    }

    public function down(): void
    {
        Schema::dropIfExists(Table::resources);
    }
};
