
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
import {
    Select,
    SelectContent,

    SelectItem,

    SelectTrigger,
    SelectValue,
} from "@/components/ui/select"

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Create Patient',
        href: '/patients/create',
    },
];

export default function CreatePatientPage() {
    const { data, setData, post, processing, errors } = useForm({
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
        pasp: '',
        mpap: '',
        mvsp:'',
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
            onSuccess: (id) => {
                console.log('Patient created successfully!');
                // You can redirect the user to the patient's profile page or any other page
                window.location.href = route('patients.showTestRecord', { testRecord: id });
            },
        });
    };

    const handleHospitalIdBlur: FocusEventHandler<HTMLInputElement> = async () => {
        if (data.hospital_id && data.hospital_id.trim() !== '') {
            console.log(data.hospital_id);
            try {
                // Assuming route() is globally available (e.g., from Ziggy)
                const response = await fetch(route('patients.search', { patient: data.hospital_id }));

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
    const handleBSACalc: FocusEventHandler<HTMLInputElement> = async() => {
        if (data.height && data.weight) {
            const heightInMeters = Number(data.height) / 3600;
            const bsa = Math.sqrt(Number(data.weight) * heightInMeters);
            setData('bsa', bsa.toFixed(2));
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
                readOnly={id === 'bsa'}
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
                                        <TableCell className="border p-2">
                                            <div className="grid gap-2">
                                                <Select
                                                    value={data.gender}
                                                    onValueChange={(value) => setData('gender', value)}
                                                >
                                                    <SelectTrigger className="w-[180px]">
                                                        <SelectValue placeholder="Gender" />
                                                    </SelectTrigger>

                                                    <SelectContent>
                                                        <SelectItem value="male">Male</SelectItem>
                                                        <SelectItem value="female">Female</SelectItem>
                                                    </SelectContent>
                                                </Select>
                                                <InputError message={errors.gender} className="mt-2" />
                                            </div>
                                        </TableCell>
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
                                        <TableCell className="border p-2"> {renderInputField('weight', '','number', 'Weight(kg)', {
                                            onBlur: handleBSACalc,
                                        })}</TableCell>
                                        <TableCell className="border p-2"> {renderInputField('wc_cm', '')}</TableCell>
                                        <TableCell className="border p-2"> {renderInputField('height', '', 'number', 'Height(cm)', {
                                            onBlur: handleBSACalc,
                                        })} {/* Consider using Select/Radio for Gender */}</TableCell>
                                        <TableCell className="border p-2"> {renderInputField('bsa', '')}</TableCell>
                                        <TableCell className="border p-2">{renderInputField('blood_pressure', '')}</TableCell>
                                    </TableRow>
                                </TableBody>
                            </Table>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-3 border rounded justify-items-end items-center pb-1">
                            <h2 className="text-xl font-semibold mt-2">Indication for study:</h2>
                            <div className='w-full md:col-span-2'>
                                 {renderInputField('indication', '', 'text', 'Indication for Study')}
                            </div>

                        </div>
                        <Table className='border'>
                           <TableHeader>
                                <TableRow>
                                    <TableHead className="border p-2">Dimensions</TableHead>
                                    <TableHead className="border p-2">Normal</TableHead>
                                    <TableHead className="border p-2 w-[150px]">Patient Value</TableHead>
                                    <TableHead className="border p-2"></TableHead>
                                    <TableHead className="border p-2">Normal</TableHead>
                                    <TableHead className="border p-2 w-[150px]">Patient Value</TableHead>
                                </TableRow>
                            </TableHeader>
                            <TableBody>
                                <TableRow>
                                    <TableCell className="border p-1"> Aortic Root</TableCell>
                                    <TableCell className="border p-1"> 20-40 mm</TableCell>
                                    <TableCell className="border p-1"> {renderInputField('aortic_root', '', 'number', 'Aortic Root')}</TableCell>
                                    <TableCell className="border p-1"> IVSD(mm)</TableCell>
                                    <TableCell className="border p-1"> 6 - 11</TableCell>
                                    <TableCell className="border p-1"> {renderInputField('ivsd', '', 'number', 'IVSD')}</TableCell>
                                </TableRow>
                                <TableRow>
                                    <TableCell className="border p-1"> LA(AP)</TableCell>
                                    <TableCell className="border p-1"> 20-40 mm</TableCell>
                                    <TableCell className="border p-1"> {renderInputField('la_ap', '', 'number', 'LA (AP)')}</TableCell>
                                    <TableCell className="border p-1"> LVIDd(mm)</TableCell>
                                    <TableCell className="border p-1"> 38 - 55</TableCell>
                                    <TableCell className="border p-1"> {renderInputField('lvidd', '', 'number', 'LVIDd')}</TableCell>
                                </TableRow>
                                <TableRow>
                                    <TableCell className="border p-1"> MV Excursion</TableCell>
                                    <TableCell className="border p-1"> </TableCell>
                                    <TableCell className="border p-1"> {renderInputField('mv_excursion', '', 'number', 'MV Excursion')}</TableCell>
                                    <TableCell className="border p-1"> LVPWD(mm)</TableCell>
                                    <TableCell className="border p-1"> 6 - 11</TableCell>
                                    <TableCell className="border p-1"> {renderInputField('lvpwd', '', 'number', 'LVIDd')}</TableCell>
                                </TableRow>
                                <TableRow>
                                    <TableCell className="border p-1"> EF slope (mm/s)</TableCell>
                                    <TableCell className="border p-1"> 50-180 </TableCell>
                                    <TableCell className="border p-1"> {renderInputField('ef_slope', '', 'number', 'EF slope')}</TableCell>
                                    <TableCell className="border p-1"> IVSs</TableCell>
                                    <TableCell className="border p-1"> </TableCell>
                                    <TableCell className="border p-1"> {renderInputField('ivss', '', 'number', 'IVSS')}</TableCell>
                                </TableRow>
                                <TableRow>
                                    <TableCell className="border p-1"> EPSS(mm)</TableCell>
                                    <TableCell className="border p-1"> &le; 10 </TableCell>
                                    <TableCell className="border p-1"> {renderInputField('epss', '', 'number', 'EPSS')}</TableCell>
                                    <TableCell className="border p-1"> LVIDs</TableCell>
                                    <TableCell className="border p-1"> </TableCell>
                                    <TableCell className="border p-1"> {renderInputField('lvids', '', 'number', 'LVIDs')}</TableCell>
                                </TableRow>
                                <TableRow>
                                    <TableCell className="border p-1"> RVID(mm)</TableCell>
                                    <TableCell className="border p-1"> 27 - 33</TableCell>
                                    <TableCell className="border p-1"> {renderInputField('rvid', '', 'number', 'RVID')}</TableCell>
                                    <TableCell className="border p-1"> LVPWs</TableCell>
                                    <TableCell className="border p-1"> </TableCell>
                                    <TableCell className="border p-1"> {renderInputField('lvpws', '', 'number', 'LVPWs')}</TableCell>
                                </TableRow>
                                <TableRow>
                                    <TableCell className="border p-1"> RAA(cm<sup>2</sup>)</TableCell>
                                    <TableCell className="border p-1"> 27 - 33</TableCell>
                                    <TableCell className="border p-1"> {renderInputField('raa', '', 'number', 'RAA')}</TableCell>
                                    <TableCell className="border p-1"> FS(%)</TableCell>
                                    <TableCell className="border p-1">25-45 </TableCell>
                                    <TableCell className="border p-1"> {renderInputField('fs', '', 'number', 'FS')}</TableCell>
                                </TableRow>
                                <TableRow>
                                    <TableCell className="border p-1"> LAA(cm<sup>2</sup>)</TableCell>
                                    <TableCell className="border p-1"> &le; 20</TableCell>
                                    <TableCell className="border p-1"> {renderInputField('laa', '', 'number', 'LAA')}</TableCell>
                                    <TableCell className="border p-1"> EF(%)</TableCell>
                                    <TableCell className="border p-1">&gt; 45 </TableCell>
                                    <TableCell className="border p-1"> {renderInputField('ef', '', 'number', 'EF')}</TableCell>
                                </TableRow>
                           </TableBody>
                        </Table>
                        <Table className='mt-1'>
                            <TableHeader>
                                <TableRow>
                                    <TableHead className="border p-2">Diastolic Function</TableHead>
                                    <TableHead className="border p-2">Normal</TableHead>
                                    <TableHead className="border p-2 w-[150px]">Patient Value</TableHead>
                                    <TableHead className="border p-2"></TableHead>
                                    <TableHead className="border p-2">Normal</TableHead>
                                    <TableHead className="border p-2 w-[150px]">Patient Value</TableHead>
                                </TableRow>
                            </TableHeader>
                            <TableBody>
                                <TableRow>
                                    <TableCell className="border p-1"> E Wave (m/s)</TableCell>
                                    <TableCell className="border p-1"> </TableCell>
                                    <TableCell className="border p-1"> {renderInputField('e_wave', '', 'number', 'E Wave')}</TableCell>
                                    <TableCell className="border p-1"> E' (lat)(m/s)</TableCell>
                                    <TableCell className="border p-1"></TableCell>
                                    <TableCell className="border p-1"> {renderInputField('e_lat', '', 'number', '')}</TableCell>
                                </TableRow>
                                <TableRow>
                                    <TableCell className="border p-1"> A Wave(m/s)</TableCell>
                                    <TableCell className="border p-1"> </TableCell>
                                    <TableCell className="border p-1"> {renderInputField('a_wave', '', 'number', '')}</TableCell>
                                    <TableCell className="border p-1"> A'(lat)(m/s)</TableCell>
                                    <TableCell className="border p-1"> </TableCell>
                                    <TableCell className="border p-1"> {renderInputField('a_lat', '', 'number', '')}</TableCell>
                                </TableRow>
                                <TableRow>
                                    <TableCell className="border p-1"> E/A</TableCell>
                                    <TableCell className="border p-1"> </TableCell>
                                    <TableCell className="border p-1"> {renderInputField('e_a', '', 'number', '')}</TableCell>
                                    <TableCell className="border p-1"> S' (lat)(m/s)</TableCell>
                                    <TableCell className="border p-1"> </TableCell>
                                    <TableCell className="border p-1"> {renderInputField('s_lat', '', 'number', '')}</TableCell>
                                </TableRow>
                                <TableRow>
                                    <TableCell className="border p-1"> E wave DT(m/s)</TableCell>
                                    <TableCell className="border p-1"> </TableCell>
                                    <TableCell className="border p-1"> {renderInputField('e_wave_dt', '', 'number', '')}</TableCell>
                                    <TableCell className="border p-1"> E/E'</TableCell>
                                    <TableCell className="border p-1"> &le;15</TableCell>
                                    <TableCell className="border p-1"> {renderInputField('e_e', '', 'number', '')}</TableCell>
                                </TableRow>
                                <TableRow>
                                    <TableCell className="border p-1"> IVRT(m/s)</TableCell>
                                    <TableCell className="border p-1"> </TableCell>
                                    <TableCell className="border p-1"> {renderInputField('ivrt', '', 'number', '')}</TableCell>
                                    <TableCell className="border p-1"> </TableCell>
                                    <TableCell className="border p-1"> </TableCell>
                                    <TableCell className="border p-1"> </TableCell>
                                </TableRow>
                            </TableBody>
                        </Table>
                        <Table className='mt-1'>
                            <TableHeader>
                                <TableRow>
                                    <TableHead className="border p-2">Doppler Measurements</TableHead>
                                    <TableHead className="border p-2">Normal</TableHead>
                                    <TableHead className="border p-2 w-[150px]">Patient Value</TableHead>
                                    <TableHead className="border p-2"></TableHead>
                                    <TableHead className="border p-2">Normal</TableHead>
                                    <TableHead className="border p-2 w-[150px]">Patient Value</TableHead>
                                </TableRow>
                            </TableHeader>
                            <TableBody>
                                <TableRow>
                                    <TableCell className="border p-1"> Aortic Valve(Peak vel)</TableCell>
                                    <TableCell className="border p-1"> </TableCell>
                                    <TableCell className="border p-1"> {renderInputField('aortic_valve_peak', '', 'number', '')}</TableCell>
                                    <TableCell className="border p-1"> Pulmonary valve (Peak vel)</TableCell>
                                    <TableCell className="border p-1"> </TableCell>
                                    <TableCell className="border p-1"> {renderInputField('pulmonary_valve_peak', '', 'number', '')}</TableCell>
                                </TableRow>
                                <TableRow>
                                    <TableCell className="border p-1"> Aortic valve (pressure gradient)</TableCell>
                                    <TableCell className="border p-1"> </TableCell>
                                    <TableCell className="border p-1"> {renderInputField('aortic_valve_press', '', 'number', '')}</TableCell>
                                    <TableCell className="border p-1"> Pulmonary valve (pressure gradient)</TableCell>
                                    <TableCell className="border p-1"> </TableCell>
                                    <TableCell className="border p-1"> {renderInputField('pulmonary_valve_press', '', 'number', '')}</TableCell>
                                </TableRow>
                            </TableBody>
                        </Table>


                        <div>

                            <div className="grid grid-cols-1 gap-6 md:grid-cols-2 border rounded p-2">
                                {renderInputField('triscupid_regurg_peak', 'Triscupid Regurgitation (Peak Velocity)', 'text', 'Optional')}
                                {renderInputField('triscupid_regurg_press', 'Triscupid Regurgitation (Peak pressure gradient)', 'text', 'Optional')}
                                {renderInputField('mitral_regurg_peak', 'Mitral Regurgitation (Peak Velocity)', 'text', 'Optional')}
                                {renderInputField('mitral_regurg_press', 'Mitral Regurgitation (Pressure Gradient)', 'text', 'Optional')}
                                {renderInputField('aortic_regurg_peak', 'Aortic Regurgitation (Peak Velocity)', 'text', 'Optional')}
                                {renderInputField('aortic_regurg_press', 'Aortic Regurgitation (Pressure Gradient)', 'text', 'Optional')}
                                {renderInputField('mitral_stenosis', 'Mitral Stenosis(Valve Area) ', 'text', 'Optional')}
                                {renderInputField('inferior_vena_cava_insp', 'Inferior Vena Cava (Diameter in Inspiration)', 'text', 'Optional')}
                                {renderInputField('inferior_vena_cava_expi', 'Inferior Vena Cava (Diameter in Expiration)', 'text', 'Optional')}
                                {renderInputField('inferior_vena_cava_diam', 'Inferior Vena Cava (Diameter with valsalva manoeuvre)', 'text', 'Optional')}
                                {renderInputField('est_right', 'Est. Right Atrial Pressure', 'text', 'Optional')}
                            </div>
                        </div>

                        <div>
                            <h2 className="mb-4 text-xl font-semibold">Final Report</h2>
                            <div className="grid grid-cols-1 gap-6">
                                <div className="grid gap-2">
                                    <Select
                                        value={data.pericardium}
                                        onValueChange={(value) => setData('pericardium', value)}
                                    >
                                        <SelectTrigger className="w-[180px]">
                                            <SelectValue placeholder="Pericardium" />
                                        </SelectTrigger>

                                        <SelectContent>
                                            <SelectItem value="Normal">Normal</SelectItem>
                                            <SelectItem value="Abnormal">Abnormal</SelectItem>
                                        </SelectContent>
                                    </Select>
                                    <InputError message={errors.gender} className="mt-2" />
                                </div>
                                {renderTextareaField('summary', 'Summary', 'Optional')}
                                {renderTextareaField('conclusion', 'Conclusion', 'Optional')}

                            </div>
                            <div className="mt-3">
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
