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
        Schema::create('epizodes', function (Blueprint $table) {
            $table->id();
            $table->foreignId('podcast_id')->constrained('podcasts')->onDelete('cascade');
            $table->string("title");
            $table->dateTime('date');
            $table->string("file");
            $table->string("type");
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('epizodes');
    }
};