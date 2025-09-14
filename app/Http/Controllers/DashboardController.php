<?php

namespace App\Http\Controllers;

use App\Models\ChildReading;
use App\Models\Patient;
use App\Models\TestRecord;
use Carbon\Carbon;
use Illuminate\Http\Request;
use Inertia\Inertia;

class DashboardController extends Controller
{
    public function index(Request $request)
    {
        // Get current year and month
        $currentYear = Carbon::now()->year;
        $currentMonth = Carbon::now()->month;

        // Count test records for current year
        $yearlyTestCount = TestRecord::whereYear('created_at', $currentYear)->count();
        $yearlyKidsTestCount = ChildReading::whereYear('created_at', $currentYear)->count();
        // Count test records for current month
        $monthlyTestCount = TestRecord::whereYear('created_at', $currentYear)
            ->whereMonth('created_at', $currentMonth)
            ->count();
        $monthlyKidsTestCount = ChildReading::whereYear('created_at', $currentYear)
            ->whereMonth('created_at', $currentMonth)
            ->count();
        // Get gender distribution for chart
        $maleCount = Patient::where('gender', 'Male')->count();
        $femaleCount = Patient::where('gender', 'Female')->count();

        // Get patients with search and pagination
        $search = $request->input('search', '');

        $query = Patient::query()
            ->withCount('testRecords')
            ->withCount('childReadings')
            ->when($search, function($query, $search) {
                $query->where(function($query) use ($search) {
                    $query->where('surname', 'like', "%{$search}%")
                        ->orWhere('other_names', 'like', "%{$search}%")
                        ->orWhere('hospital_id', 'like', "%{$search}%");
                });
            })
            ->orderBy('created_at', 'desc');

        $patients = $query->paginate(10)->withQueryString();

        return Inertia::render('dashboard', [
            'yearlyTestCount' => $yearlyTestCount,
            'monthlyTestCount' => $monthlyTestCount,
            'yearlyKidsTestCount' => $yearlyKidsTestCount,
            'monthlyKidsTestCount' => $monthlyKidsTestCount,
            'genderData' => [
                'male' => $maleCount,
                'female' => $femaleCount
            ],
            'patients' => $patients,
            'filters' => [
                'search' => $search,
            ]
        ]);
    }
}
