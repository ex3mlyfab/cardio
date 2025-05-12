<?php

namespace App\Http\Controllers;

use App\Models\Patient;
use App\Models\TestRecord;
use Illuminate\Http\Request;
use Inertia\Inertia;

class PatientController extends Controller
{
    public function index()
    {
        $query = TestRecord::with('patient')
            ->orderBy('created_at', 'desc');
        if(request()->has('search')){

        }
        $tests = $query->paginate(10);
        return Inertia::render('patients/index', [
            'tests' => $tests,
            'filters' => [
                'search' => request('search', ''),
                'filter' => request('filter', 'all')
            ],
            'flash' => [
                'success' => session('success'),
                'error' => session('error')
            ]
        ]);
    }
    public function listTests()
    {
        
    }
    public function create()
    {
        return Inertia::render('patients/create');
    }

    public function searchPatient()
    {
        $patientFound = Patient::where('hospital_id', request('search_id'))->get();
        return $patientFound;
    }

    public function store(Request $request)
    {
        // Assuming user_id will be set automatically, e.g., auth()->id()
        $validated = $request->validate([
            'hospital_id' => 'required|string|max:255',
            'surname' => 'required|string|max:255',
            'other_names' => 'required|string|max:255',
            'date_of_birth' => 'required|date',
            'gender' => 'required|string|max:255', // Assuming gender is a string
            'nicl' => 'required|string|max:255', // Assuming nicl is a string
            'test_date' => 'required|date',
            'weight' => 'required|numeric|max:255', // Consider 'numeric' if applicable
            'height' => 'required|numeric|max:255', // Consider 'numeric' if applicable
            'bsa' => 'required|numeric|max:255', // Consider 'numeric' if applicable
            'blood_pressure' => 'required|numeric|max:255',
            'wc_cm' => 'nullable|numeric|max:255', // Consider 'numeric' if applicable
            'indication' => 'required|string|max:255',
            // Dimension
            'aortic_root' => 'nullable|numeric|max:255', // Consider 'numeric' if applicable
            'la_ap' => 'nullable|numeric|max:255', // Consider 'numeric' if applicable
            'mv_excursion' => 'nullable|numeric|max:255', // Consider 'numeric' if applicable
            'ef_slope' => 'nullable|numeric|max:255', // Consider 'numeric' if applicable
            'epss' => 'nullable|numeric|max:255', // Consider 'numeric' if applicable
            'rvid' => 'nullable|numeric|max:255', // Consider 'numeric' if applicable
            'raa' => 'nullable|numeric|max:255', // Consider 'numeric' if applicable
            'laa' => 'nullable|numeric|max:255', // Consider 'numeric' if applicable
            'ivsd' => 'nullable|numeric|max:255', // Consider 'numeric' if applicable
            'lvidd' => 'nullable|numeric|max:255', // Consider 'numeric' if applicable
            'lvpwd' => 'nullable|numeric|max:255', // Consider 'numeric' if applicable
            'ivss' => 'nullable|numeric|max:255', // Consider 'numeric' if applicable
            'lvids' => 'nullable|numeric|max:255', // Consider 'numeric' if applicable
            'lvpws' => 'nullable|numeric|max:255', // Consider 'numeric' if applicable
            'fs' => 'nullable|numeric|max:255', // Consider 'numeric' if applicable
            'ef' => 'nullable|numeric|max:255', // Consider 'numeric' if applicable
            // Diastolic function
            'e_wave' => 'nullable|numeric|max:255', // Consider 'numeric' if applicable
            'a_wave' => 'nullable|numeric|max:255', // Consider 'numeric' if applicable
            'e_a' => 'nullable|numeric|max:255', // Consider 'numeric' if applicable
            'e_wave_dt' => 'nullable|numeric|max:255', // Consider 'numeric' if applicable
            'e_lat' => 'nullable|numeric|max:255', // Consider 'numeric' if applicable
            'a_lat' => 'nullable|numeric|max:255', // Consider 'numeric' if applicable
            's_lat' => 'nullable|numeric|max:255', // Consider 'numeric' if applicable
            'e_e' => 'nullable|numeric|max:255', // Consider 'numeric' if applicable
            'ivrt' => 'nullable|numeric|max:255', // Consider 'numeric' if applicable
            // Doppler measurements
            'aortic_valve_peak' => 'nullable|numeric|max:255', // Consider 'numeric' if applicable
            'aortic_valve_press' => 'nullable|numeric|max:255', // Consider 'numeric' if applicable
            'pulmonary_valve_press' => 'nullable|numeric|max:255', // Consider 'numeric' if applicable
            'pulmonary_valve_peak' => 'nullable|numeric|max:255', // Consider 'numeric' if applicable
            'triscupid_regurg_peak' => 'nullable|numeric|max:255', // Consider 'numeric' if applicable
            'triscupid_regurg_press' => 'nullable|numeric|max:255', // Consider 'numeric' if applicable
            'mitral_regurg_peak' => 'nullable|numeric|max:255', // Consider 'numeric' if applicable
            'mitral_regurg_press' => 'nullable|numeric|max:255', // Consider 'numeric' if applicable
            'aortic_regurg_peak' => 'nullable|numeric|max:255', // Consider 'numeric' if applicable
            'aortic_regurg_press' => 'nullable|numeric|max:255', // Consider 'numeric' if applicable
            'mitral_stenosis' => 'nullable|numeric|max:255', // Consider 'numeric' if applicable
            'inferior_vena_cava_insp' => 'nullable|numeric|max:255', // Consider 'numeric' if applicable
            'inferior_vena_cava_expi' => 'nullable|numeric|max:255', // Consider 'numeric' if applicable
            'inferior_vena_cava_diam' => 'nullable|numeric|max:255', // Consider 'numeric' if applicable
            'est_right' => 'nullable|numeric|max:255',
            'pericardium' => 'nullable|numeric|max:255',
            'summary' => 'nullable|string', // Text fields might not need max length
            'conclusion' => 'nullable|string', // Text fields might not need max length
            'sign' => 'nullable|string|max:255',
        ]);
        $patient = Patient::firstOrCreate([
            'hospital_id' => $validated['hospital_id'],
            'surname' => $validated['surname'],
            'other_names' => $validated['other_names'],
            'date_of_birth' => $validated['date_of_birth'],
            'gender' => $validated['gender'],
            'nicl' => $validated['nicl'],
        ]);
        $testRecord = TestRecord::create([
            'patient_id' => $patient->id,
            'user_id' => auth()->id(),
            'test_date' => $validated['test_date'],
            'weight' => $validated['weight'],
            'height' => $validated['height'],
            'bsa' => $validated['bsa'],
            'blood_pressure' => $validated['blood_pressure'],
            'wc_cm' => $validated['wc_cm'],
            'indication' => $validated['indication'],
            // Dimension
            'aortic_root' => $validated['aortic_root'],
            'la_ap' => $validated['la_ap'], // Consider 'numeric' if applicable
            'mv_excursion' => $validated['mv_excursion'], // Consider 'numeric' if applicable
            'ef_slope' => $validated['ef_slope'], // Consider 'numeric' if applicable
            'epss' => $validated['epss'], // Consider 'numeric' if applicable
            'rvid' => $validated['rvid'], // Consider 'numeric' if applicable
            'raa' => $validated['raa'], // Consider 'numeric' if applicable
            'laa' => $validated['laa'], // Consider 'numeric' if applicable
            'ivsd' => $validated['ivsd'], // Consider 'numeric' if applicable
            'lvidd' => $validated['lvidd'], // Consider 'numeric' if applicable
            'lvpwd' => $validated['lvpwd'], // Consider 'numeric' if applicable
            'ivss' => $validated['ivss'], // Consider 'numeric' if applicable
            'lvids' => $validated['lvids'], // Consider 'numeric' if applicable
             'lvpws' => $validated['lvpws'], // Consider 'numeric' if applicable
            'fs' => $validated['fs'], // Consider 'numeric' if applicable
            'ef' => $validated['ef'], // Consider 'numeric' if applicable
            // Diastolic function
            'e_wave' => $validated['e_wave'], // Consider 'numeric' if applicable
            'a_wave' => $validated['a_wave'], // Consider 'numeric' if applicable
            'e_a' => $validated['e_a'], // Consider 'numeric' if applicable
            'e_wave_dt' => $validated['e_wave_dt'], // Consider 'numeric' if applicable
            'e_lat' => $validated['e_lat'], // Consider 'numeric' if applicable
            'a_lat' => $validated['a_lat'], // Consider 'numeric' if applicable
           's_lat' => $validated['s_lat'], // Consider 'numeric' if applicable
            'e_e' => $validated['e_e'], // Consider 'numeric' if applicable
            'ivrt' => $validated['ivrt'], // Consider 'numeric' if applicable
            // Doppler measurements
            'aortic_valve_peak' => $validated['aortic_valve_peak'], // Consider 'numeric' if applicable
            'aortic_valve_press' => $validated['aortic_valve_press'], // Consider 'numeric' if applicable
            'pulmonary_valve_press' => $validated['pulmonary_valve_press'], // Consider 'numeric' if applicable
            'pulmonary_valve_peak' => $validated['pulmonary_valve_peak'], // Consider 'numeric' if applicable
            'triscupid_regurg_peak' => $validated['triscupid_regurg_peak'], // Consider 'numeric' if applicable
            'triscupid_regurg_press' => $validated['triscupid_regurg_press'], // Consider 'numeric' if applicable
           'mitral_regurg_peak' => $validated['mitral_regurg_peak'], // Consider 'numeric' if applicable
           'mitral_regurg_press' => $validated['mitral_regurg_press'], // Consider 'numeric' if applicable
            'aortic_regurg_peak' => $validated['aortic_regurg_peak'], // Consider 'numeric' if applicable
            'aortic_regurg_press' => $validated['aortic_regurg_press'], // Consider 'numeric' if applicable
          'mitral_stenosis' => $validated['mitral_stenosis'], // Consider 'numeric' if applicable
            'inferior_vena_cava_insp' => $validated['inferior_vena_cava_insp'], // Consider 'numeric' if applicable
            'inferior_vena_cava_expi' => $validated['inferior_vena_cava_expi'], // Consider 'numeric' if applicable
            'inferior_vena_cava_diam' => $validated['inferior_vena_cava_diam'], // Consider 'numeric' if applicable
            'est_right' => $validated['est_right'],
            'pericardium' => $validated['pericardium'],
            'summary' => $validated['summary'],
            'conclusion' => $validated['conclusion'],
            'sign' => $validated['sign'],
        ]);
        // Add logic to create the TestRecord using $validated data + user_id
        // e.g., TestRecord::create(array_merge($validated, ['user_id' => auth()->id()]));

        // Redirect or return response
        return response(['success' => 'Test record created successfully',
        'testRecord' => $testRecord,]);
    }
    public function show(Patient $patient)
    {
        return Inertia::render('patients/show', [
            'patient' => $patient,
            'tests' => $patient->testRecords()->paginate(10),
        ]);
    }

