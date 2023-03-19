<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration {
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::dropIfExists('open_banking');
        Schema::create('open_banking', function (Blueprint $table) {
            $table->uuid('id')->primary();
            $table->string('name')->nullable();
            $table->string('country')->nullable();
            $table->string('currency')->nullable();
            $table->string('bank_id')->nullable();
            $table->string('iban')->nullable();
            $table->string('bank_name')->nullable();
            $table->string('bank_logo')->nullable();
            $table->string('payments_available')->nullable();
            $table->string('account_id')->nullable();
            $table->string('requisition_id')->nullable();
            $table->string('requisition_status')->nullable();
            $table->string('connected_account_id')->nullable();
            $table->timestamp('connection_valid_until')->nullable();
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('open_banking');
    }
};
