<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
  public function up(): void
{
    Schema::create('payments', function (Blueprint $table) {
        $table->id();
        $table->foreignId('user_id')->constrained()->cascadeOnDelete();
        $table->foreignId('booking_id')->constrained()->cascadeOnDelete();
        $table->string('method'); // visa | wallet
        $table->integer('amount');
        $table->string('currency')->default('EGP');
        $table->string('order_id')->nullable();
        $table->string('transaction_id')->nullable();
        $table->string('status')->default('pending'); // pending | paid | failed
        $table->timestamps();
    });
}


    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('payments');
    }
};
