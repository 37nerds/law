<?php

use App\Enums\Table;
use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration {
    public function up(): void
    {
        Schema::create(Table::hosts, function (Blueprint $table) {
            $table->uuid("id");

            $table->timestamps();

            $table->string("name")->nullable();
            $table->string("address")->nullable();
            $table->string("telephone")->nullable();
            $table->string("mobile")->nullable();
            $table->string("email")->nullable();
            $table->string("website")->nullable();
            $table->string("trade_licence_no")->nullable();
            $table->string("tin")->nullable();
            $table->string("bin")->nullable();
            $table->string("professional_licence_no")->nullable();
            $table->string("membership_no")->nullable();
            $table->date("financial_year_start")->nullable();
            $table->string("currency_symbol")->nullable();
            $table->double("tds_rate")->nullable();
            $table->double("vds_rate")->nullable();
            $table->text("payment_terms")->nullable();
            $table->text("declaration")->nullable();
            $table->text("salutation")->nullable();
        });
    }

    public function down(): void
    {
        Schema::dropIfExists(Table::hosts);
    }
};
