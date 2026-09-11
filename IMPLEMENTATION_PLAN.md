# Implementation Plan — Patient Form Measure Changes

Scope: **patient create & edit forms only** (kids/paediatric forms are untouched). Backend, show page, and print page are also updated.

## New DB fields (add columns; keep old columns non-breaking)
| New column | Meaning | Units |
|---|---|---|
| `e_ave` | E' (ave) — average tissue Doppler | m/s |
| `lavi` | LAVI | ml/m2 |
| `pulmonary_vein_sd` | Pulmonary vein (S/D) | — |
| `arpht` | ARPHT | ms |
| `arvc` | ARVC | — |
| `nrvc` | NRVC | — |

## Removed from forms (DB columns retained, no longer written)
- `s_lat` (S' lat) — removed from Diastolic Function tab
- `aortic_regurg_peak` (ARVmax) — removed, replaced by `arpht`
- `aortic_regurg_press` (ARmax) — removed, replaced by `arvc`
- `mvsp` (RVSP) — removed, replaced by `nrvc`

## File changes

### 1. Migration (new)
`database/migrations/2026_09_11_000000_add_diastolic_and_report_measures_to_test_records_table.php`
- Add the 6 new nullable columns listed above.
- Do NOT drop old columns.

### 2. Backend — `app/Http/Controllers/PatientController.php`
- `store()` and `updateTestRecord()`: add validation for the 6 new fields.
- `store()`: write the 6 new fields; stop writing `s_lat`, `aortic_regurg_peak`, `aortic_regurg_press`, `mvsp` (keep reading validated data for the new fields only).
- `updateTestRecord()`: same — add new fields, drop the four removed from the update payload.

### 3. Create form — `resources/js/pages/patients/create.tsx`
- Diastolic Function tab: remove `s_lat` input; add `e_ave`, `lavi`, `pulmonary_vein_sd` inputs.
- Report tab: remove `aortic_regurg_peak`, `aortic_regurg_press`, `mvsp`; add `arpht`, `arvc`, `nrvc`.
- Update `useForm` default data block; remove the `handleRVSPCalc` (since `mvsp` is gone) — `pasp`/`mpap` will use `nrvc` instead of `mvsp`.

### 4. Edit form — `resources/js/pages/patients/editTestRecord.tsx`
- Same changes as create.tsx, plus the `data` type prop and default data block.

### 5. Show page — `resources/js/pages/patients/showTest.tsx`
- Type: drop `s_lat`, `aortic_regurg_peak`, `aortic_regurg_press`, `mvsp`; add `e_ave`, `lavi`, `pulmonary_vein_sd`, `arpht`, `arvc`, `nrvc`.
- Diastolic Function table: replace `s_lat` row with `e_ave`, `lavi`, `pulmonary_vein_sd`.
- Report/Doppler table: replace `ARVmax`/`ARmax PG`/`RVSP` cells with `ARPHT`/`ARVC`/`NRVC`.
- Print: print uses the same `#testRecord` DOM, so it is updated automatically.

### 6. Print page
- No separate print route exists; `handlePrint` in `showTest.tsx` serializes `#testRecord`. Changes in step 5 cover printing.

## Verification
- `php artisan migrate` (or `migrate:fresh` on a dev DB).
- `npm run build` (Vite) to ensure no TS errors in the touched pages.
- Manual: create a record, then view/Print, then edit it.
