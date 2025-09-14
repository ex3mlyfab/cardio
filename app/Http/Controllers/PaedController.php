<?php

namespace App\Http\Controllers;

use App\Models\ChildReading;
use Illuminate\Http\Request;
use Inertia\Inertia;
use App\Models\Patient;

class PaedController extends Controller
{
    public function creteTest()
    {
        return Inertia::render('kids/create');

    }

    public function store(Request $request)
    {
        // dd('i am here');
        $validated = $request->validate([
            'hospital_id' => 'required|string',
            'surname' => 'required|string',
            'other_names' => 'required|string',
            'date_of_birth' => 'required|date',
            'gender' => 'required|string', // Assuming gender is a string
            'referring' => 'nullable|string',
            'phone_number' => 'nullable|string',
            'test_date' => 'required|date',
            'weight' => 'required|string',
            'height' => 'required|string',
            'bsa' => 'required|string',
            'blood_pressure' => 'nullable|string',
            'wc_cm' => 'nullable|string',
            'indication' => 'nullable|string',
            'heart_rate' => 'nullable|string',
            'spo2' => 'nullable|string',
            'abdominal_situs' => 'nullable|string',
            'cardiac_position' => 'nullable|string',
            'systemic_venous_drainage' => 'nullable|string',
            'pulmonary_venous_drainage' => 'nullable|string',
            'atrio_ventricular_connection' => 'nullable|string',
            'ventricular_arterial_connection' => 'nullable|string',
            'ventricular_loop' => 'nullable|string',
            'left_atrium' => 'nullable|string',
            'right_atrium' => 'nullable|string',
            'mitral_av' => 'nullable|string',
            'triscupid' => 'nullable|string',
            'left_ventricle' => 'nullable|string',
            'right_ventricle' => 'nullable|string',
            'interatrial_septum' => 'nullable|string',
            'interventricular_septum' => 'nullable|string',
            'aortic_arteries' => 'nullable|string',
            'pulmonary_arteries' => 'nullable|string',
            'outflow_tract' => 'nullable|string',
            'arch' => 'nullable|string',
            'pda' => 'nullable|string',
            'corona_arteries' => 'nullable|string',
            'pulmonary' => 'nullable|string',
            'pulmonary_artery' => 'nullable|string',
            'pulmonary_valve' => 'nullable|string',
            'aortic_valve' => 'nullable|string',
            'aorta' => 'nullable|string',
            'mitral' => 'nullable|string',
            'aortic' => 'nullable|string',
            'triscupid_doppler' => 'nullable|string',
            'pulmonary_doppler' => 'nullable|string',
            'ao' => 'nullable|string',
            'lvidd' => 'nullable|string',
            'ivsd' => 'nullable|string',
            'edv' => 'nullable|string',
            'la_ao' => 'nullable|string',
            'la' => 'nullable|string',
            'lvids' => 'nullable|string',
            'pwd' => 'nullable|string',
            'esv' => 'nullable|string',
            'ef' => 'nullable|string',
            'fs' => 'nullable|string',
            'cardiac_output' => 'nullable|string',
            'cardiac_index' => 'nullable|string',
            'summary' => 'nullable|string',
            'doctor_name' => 'nullable|string',
            'recommendations' => 'nullable|string',
        ]);
       $patient = Patient::firstOrCreate(
           [
               'hospital_id' => $validated['hospital_id']],[
               'surname' => $validated['surname'],
               'other_names' => $validated['other_names'],
               'date_of_birth' => $validated['date_of_birth'],
               'phone_number' => $validated['phone_number'],
               'gender' => $validated['gender']]
         );

        $test = ChildReading::create([
            'patient_id' =>  $patient->id,
            'test_date' => $validated['test_date'],
            'weight' => $validated['weight'],
            'height' => $validated['height'],
            'bsa' => $validated['bsa'],
            'blood_pressure' => $validated['blood_pressure'],
            'indication' => $validated['indication'],
            'heart_rate' => $validated['heart_rate'],
            'spo2' => $validated['spo2'],
            'referring_hospital' => $validated['referring'],
            'abdominal_situs' => $validated['abdominal_situs'],
            'cardiac_position' => $validated['cardiac_position'],
            'systemic_venous_drainage' => $validated['systemic_venous_drainage'],
            'pulmonary_venous_drainage' => $validated['pulmonary_venous_drainage'],
            'atrio_ventricular_connection' => $validated['atrio_ventricular_connection'],
            'ventricular_arterial_connection' => $validated['ventricular_arterial_connection'],
            'ventricular_loop' => $validated['ventricular_loop'],
            'left_atrium' => $validated['left_atrium'],
            'right_atrium' => $validated['right_atrium'],
            'mitral_av' => $validated['mitral_av'],
            'triscupid' => $validated['triscupid'],
            'left_ventricle' => $validated['left_ventricle'],
            'right_ventricle' => $validated['right_ventricle'],
            'interatrial_septum' => $validated['interatrial_septum'],
            'interventricular_septum' => $validated['interventricular_septum'],
            'aortic_arteries' => $validated['aortic_arteries'],
            'pulmonary_arteries' => $validated['pulmonary_arteries'],
            'outflow_tract' => $validated['outflow_tract'],
            'arch' => $validated['arch'],
            'pda' => $validated['pda'],
            'corona_arteries' => $validated['corona_arteries'],
            'pulmonary' => $validated['pulmonary'],
            'pulmonary_artery' => $validated['pulmonary_artery'],
            'pulmonary_valve' => $validated['pulmonary_valve'],
            'aortic_valve' => $validated['aortic_valve'],
            'aorta' => $validated['aorta'],
            'mitral' => $validated['mitral'],
            'aortic' => $validated['aortic'],
            'triscupid_doppler' => $validated['triscupid_doppler'],
            'pulmonary_doppler' => $validated['pulmonary_doppler'],
            'ao' => $validated['ao'],
            'lvidd' => $validated['lvidd'],
            'ivsd' => $validated['ivsd'],
            'edv' => $validated['edv'],
            'la_ao' => $validated['la_ao'],
            'la' => $validated['la'],
            'lvids' => $validated['lvids'],
            'pwd' => $validated['pwd'],
            'esv' => $validated['esv'],
            'ef' => $validated['ef'],
            'fs' => $validated['fs'],
            'cardiac_output' => $validated['cardiac_output'],
            'cardiac_index' => $validated['cardiac_index'],
            'summary' => $validated['summary'],
            'user_id' => auth()->id(),
            'doctor_name' => $validated['doctor_name'],
            'recommendations' => $validated['recommendations']
        ]);

        $test->load('patient');

         return Inertia::render('kids/showTest', [
            'testRecord' => $test,
        ]);

    }
     public function showTest(ChildReading $testRecord)
    {
        // dd($testRecord->id);

        $testRecord->load('patient');
        // dd($testRecord);

        return Inertia::render('kids/showTest', [
            'testRecord' => $testRecord,
        ]);
    }

