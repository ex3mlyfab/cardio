
import AppLayout from '@/layouts/app-layout';
import { type BreadcrumbItem } from '@/types';
import { Head, useForm } from '@inertiajs/react';
import { FormEventHandler, FocusEventHandler } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea'; // Assuming this component exists
import InputError from '@/components/input-error';
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table"


const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Create Patient',
        href: '/patients/create',
    },
];

export default function CreatePatientPage() {
    const { data, setData, post, processing, errors, reset } = useForm({
        // Patient fields
        surname: '',
        other_names: '',
        gender: '',
        hospital_id: '',
        date_of_birth: '',
        nicl: '',
        // Test Record fields
        test_date: '',
        weight: '',
        height: '',
        bsa: '',
        blood_pressure: '',
        wc_cm: '',
        indication: '',
        // Dimension
        aortic_root: '',
        la_ap: '',
        mv_excursion: '',
        ef_slope: '',
        epss: '',
        rvid: '',
        raa: '',
        laa: '',
        ivsd: '',
        lvidd: '',
        lvpwd: '',
        ivss: '',
        lvids: '',
        lvpws: '',
        fs: '',
        ef: '',
        // Diastolic function
        e_wave: '',
        a_wave: '',
        e_a: '',
        e_wave_dt: '',
        e_lat: '',
        a_lat: '',
        s_lat: '',
        e_e: '',
        ivrt: '',
        // Doppler measurements
        aortic_valve_peak: '',
        aortic_valve_press: '',
        pulmonary_valve_press: '',
        pulmonary_valve_peak: '',
        triscupid_regurg_peak: '',
        triscupid_regurg_press: '',
        mitral_regurg_peak: '',
        mitral_regurg_press: '',
        aortic_regurg_peak: '',
        aortic_regurg_press: '',
        mitral_stenosis: '',
        inferior_vena_cava_insp: '',
        inferior_vena_cava_expi: '',
        inferior_vena_cava_diam: '',
        est_right: '',
        pericardium: '',
        summary: '',
        conclusion: '',
        sign: '',
    });

    const submit: FormEventHandler = (e) => {
        e.preventDefault();
        // You'll need to define this route in your Laravel backend
        post(route('patients.store'), {
            onSuccess: () => reset(),
        });
    };

    const handleHospitalIdBlur: FocusEventHandler<HTMLInputElement> = async () => {
        if (data.hospital_id && data.hospital_id.trim() !== '') {
            try {
                // Assuming route() is globally available (e.g., from Ziggy)
                const response = await fetch(route('patient.search', { hospital_id: data.hospital_id }));
                if (response.ok) {
                    const patientData = await response.json();
                    // Check if patientData is a non-empty object
                    if (patientData && typeof patientData === 'object' && Object.keys(patientData).length > 0) {
                        setData(currentData => ({
                            ...currentData,
                            surname: patientData.surname || '',
                            other_names: patientData.other_names || '',
                            gender: patientData.gender || '',
                            date_of_birth: patientData.date_of_birth || '',
                        }));
                    } else {
                        // Patient not found or empty response, clear fields
                        setData(currentData => ({
                            ...currentData,
                            surname: '',
                            other_names: '',
                            gender: '',
                            date_of_birth: '',
                        }));
                    }
                } else {
                    // Handle non-OK responses (e.g., 404 Not Found means patient doesn't exist)
                    setData(currentData => ({
                        ...currentData,
                        surname: '',
                        other_names: '',
                        gender: '',
                        date_of_birth: '',
                    }));
                }
            } catch (error) {
                console.error('Error fetching patient data:', error);
                setData(currentData => ({
                    ...currentData,
                    surname: '',
                    other_names: '',
                    gender: '',
                    date_of_birth: '',
                }));
            }
        } else {
            // If hospital_id is empty or only whitespace, clear the dependent fields
            setData(currentData => ({
                ...currentData,
                surname: '',
                other_names: '',
                gender: '',
                date_of_birth: '',
            }));
        }
    };

    const renderInputField = (
        id: keyof typeof data,
        label: string,
        type = 'text',
        placeholder?: string,
        config?: {
            autoFocus?: boolean;
            onBlur?: FocusEventHandler<HTMLInputElement>;
        }
    ) => (
        <div className="grid gap-2">
            <Label htmlFor={id}>{label}</Label>
            <Input
                id={id}
                name={id}
                type={type}
                value={data[id]}
                onChange={(e) => setData(id, e.target.value)}
                placeholder={placeholder || label}
                className="mt-1 block w-full"
                autoFocus={config?.autoFocus}
                onBlur={config?.onBlur}
            />
            <InputError message={errors[id]} className="mt-2" />
        </div>
    );

    const renderTextareaField = (id: keyof typeof data, label: string, placeholder?: string) => (
        <div className="grid gap-2">
            <Label htmlFor={id}>{label}</Label>
            <Textarea
                id={id}
                name={id}
                value={data[id]}
                onChange={(e) => setData(id, e.target.value)}
                placeholder={placeholder || label}
                className="mt-1 block w-full"
            />
            <InputError message={errors[id]} className="mt-2" />
        </div>
    );

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Create Patient and Test Record" />
            <div className="flex h-full flex-1 flex-col gap-4 rounded-xl p-4">

                {/* Form Container */}
                <div className="border-sidebar-border/70 dark:border-sidebar-border relative flex-1 overflow-hidden rounded-xl border p-4 md:p-6">
                    <form onSubmit={submit} className="space-y-8">
                        <div>
                            <h2 className="mb-4 text-xl font-semibold">Patient Details</h2>
                            <Table className='border'>
                                <TableHeader>
                                    <TableRow>
                                        <TableHead className="border p-2">Hospital No</TableHead>
                                        <TableHead className="border p-2">Surname</TableHead>
                                        <TableHead className="border p-2">Other Names</TableHead>
                                        <TableHead className="border p-2 w-[100px]">Sex</TableHead>
                                        <TableHead className="border p-2">DOB</TableHead>
                                        <TableHead className="border p-2">NICL</TableHead>
                                    </TableRow>
                                </TableHeader>
                                <TableBody>
                                    <TableRow>
                                        <TableCell className="border p-2"> {renderInputField('hospital_id', '', 'text', 'Hospital Id', {
                                            autoFocus: true,
                                            onBlur: handleHospitalIdBlur,
                                        })}</TableCell>
                                        <TableCell className="border p-2"> {renderInputField('surname', '', 'text', 'Surname')}</TableCell>
                                        <TableCell className="border p-2"> {renderInputField('other_names', '')}</TableCell>
                                        <TableCell className="border p-2"> {renderInputField('gender', '')} {/* Consider using Select/Radio for Gender */}</TableCell>
                                        <TableCell className="border p-2"> {renderInputField('date_of_birth', '', 'date')}</TableCell>
                                        <TableCell className="border p-2">{renderInputField('nicl', '')}</TableCell>
                                    </TableRow>
                                </TableBody>
                                <TableHeader>
                                    <TableRow>
                                        <TableHead className="border p-2">TEST DATE</TableHead>
                                        <TableHead className="border p-2">WEIGHT(kg)</TableHead>
                                        <TableHead className="border p-2">WC(cm)</TableHead>
                                        <TableHead className="border p-2 w-[100px]">HEIGHT(cm)</TableHead>
                                        <TableHead className="border p-2">BSA(m<sup>2</sup>)</TableHead>
                                        <TableHead className="border p-2">BP(mmHg)</TableHead>
                                    </TableRow>
                                </TableHeader>
                                <TableBody>
                                    <TableRow>
                                        <TableCell className="border p-2">
                                            {renderInputField('test_date', '', 'date')}
                                        </TableCell>
                                        <TableCell className="border p-2"> {renderInputField('weight', '')}</TableCell>
                                        <TableCell className="border p-2"> {renderInputField('wc_cm', '')}</TableCell>
                                        <TableCell className="border p-2"> {renderInputField('height', '')} {/* Consider using Select/Radio for Gender */}</TableCell>
                                        <TableCell className="border p-2"> {renderInputField('bsa', '', 'date')}</TableCell>
                                        <TableCell className="border p-2">{renderInputField('blood_pressure', '')}</TableCell>
                                    </TableRow>
                                </TableBody>
                            </Table>
                        </div>


                        <div className="flex justify-left mt-1 gap-2 align-middle">
                                <h2 className="mb-4 text-xl font-semibold">Indication for study:</h2>
                                {renderInputField('indication', '', 'text', 'Indication for Study')}
                        </div>
                        <div>
                            <h2 className="mb-4 text-xl font-semibold">Dimension</h2>
                            <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-4">
                                {renderInputField('aortic_root', 'Aortic Root', 'text', 'Optional')}
                                {renderInputField('la_ap', 'LA (AP)', 'text', 'Optional')}
                                {renderInputField('mv_excursion', 'MV Excursion', 'text', 'Optional')}
                                {renderInputField('ef_slope', 'EF Slope', 'text', 'Optional')}
                                {renderInputField('epss', 'EPSS', 'text', 'Optional')}
                                {renderInputField('rvid', 'RVID', 'text', 'Optional')}
                                {renderInputField('raa', 'RAA', 'text', 'Optional')}
                                {renderInputField('laa', 'LAA', 'text', 'Optional')}
                                {renderInputField('ivsd', 'IVSd', 'text', 'Optional')}
                                {renderInputField('lvidd', 'LVIDd', 'text', 'Optional')}
                                {renderInputField('lvpwd', 'LVPWd', 'text', 'Optional')}
                                {renderInputField('ivss', 'IVSs', 'text', 'Optional')}
                                {renderInputField('lvids', 'LVIDs', 'text', 'Optional')}
                                {renderInputField('lvpws', 'LVPWs', 'text', 'Optional')}
                                {renderInputField('fs', 'FS (%)', 'text', 'Optional')}
                                {renderInputField('ef', 'EF (%)', 'text', 'Optional')}
                            </div>
                        </div>

                        <div>
                            <h2 className="mb-4 text-xl font-semibold">Diastolic Function</h2>
                            <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-4">
                                {renderInputField('e_wave', 'E Wave', 'text', 'Optional')}
                                {renderInputField('a_wave', 'A Wave', 'text', 'Optional')}
                                {renderInputField('e_a', 'E/A Ratio', 'text', 'Optional')}
                                {renderInputField('e_wave_dt', 'E Wave DT', 'text', 'Optional')}
                                {renderInputField('e_lat', "E' (Lat)", 'text', 'Optional')}
                                {renderInputField('a_lat', "A' (Lat)", 'text', 'Optional')}
                                {renderInputField('s_lat', "S' (Lat)", 'text', 'Optional')}
                                {renderInputField('e_e', "E/E'", 'text', 'Optional')}
                                {renderInputField('ivrt', 'IVRT', 'text', 'Optional')}
                            </div>
                        </div>

                        <div>
                            <h2 className="mb-4 text-xl font-semibold">Doppler Measurements</h2>
                            <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
                                {renderInputField('aortic_valve_peak', 'Aortic Valve Peak Vel', 'text', 'Optional')}
                                {renderInputField('aortic_valve_press', 'Aortic Valve Press Grad', 'text', 'Optional')}
                                {renderInputField('pulmonary_valve_peak', 'Pulmonary Valve Peak Vel', 'text', 'Optional')}
                                {renderInputField('pulmonary_valve_press', 'Pulmonary Valve Press Grad', 'text', 'Optional')}
                                {renderInputField('triscupid_regurg_peak', 'Triscupid Regurg Peak Vel', 'text', 'Optional')}
                                {renderInputField('triscupid_regurg_press', 'Triscupid Regurg Press Grad', 'text', 'Optional')}
                                {renderInputField('mitral_regurg_peak', 'Mitral Regurg Peak Vel', 'text', 'Optional')}
                                {renderInputField('mitral_regurg_press', 'Mitral Regurg Press Grad', 'text', 'Optional')}
                                {renderInputField('aortic_regurg_peak', 'Aortic Regurg Peak Vel', 'text', 'Optional')}
                                {renderInputField('aortic_regurg_press', 'Aortic Regurg Press Grad', 'text', 'Optional')}
                                {renderInputField('mitral_stenosis', 'Mitral Stenosis', 'text', 'Optional')}
                                {renderInputField('inferior_vena_cava_insp', 'Inferior Vena Cava (Insp)', 'text', 'Optional')}
                                {renderInputField('inferior_vena_cava_expi', 'Inferior Vena Cava (Expi)', 'text', 'Optional')}
                                {renderInputField('inferior_vena_cava_diam', 'Inferior Vena Cava Diam', 'text', 'Optional')}
                                {renderInputField('est_right', 'Est. Right Atrial Pressure', 'text', 'Optional')}
                            </div>
                        </div>

                        <div>
                            <h2 className="mb-4 text-xl font-semibold">Final Report</h2>
                            <div className="grid grid-cols-1 gap-6">
                                {renderInputField('pericardium', 'Pericardium', 'text', 'Optional')}
                                {renderTextareaField('summary', 'Summary', 'Optional')}
                                {renderTextareaField('conclusion', 'Conclusion', 'Optional')}
                                {renderInputField('sign', 'Sign (Doctor)', 'text', 'Optional')}
                            </div>
                        </div>

                        <div className="flex items-center gap-4 pt-4">
                            <Button type="submit" disabled={processing}>
                                {processing ? 'Saving...' : 'Save Patient and Test Record'}
                            </Button>
                        </div>
                    </form>
                </div>
            </div>
        </AppLayout>
    );
}
