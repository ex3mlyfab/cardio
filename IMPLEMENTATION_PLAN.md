# Cardio Application — Implementation Plan

## Completed Fixes (Phase 1-4)

### Backend
| Fix | File |
|-----|------|
| Race condition: `firstOrCreate` → `DB::transaction` + `updateOrCreate` | `PatientController.php`, `PaedController.php` |
| Implemented empty `update()` and `destroy()` methods | `PatientController.php` |
| Removed all `dd()` debug calls | `PatientController.php`, `PaedController.php` |
| Fixed `triscupid` → `tricuspid` column name mismatch | `PaedController.php:115` |
| Fixed `destroy()` redirect from `patients.index` → `kids.index` | `PaedController.php` |
| Fixed gender case mismatch (`'Male'` → `'male'`) | `DashboardController.php` |
| Added `SoftDeletes` + casts to `TestRecord` and `ChildReading` | Models |
| Added authorization policies + registered in AppServiceProvider | `app/Policies/*`, `AppServiceProvider.php` |
| Added `flash` data sharing in Inertia middleware | `HandleInertiaRequests.php` |
| Created migration for unique `hospital_id` + soft deletes | `2026_08_19_140927_*.php` |

### Frontend
| Fix | File |
|-----|------|
| New toast notification system (success/error/warning/info) | `ui/toast.tsx`, `use-notification.tsx` |
| Auto-flashes server-side flash messages as toasts | `page-notifications.tsx` |
| Integrated notifications into app + auth layouts | `app-sidebar-layout.tsx`, `auth-layout.tsx` |
| Fixed kids index: `patients.index` → `kids.index` routes | `kids/index.tsx` |
| Replaced native `<select>` with Radix `Select` component | `patients/index.tsx`, `kids/index.tsx` |
| Extracted consultant names to `constants/consultants.ts` | `constants/consultants.ts` |
| Extracted Tab components to `ui/tabs.tsx` shared component | `ui/tabs.tsx` |
| Added delete loading state with spinner text | `patients/index.tsx`, `kids/index.tsx` |
| Fixed BSA formula: simplified and removed misleading variable | All create pages |
| Removed broken route redirects (`showTestRecord`, `kids.show`) | `create.tsx` files |
| Removed unused imports (`resolvePageComponent`, `TabsPrimitive`, `cn`) | Multiple files |
| Removed duplicate flash message blocks (now handled globally) | `patients/index.tsx`, `kids/index.tsx` |

**TypeScript:** 0 errors | **ESLint:** 0 errors (6 pre-existing warnings)

## Phase 1: Critical Bugs (P0) — Fix Immediately

### 1.1 Race Condition — Duplicate Patients
**Files:** `app/Http/Controllers/PatientController.php`, `app/Http/Controllers/PaedController.php`

**Problem:** Two concurrent submissions with the same `hospital_id` can create duplicate patients via `firstOrCreate`.

**Fix:**
```php
// PatientController.php store() method (line 141)
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
    $testRecord = TestRecord::create([...]);
});
```
Same pattern for `PaedController.php store()` (line 85).

**Database migration required:** Add unique index on `hospital_id`:
```php
// Migration: add_unique_hospital_id_to_patients
$table->unique('hospital_id');
```

---

### 1.2 Wrong Route in Create Page Redirects
**Files:** `resources/js/pages/patients/create.tsx` (line 174)

**Problem:** Redirects to non-existent route `patients.showTestRecord`.

**Fix:**
```ts
// Line 174 - change from:
window.location.href = route('patients.showTestRecord', { testRecord: id });
// To:
window.location.href = route('patients.showTest', testRecord.id);
```

Same check for `kids/create.tsx` line 183 — verify route name matches `web.php`.

---

### 1.3 Gender Case Mismatch in Dashboard
**Files:** `app/Http/Controllers/DashboardController.php` (lines 32-33)

**Problem:** Queries use `'Male'`/`'Female'` but form stores lowercase `'male'`/`'female'`.

**Fix:**
```php
$maleCount = Patient::where('gender', 'male')->count();
$femaleCount = Patient::where('gender', 'female')->count();
```

---

## Phase 2: High Priority (P1) — Functional & Security

### 2.1 Fix Kids Index Search/Filter Routes
**Files:** `resources/js/pages/kids/index.tsx` (lines 86-88, 107-109)

**Problem:** Uses `route('patients.index')` instead of `route('kids.index')`.

**Fix:**
```ts
// Line 86-88 - change from:
router.get(route('patients.index'), { search: value, filter }, ...)
// To:
router.get(route('kids.index'), { search: value, filter }, ...)

// Line 107-109 - same fix
router.get(route('kids.index'), { search, filter: newFilter }, ...)
```

---

### 2.2 Tricuspid Field Name Mismatch in Paediatric Controller
**Files:** `app/Http/Controllers/PaedController.php`

