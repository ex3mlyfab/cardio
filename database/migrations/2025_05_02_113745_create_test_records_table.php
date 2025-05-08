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
        Schema::create('test_records', function (Blueprint $table) {
            $table->id();
            $table->foreignUlid('patient_id')->constrained('patients');
            $table->foreignUlid('user_id')->constrained('users');
            $table->date('test_date');
            $table->string('weight');
            $table->string('height');
            $table->string('bsa');
            $table->string('blood_pressure');
            $table->string('wc_cm')->nullable();
            $table->string('indication');
            //Dimension
            $table->string('aortic_root')->nullable();
            $table->string('la_ap')->nullable();
            $table->string('mv_excursion')->nullable();
            $table->string('ef_slope')->nullable();
            $table->string('epss')->nullable();
            $table->string('rvid')->nullable();
            $table->string('raa')->nullable();
            $table->string('laa')->nullable();
            $table->string('ivsd')->nullable();
            $table->string('lvidd')->nullable();
            $table->string('lvpwd')->nullable();
            $table->string('ivss')->nullable();
            $table->string('lvids')->nullable();
            $table->string('lvpws')->nullable();
            $table->string('fs')->nullable();
            $table->string('ef')->nullable();
            //diastolic function
            $table->string('e_wave')->nullable();
            $table->string('a_wave')->nullable();
            $table->string('e_a')->nullable();
            $table->string('e_wave_dt')->nullable();
            $table->string('e_lat')->nullable();
            $table->string('a_lat')->nullable();
            $table->string('s_lat')->nullable();
            $table->string('e_e')->nullable();
            $table->string('ivrt')->nullable();

            //doppler measurements
            $table->string('aortic_valve_peak')->nullable();
            $table->string('aortic_valve_press')->nullable();
            $table->string('pulmonary_valve_press')->nullable();
            $table->string('pulmonary_valve_peak')->nullable();
            $table->string('triscupid_regurg_peak')->nullable();
            $table->string('triscupid_regurg_press')->nullable();
            $table->string('mitral_regurg_peak')->nullable();
            $table->string('mitral_regurg_press')->nullable();
            $table->string('aortic_regurg_peak')->nullable();
            $table->string('aortic_regurg_press')->nullable();
            $table->string('mitral_stenosis')->nullable();
            $table->string('inferior_vena_cava_insp')->nullable();
            $table->string('inferior_vena_cava_expi')->nullable();
            $table->string('inferior_vena_cava_diam')->nullable();
            $table->string('est_right')->nullable();
            $table->string('pericardium')->nullable();
            $table->string('summary')->nullable();
            $table->string('conclusion')->nullable();
            $table->string('sign')->nullable();

            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('test_records');
    }
};
