<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::table('patients', function (Blueprint $table) {
            $table->unique('hospital_id');
        });

        Schema::table('test_records', function (Blueprint $table) {
            $table->softDeletes();
            $table->foreignUlid('patient_id')
                ->change();
        });

        Schema::table('child_readings', function (Blueprint $table) {
            $table->softDeletes();
        });
    }

    public function down(): void
    {
        Schema::table('patients', function (Blueprint $table) {
            $table->dropUnique(['hospital_id']);
        });

        Schema::table('test_records', function (Blueprint $table) {
            $table->dropSoftDeletes();
        });

        Schema::table('child_readings', function (Blueprint $table) {
            $table->dropSoftDeletes();
        });
    }
};
