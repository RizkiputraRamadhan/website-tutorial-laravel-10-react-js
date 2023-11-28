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
        Schema::create('authors', function (Blueprint $table) {
            $table->id();
            $table->string('id_author');
            $table->unsignedBigInteger('user_id');
            $table->string('name');
            $table->string('profil');
            $table->enum('status', ['1','2'])->default('1');
            $table->string('benefit')->nullable();
            $table->string('wa')->nullable();
            $table->string('ig')->nullable();
            $table->string('github')->nullable();
            $table->string('web')->nullable();
            $table->string('linkedin')->nullable();
            $table->string('work_as')->nullable();
            $table->text('comment')->nullable();
            $table->string('dukungan')->nullable();
            $table
                ->foreign('user_id')
                ->references('id')
                ->on('users')
                ->onDelete('cascade');
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('authors');
    }
};
