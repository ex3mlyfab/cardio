<?php

use App\Http\Controllers\Auth\AuthenticatedSessionController;
use App\Http\Controllers\DashboardController;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

Route::get('/',  [AuthenticatedSessionController::class, 'create'])->name('home');

Route::middleware(['auth', 'verified'])->group(function () {
    Route::get('dashboard',[DashboardController::class, 'index'])->name('dashboard');
    Route::group(['prefix'=>'patients'],function(){
        Route::get('/', [\App\Http\Controllers\PatientController::class,'index'])->name('patients.index');
        Route::get('create',[\App\Http\Controllers\PatientController::class,'create'])->name('patients.create');
        Route::post('store',[\App\Http\Controllers\PatientController::class,'store'])->name('patients.store');
        Route::get('{patient}',[\App\Http\Controllers\PatientController::class,'show'])->name('patients.show');
        Route::get('/showTest/{testRecord}',[\App\Http\Controllers\PatientController::class,'showTest'])->name('patients.showTest');
        Route::get('{patient}/edit',[\App\Http\Controllers\PatientController::class,'edit'])->name('patients.edit');
        Route::put('{patient}',[\App\Http\Controllers\PatientController::class,'update'])->name('patients.update');
        Route::delete('{patient}',[\App\Http\Controllers\PatientController::class,'destroy'])->name('patients.destroy');
        Route::get('{patient}/search', [\App\Http\Controllers\PatientController::class, 'searchPatient'])->name('patients.search');
        Route::get('/updateTest/{testRecord}/tests', [\App\Http\Controllers\PatientController::class,'editTestRecord'])->name('patients.editTest');
        Route::put('/updateTest/{testRecord}/tests', [\App\Http\Controllers\PatientController::class,'updateTestRecord'])->name('patients.updateTest');

    });
});

require __DIR__.'/settings.php';
require __DIR__.'/auth.php';