    public function editTest(ChildReading $testRecord)
    {
        $testRecord->load('patient');

        return Inertia::render('kids/editTest', [
            'testRecord' => $testRecord,
        ]);
    }

    public function updateTest(Request $request, ChildReading $testRecord)
    {
        $validated = $request->validate([
            'test_date' => 'required|date',
            'weight' => 'required|string',
            'height' => 'required|string',
            'bsa' => 'required|string',
            'blood_pressure' => 'nullable|string',
            'wc_cm' => 'nullable|string',
            'indication' => 'nullable|string',
            'heart_rate' => 'nullable|string',
            'spo2' => 'nullable|string',
            'abdominal_situs' => 'nullable|string',
            'cardiac_position' => 'nullable|string',
            'systemic_venous_drainage' => 'nullable|string',
            'pulmonary_venous_drainage' => 'nullable|string',
            'atrio_ventricular_connection' => 'nullable|string',
            'ventricular_arterial_connection' => 'nullable|string',
            'ventricular_loop' => 'nullable|string',
            'left_atrium' => 'nullable|string',
            'right_atrium' => 'nullable|string',
            'mitral_av' => 'nullable|string',
            'tricuspid' => 'nullable|string',
            'left_ventricle' => 'nullable|string',
            'right_ventricle' => 'nullable|string',
            'interatrial_septum' => 'nullable|string',
            'interventricular_septum' => 'nullable|string',
            'aortic_arteries' => 'nullable|string',
            'pulmonary_arteries' => 'nullable|string',
            'outflow_tract' => 'nullable|string',
            'arch' => 'nullable|string',
            'pda' => 'nullable|string',
            'corona_arteries' => 'nullable|string',
            'pulmonary' => 'nullable|string',
            'pulmonary_artery' => 'nullable|string',
            'pulmonary_valve' => 'nullable|string',
            'aortic_valve' => 'nullable|string',
            'aorta' => 'nullable|string',

            'mitral' => 'nullable|string',
            'aortic' => 'nullable|string',
            'triscupid_doppler' => 'nullable|string',
            'pulmonary_doppler' => 'nullable|string',
            'ao' => 'nullable|string',
            'lvidd' => 'nullable|string',
            'ivsd' => 'nullable|string',
            'edv' => 'nullable|string',
            'la_ao' => 'nullable|string',
            'la' => 'nullable|string',
            'lvids' => 'nullable|string',
            'pwd' => 'nullable|string',
            'esv' => 'nullable|string',
            'ef' => 'nullable|string',
            'fs' => 'nullable|string',
            'cardiac_output' => 'nullable|string',
            'cardiac_index' => 'nullable|string',
            'summary' => 'nullable|string',

            'doctor_name' => 'nullable|string',
            'recommendations' => 'nullable|string',
        ]);

        $testRecord->update($validated);
        $testRecord->load('patient');
        return Inertia::render('kids/showTest', [
            'testRecord' => $testRecord,
        ]);
    }

    public function index()
    {

        $thirtyDay = now()->subDays(30);
        $search = request('search', '');
        $filter = request('filter', 'all');
        $query = ChildReading::with('patient')
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
        if(request()->has('search')){

        }
        $tests = $query->paginate(10);
        return Inertia::render('kids/index', [
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
}
