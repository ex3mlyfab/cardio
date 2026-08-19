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
        Schema::create('child_readings', function (Blueprint $table) {
            $table->id();
           $table->foreignUlid('patient_id')->constrained('patients');
            $table->foreignUlid('user_id')->constrained('users');
            $table->date('test_date');
             $table->string('weight');
            $table->string('height');
            $table->string('bsa');
            $table->string('blood_pressure')->nullable();
            $table->string('wc_cm')->nullable();
             $table->string('referring_hospital')->nullable();
            $table->string('indication')->nullable();
            $table->string('heart_rate')->nullable();
            $table->string('spo2')->nullable();
            //2D summary
            $table->string('abdominal_situs')->nullable();
            $table->string('cardiac_position')->nullable();
            $table->string('systemic_venous_drainage')->nullable();
            $table->string('pulmonary_venous_drainage')->nullable();
            $table->string('atrio_ventricular_connection')->nullable();
            $table->string('ventricular_arterial_connection')->nullable();
            $table->string('ventricular_loop')->nullable();
            //Atria
            $table->string('left_atrium')->nullable();
            $table->string('right_atrium')->nullable();
            //atrioventricular valves
            $table->string('mitral_av')->nullable();
            $table->string('tricuspid')->nullable();
            //ventricles
            $table->string('left_ventricle')->nullable();
            $table->string('right_ventricle')->nullable();
            //Septae
            $table->string('interatrial_septum')->nullable();
            $table->string('interventricular_septum')->nullable();
            //Semilunar valves
            $table->string('aortic_arteries')->nullable();
            $table->string('pulmonary_arteries')->nullable();
            //Great arteries


            $table->text('outflow_tract')->nullable();
            $table->text('arch')->nullable();
            $table->text('pda')->nullable();
            $table->text('corona_arteries')->nullable();
            $table->text('pulmonary')->nullable();
            $table->text('pulmonary_artery')->nullable();
            $table->text('pulmonary_valve')->nullable();
            $table->text('aortic_valve')->nullable();
            $table->text('aorta')->nullable();

            //Doppler measurements
            $table->string('mitral')->nullable();
            $table->string('aortic')->nullable();
            $table->string('triscupid_doppler')->nullable();
            $table->string('pulmonary_doppler')->nullable();
            //M-Mode
            $table->string('ao')->nullable();
            $table->string('lvidd')->nullable();
            $table->string('ivsd')->nullable();
            $table->string('edv')->nullable();
            $table->string('la_ao')->nullable();
            $table->string('la')->nullable();
            $table->string('lvids')->nullable();
            $table->string('pwd')->nullable();
            $table->string('esv')->nullable();
            $table->string('ef')->nullable();
            $table->string('fs')->nullable();
            $table->string('cardiac_output')->nullable();
            $table->string('cardiac_index')->nullable();
            //additional Information
            $table->mediumText('summary')->nullable();
            $table->mediumText('additional_info')->nullable();
            $table->mediumText('doctor_name')->nullable();
            $table->mediumText('recommendations')->nullable();
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('child_reading');
    }
};