**Problem:** `store()` writes to `triscupid` (line 116), `updateTest()` validates `tricuspid` (line 205). Database column is `tricuspid`.

**Fix:** Update `store()` method line 116:
```php
// Change from:
'triscupid' => $validated['triscupid'],
// To:
'tricuspid' => $validated['tricuspid'],
```

---

### 2.3 Implement Empty update() and destroy() Methods
**Files:** `app/Http/Controllers/PatientController.php` (lines 325-332)

**Problem:** Methods are empty stubs — patient edit/delete buttons do nothing.

**Fix:**
```php
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
    // Soft delete or check for related records first
    if ($patient->testRecords()->exists() || $patient->childReadings()->exists()) {
        return redirect()->back()->with('error', 'Cannot delete patient with existing test records.');
    }
    $patient->delete();
    return redirect()->route('patients.index')->with('success', 'Patient deleted successfully.');
}
```

---

### 2.4 Add Authorization Policies
**Files:** `app/Policies/*`, `app/Http/Controllers/*`

**Problem:** Any authenticated user can view/edit/delete any record.

**Implementation:**
```bash
php artisan make:policy PatientPolicy --model=Patient
php artisan make:policy TestRecordPolicy --model=TestRecord
```

Add to `app/Providers/AuthServiceProvider.php`:
```php
protected $policies = [
    Patient::class => PatientPolicy::class,
    TestRecord::class => TestRecordPolicy::class,
    ChildReading::class => ChildReadingPolicy::class,
];
```

Apply in controllers:
```php
public function show(Patient $patient)
{
    $this->authorize('view', $patient);
    // ...
}
```

---

### 2.5 Remove All `dd()` Debug Statements
**Files to scan:**
- `app/Http/Controllers/PatientController.php` (lines 72, 149, 233, 236)
- `app/Http/Controllers/PaedController.php` (lines 20, 163, 167)

**Fix:** Remove all `dd()` and `// dd(...)` commented-out lines.

---

### 2.6 Remove Console.log in Production Code
**Files:** `resources/js/pages/kids/create.tsx` (line 178)

**Fix:**
```ts
// Remove or wrap in development check:
if (import.meta.env.DEV) console.log(data);
```

---

## Phase 3: Medium Priority (P2) — Data Integrity & UX

### 3.1 Add Soft Deletes to Medical Records
**Files:** `app/Models/TestRecord.php`, `app/Models/ChildReading.php`, migrations

**Fix models:**
```php
use Illuminate\Database\Eloquent\SoftDeletes;

class TestRecord extends Model
{
    use HasFactory, SoftDeletes;
    protected $dates = ['deleted_at'];
}
```

**Add migration:**
```php
$table->softDeletes();
```

Update destroy methods to use `$testRecord->delete()` (which now triggers soft delete).

---

### 3.2 Add Cascade Delete to Foreign Keys
**Files:** Database migrations for `test_records` and `child_readings`

**Fix:** In migration, add cascade delete:
```php
$table->foreignUlid('patient_id')
      ->constrained('patients')
      ->onDelete('cascade');
```

---

### 3.3 Fix Numeric Fields — Add Casting to Models
**Files:** `app/Models/TestRecord.php`, `app/Models/ChildReading.php`

**Problem:** All measurement columns are stored as strings but should be numeric.

**Fix (do not change DB — cast on read):**
```php
protected function casts(): array
{
    return [
        'weight' => 'decimal:2',
        'height' => 'decimal:2',
        'bsa' => 'decimal:4',
        'aortic_root' => 'decimal:2',
        // ... cast all numeric fields
    ];
}
```

---

### 3.4 Replace Native `<select>` with Radix Select Components
**Files:** `resources/js/pages/patients/index.tsx` (lines 143-151), `resources/js/pages/kids/index.tsx` (lines 143-151)

**Fix:** Replace with the project's `Select` component:
```tsx
<Select value={filter} onValueChange={(v) => setFilter(v)}>
    <SelectTrigger className="w-[180px]">
        <SelectValue placeholder="Filter" />
    </SelectTrigger>
    <SelectContent>
        <SelectItem value="all">All Records</SelectItem>
        <SelectItem value="recent">Recent (Last 30 days)</SelectItem>
        <SelectItem value="male">Male Patients</SelectItem>
        <SelectItem value="female">Female Patients</SelectItem>
    </SelectContent>
</Select>
```

---

### 3.5 Extract Consultant Names to Shared Constant
**Files:** `resources/js/pages/patients/create.tsx` (lines 659-675), `resources/js/pages/patients/editTestRecord.tsx` (lines 92-109)

**Fix:** Create `resources/js/constants/consultants.ts`:
```ts
export const CONSULTANTS = [
    "Dr. SALAU (FWACP)",
    "DR. ABIODUN (FWACP)",
    // ... all names
] as const;
```

Import and use in both files.