    public function showTest(TestRecord $testRecord)
    {
        return Inertia::render('patients/showTest', [
            'data' => $testRecord,
        ]);
    }
    Public function edit(Patient $patient)
    {
        return Inertia::render('patients/edit', [
            'patient' => $patient,
        ]);
    }
    public function editTestRecord(TestRecord $testRecord)
    {
        return Inertia::render('patients/editTestRecord', [
            'data' => $testRecord,
        ]);
    }
    public function updateTestRecord(Request $request, TestRecord $testRecord)
    {
        $validated = $request->validate([
            'test_date' => 'required|date',
            'weight' => 'required|numeric',
            'height' => 'required|numeric',
            'bsa' => 'required|numeric',
            'blood_pressure' => 'required|string|max:255',
            'wc_cm' => 'nullable|numeric',
            'indication' => 'required|string|max:255',
            // Dimension
            'aortic_root' => 'nullable|numeric',
            'la_ap' => 'nullable|numeric',
            'mv_excursion' => 'nullable|numeric',
            'ef_slope' => 'nullable|numeric',
            'epss' => 'nullable|numeric',
            'rvid' => 'nullable|numeric',
            'raa' => 'nullable|numeric',
            'laa' => 'nullable|numeric',
            'ivsd' => 'nullable|numeric',
            'lvidd' => 'nullable|numeric',
            'lvpwd' => 'nullable|numeric',
            'ivss' => 'nullable|numeric',
            'lvids' => 'nullable|numeric',
            'lvpws' => 'nullable|numeric',
            'fs' => 'nullable|numeric',
            'ef' => 'nullable|numeric',
            // Diastolic function
            'e_wave' => 'nullable|numeric',
            'a_wave' => 'nullable|numeric',
            'e_a' => 'nullable|numeric',
            'e_wave_dt' => 'nullable|numeric',
            'e_lat' => 'nullable|numeric',
            'a_lat' => 'nullable|numeric',
            's_lat' => 'nullable|numeric',
            'e_e' => 'nullable|numeric',
            'ivrt' => 'nullable|numeric',
            // Doppler measurements
            'aortic_valve_peak' => 'nullable|numeric',
            'aortic_valve_press' => 'nullable|numeric',
            'pulmonary_valve_press' => 'nullable|numeric',
            'pulmonary_valve_peak' => 'nullable|numeric',
            'triscupid_regurg_peak' => 'nullable|string|max:255',
            'triscupid_regurg_press' => 'nullable|string|max:255',
            'mitral_regurg_peak' => 'nullable|string|max:255',
            'mitral_regurg_press' => 'nullable|string|max:255',
            'aortic_regurg_peak' => 'nullable|string|max:255',
            'aortic_regurg_press' => 'nullable|string|max:255',
            'mitral_stenosis' => 'nullable|string|max:255',
            'inferior_vena_cava_insp' => 'nullable|string|max:255',
            'inferior_vena_cava_expi' => 'nullable|string|max:255',
            'inferior_vena_cava_diam' => 'nullable|string|max:255',
            'est_right' => 'nullable|string|max:255',
            'pericardium' => 'nullable|string|max:255',
            'summary' => 'nullable|string',
            'conclusion' => 'nullable|string',
            'sign' => 'nullable|string|max:255',
        ]);

        $testRecord->update($validated);

        return redirect()->route('patients.showTest', $testRecord->id)->with('success', 'Test record updated successfully');
    }
    public function update(Request $request, Patient $patient)
    {
        //
    }
    public function destroy(Patient $patient)
    {
        //
    }

}
