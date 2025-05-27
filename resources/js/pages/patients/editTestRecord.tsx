
import AppLayout from '@/layouts/app-layout';
import { type BreadcrumbItem } from '@/types';
import { Head, useForm } from '@inertiajs/react';
import { FormEventHandler, FocusEventHandler } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
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
        title: 'Patients',
        href: '/patients',
    },
    {
        title: 'Edit Test Record',
        href: '#',
    },
];

export default function EditTestRecordPage({ data: testRecord }: { data: {
    id: number;
    patient?: {
        surname: string;
        other_names: string;
        gender: string;
        hospital_id: string;
        date_of_birth: string;
        nicl: string;
    };
    test_date: string;
    weight: string;
    height: string;
    bsa: string;
    blood_pressure: string;
    wc_cm: string;
    indication: string;
    aortic_root: string;
    la_ap: string;
    mv_excursion: string;
    ef_slope: string;
    epss: string;
    rvid: string;
    raa: string;
    laa: string;
    ivsd: string;
    lvidd: string;
    lvpwd: string;
    ivss: string;
    lvids: string;
    lvpws: string;
    fs: string;
    ef: string;
    e_wave: string;
    a_wave: string;
    e_a: string;
    e_wave_dt: string;
    e_lat: string;
    a_lat: string;
    s_lat: string;
    e_e: string;
    ivrt: string;
    aortic_valve_peak: string;
    aortic_valve_press: string;
    pulmonary_valve_press: string;
    pulmonary_valve_peak: string;
    triscupid_regurg_peak: string;
    triscupid_regurg_press: string;
    mitral_regurg_peak: string;
    mitral_regurg_press: string;
    aortic_regurg_peak: string;
    aortic_regurg_press: string;
    mitral_stenosis: string;
    inferior_vena_cava_insp: string;
    inferior_vena_cava_expi: string;
    inferior_vena_cava_diam: string;
    pasp: string;
    mvsp: string;
    mpap: string;
    est_right: string;
    pericardium: string;
    summary: string;
    conclusion: string;
    sign: string;
}}) {
    const { data, setData, put, processing, errors } = useForm({
        // Patient fields
        surname: testRecord.patient?.surname || '',
        other_names: testRecord.patient?.other_names || '',
        gender: testRecord.patient?.gender || '',
        hospital_id: testRecord.patient?.hospital_id || '',
        date_of_birth: testRecord.patient?.date_of_birth || '',
        nicl: testRecord.patient?.nicl || '',
        // Test Record fields
        test_date: testRecord.test_date || '',
        weight: testRecord.weight || '',
        height: testRecord.height || '',
        bsa: testRecord.bsa || '',
        blood_pressure: testRecord.blood_pressure || '',
        wc_cm: testRecord.wc_cm || '',
        indication: testRecord.indication || '',
        // Dimension
        aortic_root: testRecord.aortic_root || '',
        la_ap: testRecord.la_ap || '',
        mv_excursion: testRecord.mv_excursion || '',
        ef_slope: testRecord.ef_slope || '',
        epss: testRecord.epss || '',
        rvid: testRecord.rvid || '',
        raa: testRecord.raa || '',
        laa: testRecord.laa || '',
        ivsd: testRecord.ivsd || '',
        lvidd: testRecord.lvidd || '',
        lvpwd: testRecord.lvpwd || '',
        ivss: testRecord.ivss || '',
        lvids: testRecord.lvids || '',
        lvpws: testRecord.lvpws || '',
        fs: testRecord.fs || '',
        ef: testRecord.ef || '',
        // Diastolic function
        e_wave: testRecord.e_wave || '',
        a_wave: testRecord.a_wave || '',
        e_a: testRecord.e_a || '',
        e_wave_dt: testRecord.e_wave_dt || '',
        e_lat: testRecord.e_lat || '',
        a_lat: testRecord.a_lat || '',
        s_lat: testRecord.s_lat || '',
        e_e: testRecord.e_e || '',
        ivrt: testRecord.ivrt || '',
        // Doppler measurements
        aortic_valve_peak: testRecord.aortic_valve_peak || '',
        aortic_valve_press: testRecord.aortic_valve_press || '',
        pulmonary_valve_press: testRecord.pulmonary_valve_press || '',
        pulmonary_valve_peak: testRecord.pulmonary_valve_peak || '',
        triscupid_regurg_peak: testRecord.triscupid_regurg_peak || '',
        triscupid_regurg_press: testRecord.triscupid_regurg_press || '',
        mitral_regurg_peak: testRecord.mitral_regurg_peak || '',
        mitral_regurg_press: testRecord.mitral_regurg_press || '',
        aortic_regurg_peak: testRecord.aortic_regurg_peak || '',
        aortic_regurg_press: testRecord.aortic_regurg_press || '',
        mitral_stenosis: testRecord.mitral_stenosis || '',
        inferior_vena_cava_insp: testRecord.inferior_vena_cava_insp || '',
        inferior_vena_cava_expi: testRecord.inferior_vena_cava_expi || '',
        inferior_vena_cava_diam: testRecord.inferior_vena_cava_diam || '',
        est_right: testRecord.est_right || '',
        pericardium: testRecord.pericardium || '',
        mpap: testRecord.mpap || '',
        mvsp: testRecord.mvsp || '',
        pasp: testRecord.pasp || '',
        summary: testRecord.summary || '',
        conclusion: testRecord.conclusion || '',
        sign: testRecord.sign || '',
    });

    const submit: FormEventHandler = (e) => {
        e.preventDefault();
        put(route('patients.updateTestRecord', testRecord.id), {
            onSuccess: () => {
                // Redirect to the patient's test record page
                window.location.href = route('patients.showTest', testRecord.id);
            },
        });
    };
    const handleBSACalc: FocusEventHandler<HTMLInputElement> = async () => {
        if (data.height && data.weight) {
            const heightInMeters = Number(data.height) / 3600;
            const bsa = Math.sqrt(Number(data.weight) * heightInMeters);
            setData('bsa', bsa.toFixed(2));
        }
    };
    const handleEACalc: FocusEventHandler<HTMLInputElement> = async () => {
        if (data.e_wave && data.a_wave) {
            const e_a = Number(data.e_wave) / Number(data.a_wave);
            setData('e_a', e_a.toFixed(2));
        }
    };
    const handleEECalc: FocusEventHandler<HTMLInputElement> = async () => {
        if (data.e_wave && data.e_lat) {
            const e_e = Number(data.e_wave) / Number(data.e_lat);
            setData('e_e', e_e.toFixed(2));
        }
    };
    const handleRVSPCalc: FocusEventHandler<HTMLInputElement> = async () => {
        if (data.triscupid_regurg_peak) {
            const rvsp = Math.pow(Number(data.triscupid_regurg_peak), 2);
            setData('mvsp', rvsp.toFixed(2));
        }
    }
    const handlePASPCalc: FocusEventHandler<HTMLInputElement> = async () => {
        if (data.mvsp && data.est_right) {
            const pasp = Number(data.mvsp) + Number(data.est_right);
            setData('pasp', pasp.toFixed(2));
            const mpap = (0.61 * Number(data.pasp)) + 2;
            setData('mpap', mpap.toFixed(2));
        }



    }
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
            <Head title="Edit Test Record" />
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
                                            autoFocus: false,
                                        })}</TableCell>
                                        <TableCell className="border p-2"> {renderInputField('surname', '', 'text', 'Surname')}</TableCell>
                                        <TableCell className="border p-2"> {renderInputField('other_names', '')}</TableCell>
                                        <TableCell className="border p-2"> <div className="grid gap-2">
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

                                        </div> </TableCell>
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
                                        <TableCell className="border p-2"> {renderInputField('weight', '', 'nmber')}</TableCell>
                                        <TableCell className="border p-2"> {renderInputField('wc_cm', '')}</TableCell>
                                        <TableCell className="border p-2"> {renderInputField('height', '', 'number')} </TableCell>
                                        <TableCell className="border p-2"> {renderInputField('bsa', '', 'number', '',{
                                            onBlur: handleBSACalc
                                        })}</TableCell>
                                        <TableCell className="border p-2">{renderInputField('blood_pressure', '', 'number')}</TableCell>
                                    </TableRow>
                                </TableBody>
                            </Table>
                        </div>

                        <div className="flex justify-evenly mt-1 gap-2 align-center">
                            <h2 className="text-xl font-semibold mt-2">Indication for study:</h2>
                            {renderInputField('indication', '', 'text', 'Indication for Study')}
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
                                    <TableCell className="border p-1"> {renderInputField('e_a', '', 'number', '',{
                                        onBlur: handleEACalc
                                    })}</TableCell>
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
                                    <TableCell className="border p-1"> {renderInputField('e_e', '', 'number', '',{
                                        onBlur: handleEECalc
                                    })}</TableCell>
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


                        <Table className='mt-1'>

                            <TableBody>
                                <TableRow>
                                    <TableCell className="border p-1"> Aortic Valve(Peak vel)</TableCell>

                                    <TableCell className="border p-1"> {renderInputField('aortic_valve_peak', '', 'number', '')}</TableCell>
                                    <TableCell className="border p-1"> Pulmonary valve (Peak vel)</TableCell>

                                    <TableCell className="border p-1"> {renderInputField('pulmonary_valve_peak', '', 'number', '')}</TableCell>
                                </TableRow>
                                <TableRow>
                                    <TableCell className="border p-1"> Aortic valve (pressure gradient)</TableCell>

                                    <TableCell className="border p-1"> {renderInputField('aortic_valve_press', '', 'number', '')}</TableCell>
                                    <TableCell className="border p-1"> Pulmonary valve (pressure gradient)</TableCell>

                                    <TableCell className="border p-1"> {renderInputField('pulmonary_valve_press', '', 'number', '')}</TableCell>
                                </TableRow>
                            </TableBody>
                        </Table>
                        <Table className='nt-1'>
                            <TableBody>
                                <TableRow>
                                    <TableCell className="border p-1"> TRV<sub>max</sub></TableCell>
                                    <TableCell className="border p-1">
                                        {renderInputField('triscupid_regurg_peak', '', 'number')}
                                    </TableCell>
                                    <TableCell className="border p-1">
                                        TR<sub>max</sub>PG
                                    </TableCell>
                                    <TableCell className="border p-1">
                                        {renderInputField('triscupid_regurg_press', '', 'number', '', {
                                            onBlur: handleRVSPCalc
                                        })}
                                    </TableCell>
                                    <TableCell className="border p-1"> MRV <sub>max</sub></TableCell>
                                    <TableCell className="border p-1"> {renderInputField('mitral_regurg_peak', '', 'number', '')}</TableCell>
                                </TableRow>
                                <TableRow>
                                    <TableCell className="border p-1"> MR<sub>max</sub>PG</TableCell>
                                    <TableCell className="border p-1">
                                        {renderInputField('mitral_regurg_press', '', 'number', '')}
                                    </TableCell>
                                    <TableCell className="border p-1">
                                        ARV<sub>max</sub>
                                    </TableCell>
                                    <TableCell className="border p-1">
                                        {renderInputField('aortic_regurg_peak', '', 'number', '')}
                                    </TableCell>
                                    <TableCell className="border p-1">
                                        AR<sub>max</sub>PG
                                    </TableCell>
                                    <TableCell className="border p-1">
                                        {renderInputField('aortic_regurg_press', '', 'number', '')}
                                    </TableCell>
                                </TableRow>
                                <TableRow>
                                    <TableCell className="border p-1">
                                        Mitral Stenosis (valve Area)
                                    </TableCell>
                                    <TableCell className="border p-1">
                                        {renderInputField('mitral_stenosis', '', 'number', '')}
                                    </TableCell>
                                    <TableCell className="border p-1">
                                        IVC<sub>(ins)</sub>
                                    </TableCell>
                                    <TableCell className="border p-1">
                                        {renderInputField('inferior_vena_cava_insp', '', 'number', '')}
                                    </TableCell>
                                    <TableCell className="border p-1">
                                        IVC<sub>(ex)</sub>
                                    </TableCell>
                                    <TableCell className="border p-1">
                                        {renderInputField('inferior_vena_cava_expi', '', 'number', '')}
                                    </TableCell>
                                </TableRow>
                                <TableRow>
                                    <TableCell className="border p-1">
                                        IVC<sub>(diameter with valva manoeuvre)</sub>
                                    </TableCell>
                                    <TableCell className="border p-1">
                                        {renderInputField('inferior_vena_cava_diam', '', 'number', '')}
                                    </TableCell>
                                    <TableCell className="border p-1">
                                        Est. Right Aterial pressure
                                    </TableCell>
                                    <TableCell className="border p-1">
                                        {renderInputField('est_right', '', 'number', '', {
                                            onBlur: handlePASPCalc
                                        })}
                                    </TableCell>
                                    <TableCell className="border p-1">
                                        PASP
                                    </TableCell>
                                    <TableCell className="border p-1">
                                        {renderInputField('pasp', '', 'number', '')}
                                    </TableCell>
                                </TableRow>
                                <TableRow>
                                    <TableCell className="border p-1">
                                        MPAP
                                    </TableCell>
                                    <TableCell className="border p-1">
                                        {renderInputField('mpap', '', 'number', '')}
                                    </TableCell>
                                    <TableCell className="border p-1">
                                        RVSP
                                    </TableCell>
                                    <TableCell className="border p-1">
                                        {renderInputField('mvsp', '', 'number', '')}
                                    </TableCell>
                                    <TableCell className="border p-1"> </TableCell>
                                    <TableCell className="border p-1"> </TableCell>
                                </TableRow>
                            </TableBody>
                        </Table>
                        <div>
                            <h2 className="mb-4 text-xl font-semibold">Final Report</h2>
                            <div className="grid grid-cols-1 gap-6">
                                <div className="grid gap-2">
                                    <Select
                                        value={data.pericardium}
                                        onValueChange={(value) => setData('pericardium', value)}
                                    >
                                        <SelectTrigger className="w-[250px]">
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
                                <Label>Signed:</Label>
                                <Select value='{data.sign}'
                                    onValueChange={(value) => setData('sign', value)}
                                >
                                    <SelectTrigger className="w-full">
                                        <SelectValue placeholder="Signed" />
                                    </SelectTrigger>

                                    <SelectContent>
                                        <SelectItem value="Dr. SALAU (FWACP)">Dr. SALAU (FWACP)</SelectItem>
                                        <SelectItem value="DR. ABIODUN (FWACP)">DR. ABIODUN (FWACP)</SelectItem>
                                        <SelectItem value="DR. BELLO (FWACP)">DR. BELLO (FWACP)</SelectItem>
                                        <SelectItem value="DR. SAMBO (FWACP)">DR. SAMBO (FWACP)</SelectItem>
                                        <SelectItem value="DR. MOHAMMED, DR. SALAU (FWACP)">DR. MOHAMMED,DR. SALAU (FWACP)</SelectItem>
                                        <SelectItem value="DR. MOHAMMED, DR. ABIODUN (FWACP)">DR. MOHAMMED,DR. ABIODUN (FWACP)</SelectItem>
                                        <SelectItem value="DR. MOHAMMED, DR. BELLO (FWACP)">DR. MOHAMMED,DR. BELLO (FWACP)</SelectItem>
                                        <SelectItem value="DR. MOHAMMED, DR. SAMBO (FWACP)">DR. MOHAMMED,DR. SAMBO (FWACP)</SelectItem>
                                        <SelectItem value="DR. BASSEY, DR. SALAU (FWACP)">DR. BASSEY,DR. SALAU (FWACP)</SelectItem>
                                        <SelectItem value="DR. BASSEY, DR. ABIODUN (FWACP)">DR. BASSEY,DR. ABIODUN (FWACP)</SelectItem>
                                        <SelectItem value="DR. BASSEY, DR. BELLO (FWACP)">DR. BASSEY,DR. BELLO (FWACP)</SelectItem>
                                        <SelectItem value="DR. BASSEY, DR. SAMBO (FWACP)">DR. BASSEY,DR. SAMBO (FWACP)</SelectItem>
                                        <SelectItem value="DR. OBODO, DR. SALAU (FWACP)">DR. OBODO ,DR. SALAU (FWACP)</SelectItem>
                                        <SelectItem value="DR. OBODO, DR. ABIODUN (FWACP)">DR. OBODO ,DR. ABIODUN (FWACP)</SelectItem>
                                        <SelectItem value="DR. OBODO, DR. BELLO (FWACP)">DR. OBODO ,DR. BELLO (FWACP)</SelectItem>
                                        <SelectItem value="DR. OBODO, DR. SAMBO (FWACP)">DR. OBODO ,DR. SAMBO (FWACP)</SelectItem>
                                    </SelectContent>

                                </Select>
                            </div>
                        </div>
                        <div className="flex justify-end space-x-2">
                            <Button type="button" variant="outline" onClick={() => window.history.back()}>
                                Cancel
                            </Button>
                            <Button type="submit" disabled={processing}>
                                Update Test Record
                            </Button>
                        </div>
                    </form>
                </div>
            </div>
        </AppLayout>
    );
}