---

### 3.6 Extract Repeated Tab Components to Shared Component
**Files:** `resources/js/pages/patients/create.tsx`, `resources/js/pages/kids/create.tsx`, `resources/js/pages/patients/editTestRecord.tsx`

**Fix:** Create `resources/js/components/ui/custom-tabs.tsx` containing the Tabs, TabsList, TabsTrigger, TabsContent components, then import from there instead of redefining.

---

### 3.7 Add Form Submission Feedback
**Files:** All create/update pages

**Fix:** Add success/error toast notifications:
```ts
// Using Inertia's pageProps
const { flash } = usePage<{ flash: { success?: string; error?: string } }>().props;
// Or add a global ToastProvider
```

---

### 3.8 Add Loading States for Async Actions
**Files:** `resources/js/pages/patients/index.tsx` (line 200), `resources/js/pages/kids/index.tsx` (line 200)

**Fix:**
```tsx
const [deletingId, setDeletingId] = useState<number | null>(null);

<Button
    variant="destructive"
    size="sm"
    disabled={deletingId === test.id}
    onClick={() => {
        if (confirm('...')) {
            setDeletingId(test.id);
            router.delete(route('patients.deleteTest', test.id), {
                onSuccess: () => setDeletingId(null),
                onFinish: () => setDeletingId(null),
            });
        }
    }}
>
    {deletingId === test.id ? 'Deleting...' : 'Delete'}
</Button>
```

---

## Phase 4: Low Priority (P3) — Polish & Maintainability

### 4.1 Fix BSA Formula Variable Naming
**Files:** All create pages

**Problem:** Variable named `heightInMeters` but actually holds `height / 3600` (not a unit conversion).

**Fix:**
```ts
const bsa = Math.sqrt(Number(data.weight) * Number(data.height) / 3600);
setData('bsa', bsa.toFixed(2));
```

Rename variable for clarity — remove the misleading intermediate step.

---

### 4.2 Replace Inline Styles with Tailwind Classes
**Files:** `resources/js/pages/patients/showTest.tsx`, `resources/js/pages/kids/showTest.tsx`

**Fix:** Convert all `style={{}}` attributes to Tailwind utility classes. Example:
```tsx
// Before:
<div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '10px' }}>
// After:
<div className="grid grid-cols-3 gap-2">
```

---

### 4.3 Add Print-Specific CSS
**Files:** Print window in `showTest.tsx` and `kids/showTest.tsx`

**Fix:** Add proper `@media print` rules:
```css
@media print {
    body { margin: 0; padding: 10mm; }
    table { page-break-inside: avoid; }
    .no-print { display: none !important; }
}
```

Include these in the printed document.

---

### 4.4 Add Empty State Designs
**Files:** `resources/js/pages/patients/index.tsx`, `resources/js/pages/kids/index.tsx`

**Fix:** Replace plain text with proper empty state:
```tsx
{tests.data.length === 0 && (
    <div className="flex flex-col items-center justify-center py-12 text-center">
        <FileText className="h-12 w-12 text-muted-foreground mb-4" />
        <p className="text-lg font-medium">No test records found</p>
        <p className="text-sm text-muted-foreground">Try adjusting your search or filters.</p>
    </div>
)}
```

---

### 4.5 Add Skeleton Loading States
**Files:** All index and show pages

**Fix:** Create a `Skeleton` component and show during data load:
```tsx
{isLoading ? (
    <div className="space-y-4">
        {[1,2,3,4,5].map(i => <Skeleton key={i} className="h-12 w-full" />)}
    </div>
) : (
    <Table>...</Table>
)}
```

---

### 4.6 Remove Unused Import
**Files:** `app/Http/Controllers/PatientController.php` (line 7)

**Fix:** Remove `use Illuminate\Container\Attributes\Auth;`

---

## Phase 5: Architecture Improvements

### 5.1 Extract Shared Search/Filter Logic
**Files:** `PatientController.php`, `PaedController.php`

Create a trait or base controller to avoid duplicating the search/filter/pagination query logic.

### 5.2 Create API Endpoint for Consultant Names
Move hardcoded consultant list to a Laravel endpoint or config file so it can be managed without code changes.

### 5.3 Fix Password Reset Flow
Ensure users can reset passwords via their login identifier (username OR email).

---

## Verification Checklist

After each phase, run:

```bash
# Backend
php artisan test
php artisan route:list
php artisan migrate:status

# Frontend
npm run lint
npm run types
npm run build
```

## Suggested Execution Order

1. **Day 1:** Phase 1 (all P0 fixes) + run tests
2. **Day 2:** Phase 2 (all P1 fixes) + add authorization
3. **Day 3:** Phase 3 (all P2 fixes) + UI improvements
4. **Day 4:** Phase 4 (all P3 fixes) + polish
5. **Day 5:** Phase 5 (architecture) + final testing
