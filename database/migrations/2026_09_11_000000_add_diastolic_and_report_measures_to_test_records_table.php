<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     *
     * Adds the new diastolic-function measures (e_ave, lavi, pulmonary_vein_sd)
     * and report measures (arpht, arvc, nrvc) to the test_records table.
     * The legacy columns (s_lat, aortic_regurg_peak, aortic_regurg_press, mvsp)
     * are kept for backward compatibility but are no longer written to.
     */
    public function up(): void
    {
        Schema::table('test_records', function (Blueprint $table) {
            // Diastolic function
            $table->string('e_ave')->nullable()->after('ivrt');
            $table->string('lavi')->nullable()->after('e_ave');
            $table->string('pulmonary_vein_sd')->nullable()->after('lavi');

            // Doppler / report
            $table->string('arpht')->nullable()->after('mvsp');
            $table->string('arvc')->nullable()->after('arpht');
            $table->string('nrvc')->nullable()->after('arvc');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::table('test_records', function (Blueprint $table) {
            $table->dropColumn(['e_ave', 'lavi', 'pulmonary_vein_sd', 'arpht', 'arvc', 'nrvc']);
        });
    }
};
