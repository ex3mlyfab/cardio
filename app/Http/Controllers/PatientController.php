<?php

namespace App\Http\Controllers;

use App\Models\Patient;
use App\Models\TestRecord;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Inertia\Inertia;

class PatientController extends Controller
{
    public function index()
    {

        $thirtyDay = now()->subDays(30);
        $search = request('search', '');
        $filter = request('filter', 'all');
        $query = TestRecord::with('patient')
            ->when($search, function ($query, $search) {
                $query->whereHas('patient', function ($query) use ($search) {
                    $query->where('surname', 'like', "%{$search}%")
                        ->orWhere('other_names', 'like', "%{$search}%")
                        ->orWhere('hospital_id', 'like', "%{$search}%");
                });
            })
            ->when($filter === 'recent', function ($query) use ($thirtyDay) {
                $query->where('created_at', '>=', $thirtyDay);
            })
            ->when($filter === 'male', function ($query) {
                $query->whereHas('patient', function ($query) {
                    $query->where('gender', 'like', 'male');
                });
            })
            ->when($filter === 'female', function ($query) {
                $query->whereHas('patient', function ($query) {
                    $query->where('gender', 'like', 'female');
                });
            })
            ->orderBy('created_at', 'desc');
        if (request()->has('search')) {
            // search already applied above
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
        $validated = $request->validate([
            'hospital_id' => 'required|string',
            'surname' => 'required|string',
            'other_names' => 'required|string',
            'date_of_birth' => 'required|date',
            'gender' => 'required|string', // Assuming gender is a string
            'nicl' => 'required|string', // Assuming nicl is a string
            'test_date' => 'required|date',
            'weight' => 'required|numeric', // Consider 'numeric' if applicable
            'height' => 'required|numeric', // Consider 'numeric' if applicable
            'bsa' => 'required|numeric', // Consider 'numeric' if applicable
            'blood_pressure' => 'nullable|numeric',
            'wc_cm' => 'nullable|numeric', // Consider 'numeric' if applicable
            'indication' => 'required|string',
            // Dimension
            'aortic_root' => 'nullable|numeric', // Consider 'numeric' if applicable
            'la_ap' => 'nullable|numeric', // Consider 'numeric' if applicable
            'mv_excursion' => 'nullable|numeric', // Consider 'numeric' if applicable
            'ef_slope' => 'nullable|numeric', // Consider 'numeric' if applicable
            'epss' => 'nullable|numeric', // Consider 'numeric' if applicable
            'rvid' => 'nullable|numeric', // Consider 'numeric' if applicable
            'raa' => 'nullable|numeric', // Consider 'numeric' if applicable
            'laa' => 'nullable|numeric', // Consider 'numeric' if applicable
            'ivsd' => 'nullable|numeric', // Consider 'numeric' if applicable
            'lvidd' => 'nullable|numeric', // Consider 'numeric' if applicable
            'lvpwd' => 'nullable|numeric', // Consider 'numeric' if applicable
            'ivss' => 'nullable|numeric', // Consider 'numeric' if applicable
            'lvids' => 'nullable|numeric', // Consider 'numeric' if applicable
            'lvpws' => 'nullable|numeric', // Consider 'numeric' if applicable
            'fs' => 'nullable|numeric', // Consider 'numeric' if applicable
            'ef' => 'nullable|numeric', // Consider 'numeric' if applicable
            // Diastolic function
            'e_wave' => 'nullable|numeric', // Consider 'numeric' if applicable
            'a_wave' => 'nullable|numeric', // Consider 'numeric' if applicable
            'e_a' => 'nullable|numeric', // Consider 'numeric' if applicable
            'e_wave_dt' => 'nullable|numeric', // Consider 'numeric' if applicable
            'e_lat' => 'nullable|numeric', // Consider 'numeric' if applicable
            'a_lat' => 'nullable|numeric', // Consider 'numeric' if applicable
            's_lat' => 'nullable|numeric', // Consider 'numeric' if applicable
            'e_e' => 'nullable|numeric', // Consider 'numeric' if applicable
            'ivrt' => 'nullable|numeric', // Consider 'numeric' if applicable
            // Doppler measurements
            'aortic_valve_peak' => 'nullable|numeric', // Consider 'numeric' if applicable
            'aortic_valve_press' => 'nullable|numeric', // Consider 'numeric' if applicable
            'pulmonary_valve_press' => 'nullable|numeric', // Consider 'numeric' if applicable
            'pulmonary_valve_peak' => 'nullable|numeric', // Consider 'numeric' if applicable
            'triscupid_regurg_peak' => 'nullable|numeric', // Consider 'numeric' if applicable
            'triscupid_regurg_press' => 'nullable|numeric', // Consider 'numeric' if applicable
            'mitral_regurg_peak' => 'nullable|numeric', // Consider 'numeric' if applicable
            'mitral_regurg_press' => 'nullable|numeric', // Consider 'numeric' if applicable
            'aortic_regurg_peak' => 'nullable|numeric', // Consider 'numeric' if applicable
            'aortic_regurg_press' => 'nullable|numeric', // Consider 'numeric' if applicable
            'mitral_stenosis' => 'nullable|numeric', // Consider 'numeric' if applicable
            'inferior_vena_cava_insp' => 'nullable|numeric', // Consider 'numeric' if applicable
            'inferior_vena_cava_expi' => 'nullable|numeric', // Consider 'numeric' if applicable
            'inferior_vena_cava_diam' => 'nullable|numeric',
            // Consider 'numeric' if applicable
            'pasp' => 'nullable|numeric',
            'mpap'  => 'nullable|numeric',
            'mvsp' => 'nullable|numeric',
            'est_right' => 'nullable|numeric',
            'pericardium' => 'nullable|string',
            'summary' => 'nullable|string', // Text fields might not need max length
            'conclusion' => 'nullable|string', // Text fields might not need max length
            'sign' => 'nullable|string',
            'doctor_name' => 'nullable|string', // Optional field for doctor's name
        ]);
        DB::transaction(function () use ($validated) {
            $patient = Patient::updateOrCreate(
                ['hospital_id' => $validated['hospital_id']],
                [
                    'surname' => $validated['surname'],
                    'other_names' => $validated['other_names'],
                    'date_of_birth' => $validated['date_of_birth'],
                    'gender' => $validated['gender'],
                    'nicl' => $validated['nicl'],
                ]
            );
            $testRecord = TestRecord::create([
                'patient_id' => $patient->id,
                'test_date' => $validated['test_date'],
                'weight' => $validated['weight'],
                'height' => $validated['height'],
                'bsa' => $validated['bsa'],
                'blood_pressure' => $validated['blood_pressure'],
                'wc_cm' => $validated['wc_cm'],
                'indication' => $validated['indication'],
                'aortic_root' => $validated['aortic_root'],
                'la_ap' => $validated['la_ap'],
                'mv_excursion' => $validated['mv_excursion'],
                'ef_slope' => $validated['ef_slope'],
                'epss' => $validated['epss'],
                'rvid' => $validated['rvid'],
                'raa' => $validated['raa'],
                'laa' => $validated['laa'],
                'ivsd' => $validated['ivsd'],
                'lvidd' => $validated['lvidd'],
                'lvpwd' => $validated['lvpwd'],
                'ivss' => $validated['ivss'],
                'lvids' => $validated['lvids'],
                'lvpws' => $validated['lvpws'],
                'fs' => $validated['fs'],
                'ef' => $validated['ef'],
                'e_wave' => $validated['e_wave'],
                'a_wave' => $validated['a_wave'],
                'e_a' => $validated['e_a'],
                'e_wave_dt' => $validated['e_wave_dt'],
                'e_lat' => $validated['e_lat'],
                'a_lat' => $validated['a_lat'],
                's_lat' => $validated['s_lat'],
                'e_e' => $validated['e_e'],
                'ivrt' => $validated['ivrt'],
                'aortic_valve_peak' => $validated['aortic_valve_peak'],
                'aortic_valve_press' => $validated['aortic_valve_press'],
                'pulmonary_valve_press' => $validated['pulmonary_valve_press'],
                'pulmonary_valve_peak' => $validated['pulmonary_valve_peak'],
                'triscupid_regurg_peak' => $validated['triscupid_regurg_peak'],
                'triscupid_regurg_press' => $validated['triscupid_regurg_press'],
                'mitral_regurg_peak' => $validated['mitral_regurg_peak'],
                'mitral_regurg_press' => $validated['mitral_regurg_press'],
                'aortic_regurg_peak' => $validated['aortic_regurg_peak'],
                'aortic_regurg_press' => $validated['aortic_regurg_press'],
                'mitral_stenosis' => $validated['mitral_stenosis'],
                'inferior_vena_cava_insp' => $validated['inferior_vena_cava_insp'],
                'inferior_vena_cava_expi' => $validated['inferior_vena_cava_expi'],
                'inferior_vena_cava_diam' => $validated['inferior_vena_cava_diam'],
                'pasp' => $validated['pasp'],
                'mpap' => $validated['mpap'],
                'mvsp' => $validated['mvsp'],
                'est_right' => $validated['est_right'],
                'pericardium' => $validated['pericardium'],
                'summary' => $validated['summary'],
                'conclusion' => $validated['conclusion'],
                'user_id' => auth()->id(),
                'sign' => $validated['sign'] === 'others' ? $validated['doctor_name'] : $validated['sign'],
            ]);
        });

        // Redirect or return response
        $testRecord->load('patient');
       return Inertia::render('patients/showTest', [
            'testRecord' => $testRecord,
        ]);
    }

    public function show(Patient $patient)
    {
        return Inertia::render('patients/show', [
            'patient' => $patient,
            'tests' => $patient->testRecords,
            'kidsTest' => $patient->childReadings
        ]);
    }

    public function showTest(TestRecord $testRecord)
    {
        $testRecord->load('patient');

        return Inertia::render('patients/showTest', [
            'testRecord' => $testRecord,
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
        $testRecord->load('patient');
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
            'blood_pressure' => 'nullable|string',
            'wc_cm' => 'nullable|numeric',
            'indication' => 'required|string',
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
            'triscupid_regurg_peak' => 'nullable|string',
            'triscupid_regurg_press' => 'nullable|string',
            'mitral_regurg_peak' => 'nullable|string',
            'mitral_regurg_press' => 'nullable|string',
            'aortic_regurg_peak' => 'nullable|string',
            'aortic_regurg_press' => 'nullable|string',
            'mitral_stenosis' => 'nullable|string',
            'inferior_vena_cava_insp' => 'nullable|string',
            'inferior_vena_cava_expi' => 'nullable|string',
            'inferior_vena_cava_diam' => 'nullable|string',
            'pasp' => 'nullable|numeric',
            'mpap'  => 'nullable|numeric',
            'mvsp' => 'nullable|numeric',
            'est_right' => 'nullable|string',
            'pericardium' => 'nullable|string',
            'summary' => 'nullable|string',
            'conclusion' => 'nullable|string',
            'sign' => 'nullable|string',
            'doctor_name' => 'nullable|string', // Optional field for doctor's name
        ]);
        // Update the test record with the validated data
        $validated['sign'] = $validated['sign'] === 'others' ? $validated['doctor_name'] : $validated['sign'];
          $testRecord->update($validated);
        $testRecord->load('patient');
        return Inertia::render('patients/showTest', [
            'testRecord' => $testRecord
        ]);
    }
    public function update(Request $request, Patient $patient)
    {
        $validated = $request->validate([
            'surname' => 'required|string',
            'other_names' => 'required|string',
            'gender' => 'required|string',
            'hospital_id' => 'required|string|unique:patients,hospital_id,' . $patient->id,
            'date_of_birth' => 'required|date',
            'nicl' => 'nullable|string',
            'phone_number' => 'nullable|string',
        ]);

        $patient->update($validated);

        return redirect()->route('patients.show', $patient)->with('success', 'Patient updated successfully.');
    }

    public function destroy(Patient $patient)
    {
        if ($patient->testRecords()->exists() || $patient->childReadings()->exists()) {
            return redirect()->back()->with('error', 'Cannot delete patient with existing test records.');
        }

        $patient->delete();
        return redirect()->route('patients.index')->with('success', 'Patient deleted successfully.');
    }
    public function deleteTestRecord(TestRecord $testRecord)
    {
        $testRecord->delete();
        return redirect()->route('patients.index')->with('success', 'Test record deleted successfully.');
    }
}
