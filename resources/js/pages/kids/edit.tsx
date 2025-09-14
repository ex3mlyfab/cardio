import InputError from '@/components/input-error';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Textarea } from '@/components/ui/textarea';
import AppLayout from '@/layouts/app-layout';
import { type BreadcrumbItem } from '@/types';
import { Head, useForm } from '@inertiajs/react';
import { FocusEventHandler, FormEventHandler } from 'react';

import { cn } from '@/lib/utils';
import * as TabsPrimitive from '@radix-ui/react-tabs';

// Custom Tabs components with styling
const Tabs = TabsPrimitive.Root;

const TabsList = React.forwardRef<React.ElementRef<typeof TabsPrimitive.List>, React.ComponentPropsWithoutRef<typeof TabsPrimitive.List>>(
    ({ className, ...props }, ref) => (
        <TabsPrimitive.List
            ref={ref}
            className={cn('bg-muted text-muted-foreground inline-flex h-10 items-center justify-center rounded-md p-1', className)}
            {...props}
        />
    ),
);
TabsList.displayName = TabsPrimitive.List.displayName;

import React from 'react';
import test from 'node:test';

const TabsTrigger = React.forwardRef<React.ElementRef<typeof TabsPrimitive.Trigger>, React.ComponentPropsWithoutRef<typeof TabsPrimitive.Trigger>>(
    ({ className, ...props }, ref) => (
        <TabsPrimitive.Trigger
            ref={ref}
            className={cn(
                'ring-offset-background focus-visible:ring-ring data-[state=active]:bg-background data-[state=active]:text-foreground inline-flex items-center justify-center rounded-sm px-3 py-1.5 text-sm font-medium whitespace-nowrap transition-all focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:outline-none disabled:pointer-events-none disabled:opacity-50 data-[state=active]:shadow-sm',
                className,
            )}
            {...props}
        />
    ),
);
TabsTrigger.displayName = TabsPrimitive.Trigger.displayName;

const TabsContent = React.forwardRef<React.ElementRef<typeof TabsPrimitive.Content>, React.ComponentPropsWithoutRef<typeof TabsPrimitive.Content>>(
    ({ className, ...props }, ref) => (
        <TabsPrimitive.Content
            ref={ref}
            className={cn(
                'ring-offset-background focus-visible:ring-ring mt-2 focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:outline-none',
                className,
            )}
            {...props}
        />
    ),
);
TabsContent.displayName = TabsPrimitive.Content.displayName;

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Create New Test Record',
        href: '/patients/paed-create',
    },
];

export default function CreateKidPage({data:testRecord}:{data:{
id:number;
patient: {
        surname: string;
        other_names: string;
        gender: string;
        hospital_id: string;
        date_of_birth: string;
        phone_number: string;
        age: string;
    },
        referring: string;

        // Test Record fields
        test_date: string;
        weight: string;
        height: string;
        bsa: string;
        blood_pressure: string;
        indication: string;
        // Dimension
        heart_rate: string;
        spo2: string;
        //2d summary
        abdominal_situs: string;
        cardiac_position: string;
        systemic_venous_drainage: string;
        pulmonary_venous_drainage: string;
        atrio_ventricular_connection: string;
        ventricular_arterial_connection: string;
        ventricular_loop: string;
        left_atrium: string;
        right_atrium: string;
        mitral_av: string;
        triscupid: string;
        left_ventricle: string;
        right_ventricle: string;

        // Diastolic function
        interatrial_septum: string;
        interventricular_septum: string;
        aortic_arteries: string;
        pulmonary_arteries: string;
        outflow_tract: string;
        arch: string;
        pda: string;
        corona_arteries: string;
        pulmonary: string;
        aorta: string;
        pulmonary_artery: string;
        pulmonary_valve: string;
        aortic_valve: string;

        // Doppler
        mitral: string;
        aortic: string;
        triscupid_doppler: string;
        pulmonary_doppler: string;
        // m-mode
        ao: string;
        lvidd: string;
        ivsd: string;
        edv: string;
        la_ao: string;
        la: string;
        lvids: string;
        pwd: string;
        esv: string;
        ef: string;
        fs: string;
        cardiac_output: string;
        cardiac_index: string;
        recommendations: string;
        summary: string;
        conclusion: string;

        doctor_name: string;
}}) {
    const { data, setData, post, processing, errors } = useForm({
        // Patient fields
        surname: testRecord.patient.surname || '',
        other_names: testRecord.patient.other_names || '',
        gender: testRecord.patient.gender,
        hospital_id: testRecord.patient.hospital_id || '',
        date_of_birth: testRecord.patient.date_of_birth || '',
        phone_number: testRecord.patient.phone_number || '',
        age: testRecord.patient.age || '',
        referring: testRecord.referring || '',

        // Test Record fields
        test_date: testRecord.test_date || '',
        weight: testRecord.weight || '',
        height: testRecord.height || '',
        bsa: testRecord.bsa || '',
        blood_pressure: testRecord.blood_pressure || '',
        indication: testRecord.indication || '',
        // Dimension
        heart_rate: testRecord.heart_rate || '',
        spo2: testRecord.spo2 || '',
        //2d summary
        abdominal_situs: testRecord.abdominal_situs || '',
        cardiac_position: testRecord.cardiac_position || '',
        systemic_venous_drainage: testRecord.systemic_venous_drainage || '',
        pulmonary_venous_drainage: testRecord.pulmonary_venous_drainage || '',
        atrio_ventricular_connection: testRecord.atrio_ventricular_connection|| '',
        ventricular_arterial_connection: testRecord.ventricular_arterial_connection || '',
        ventricular_loop: testRecord.ventricular_loop || '',
        left_atrium: testRecord.left_atrium|| '',
        right_atrium: testRecord.right_atrium || '',
        mitral_av: testRecord.mitral_av || '',
        triscupid: testRecord.triscupid || '',
        left_ventricle: testRecord.left_ventricle || '',
        right_ventricle: testRecord.right_ventricle || '',

        // Diastolic function
        interatrial_septum: testRecord.interatrial_septum || '',
        interventricular_septum: testRecord.interventricular_septum || '',
        aortic_arteries: testRecord.aortic_arteries || '',
        pulmonary_arteries: testRecord.pulmonary_arteries || '',
        outflow_tract: testRecord.outflow_tract || '',
        arch: testRecord.arch || '',
        pda: testRecord.pda || '',
        corona_arteries: testRecord.corona_arteries || '',
        pulmonary: testRecord.pulmonary || '',
        aorta: testRecord.aorta || '',
        pulmonary_artery: testRecord.pulmonary_artery || '',
        pulmonary_valve: testRecord.pulmonary_valve|| '',
        aortic_valve: testRecord.aortic_valve || '',

        // Doppler
        mitral: testRecord.mitral || '',
        aortic: testRecord.aortic || '',
        triscupid_doppler: testRecord.triscupid_doppler || '',
        pulmonary_doppler: testRecord.pulmonary_doppler || '',
        // m-mode
        ao: testRecord.ao || '',
        lvidd: testRecord.lvidd || '',
        ivsd: testRecord.ivsd || '',
        edv: testRecord.edv || '',
        la_ao: testRecord.la_ao || '',
        la: testRecord.la || '',
        lvids: testRecord.lvids || '',
        pwd: testRecord.pwd || '',
        esv: testRecord.esv || '',
        ef: testRecord.ef || '',
        fs: testRecord.fs || '',
        cardiac_output: testRecord.cardiac_output || '',
        cardiac_index: testRecord.cardiac_index || '',
        recommendations: testRecord.recommendations || '',
        summary: testRecord.summary || '',
        conclusion: testRecord.conclusion || '',

        doctor_name: testRecord.doctor_name || '',
    });

    // Add this function to handle keydown events
    const handleKeyDown = (e: React.KeyboardEvent) => {
        // Prevent form submission when Enter key is pressed
        if (e.key === 'Enter') {
            e.preventDefault();
        }
    };

    const submit: FormEventHandler = (e) => {
        e.preventDefault();
        // You'll need to define this route in your Laravel backend
        post(route('kids.update', testRecord.id), {
            onSuccess: (id) => {
                console.log('Patient created successfully!');
                // You can redirect the user to the patient's profile page or any other page
                window.location.href = route('patients.showTestRecord', { testRecord: id });
            },
        });
    };

    // Calculation handlers
    const handleBSACalc: FocusEventHandler<HTMLInputElement> = async () => {
        if (data.height && data.weight) {
            const heightInMeters = Number(data.height) / 3600;
            const bsa = Math.sqrt(Number(data.weight) * heightInMeters);
            setData('bsa', bsa.toFixed(2));
        }
    };
    const handleAgeCalc: FocusEventHandler<HTMLInputElement> = async () => {
        if (data.date_of_birth) {
            const birthDate = new Date(data.date_of_birth);
            const today = new Date();
            let age = today.getFullYear() - birthDate.getFullYear();
            const monthDiff = today.getMonth() - birthDate.getMonth();
            if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birthDate.getDate())) {
                age--;
            }
            setData('age', age.toString());
        }
    };
    const handleLaAoCalc: FocusEventHandler<HTMLInputElement> = async () => {
        if (data.la && data.ao) {
            const la_ao = Number(data.la) / Number(data.ao);
            setData('la_ao', la_ao.toFixed(2));
        }
    };

    // Reusable input field renderer

    const renderInputField = (
        id: keyof typeof data,
        label: string,
        type = 'text',
        placeholder?: string,
        config?: {
            autoFocus?: boolean;
            onBlur?: FocusEventHandler<HTMLInputElement>;
        },
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
                className="mt-1 block w-full border-0 border-b"
                autoFocus={config?.autoFocus}
                readOnly={id === 'bsa'}
                onBlur={config?.onBlur}
                onKeyDown={handleKeyDown}
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
                onKeyDown={handleKeyDown}
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
                    <form onSubmit={submit} className="space-y-8" onKeyDown={handleKeyDown}>
                        <Tabs defaultValue="patient-details" className="w-full">
                            <TabsList className="mb-4 w-full justify-start">
                                <TabsTrigger value="patient-details">Initial Info</TabsTrigger>
                                <TabsTrigger value="dimensions">2D Summary</TabsTrigger>
                                <TabsTrigger value="diastolic-function">Doppler Measurements</TabsTrigger>
                                <TabsTrigger value="report">Additional Information</TabsTrigger>
                            </TabsList>

                            {/* Patient Details Tab */}
                            <TabsContent value="patient-details" className="space-y-4">
                                <div>
                                    <div>
                                        <h2 className="mb-4 text-xl font-semibold">Patient Details</h2>
                                        <Table className="border">
                                            <TableHeader>
                                                <TableRow>
                                                    <TableHead className="border p-2">Surname</TableHead>
                                                    <TableHead className="border p-2">Other Names</TableHead>
                                                    <TableHead className="w-[100px] border p-2">Sex</TableHead>
                                                    <TableHead className="border p-2">DOB</TableHead>
                                                </TableRow>
                                            </TableHeader>
                                            <TableBody>
                                                <TableRow>
                                                    <TableCell className="border p-2">
                                                        {' '}
                                                        {renderInputField('surname', '', 'text', 'Surname')}
                                                    </TableCell>
                                                    <TableCell className="border p-2"> {renderInputField('other_names', '')}</TableCell>
                                                    <TableCell className="border p-2">
                                                        <div className="grid gap-2">
                                                            <Select value={data.gender} onValueChange={(value) => setData('gender', value)}>
                                                                <SelectTrigger className="w-[140px]">
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
                                                </TableRow>
                                            </TableBody>
                                            <TableHeader>
                                                <TableRow>
                                                    <TableHead className="border p-2">Hospital No</TableHead>
                                                    <TableHead className="border p-2">Phone Number</TableHead>
                                                    <TableHead className="border p-2">Age</TableHead>
                                                    <TableHead className="border p-2">Reffering Doctor/Hospital</TableHead>
                                                </TableRow>
                                            </TableHeader>
                                            <TableBody>
                                                <TableRow>
                                                    <TableCell className="border p-2">
                                                        {' '}
                                                        {renderInputField('hospital_id', '', 'text', 'Hospital No')}
                                                    </TableCell>
                                                    <TableCell className="border p-2">
                                                        {' '}
                                                        {renderInputField('phone_number', '', 'text', 'Phone Number')}
                                                    </TableCell>
                                                    <TableCell className="border p-2">
                                                        {' '}
                                                        {renderInputField('age', '', 'text', 'Age', {
                                                            onBlur: handleAgeCalc,
                                                        })}
                                                    </TableCell>
                                                    <TableCell className="border p-2">
                                                        {' '}
                                                        {renderInputField('referring', '', 'text', 'Reffering Doctor/Hospital')}
                                                    </TableCell>
                                                </TableRow>
                                            </TableBody>
                                        </Table>
                                    </div>
                                    <Table className="mt-1">
                                        <TableHeader>
                                            <TableRow>
                                                <TableHead className="border p-2">DATE OF SCAN</TableHead>
                                                <TableHead className="border p-2">WEIGHT(kg)</TableHead>

                                                <TableHead className="border p-2">HEIGHT(cm)</TableHead>
                                                <TableHead className="border p-2">
                                                    BSA(m<sup>2</sup>)
                                                </TableHead>
                                                <TableHead className="border p-2">
                                                    SP0<sub>2</sub> in room air
                                                </TableHead>
                                                <TableHead className="border p-2">BP(mmHg)</TableHead>
                                            </TableRow>
                                        </TableHeader>
                                        <TableBody>
                                            <TableRow>
                                                <TableCell className="border p-2">{renderInputField('test_date', '', 'date')}</TableCell>
                                                <TableCell className="border p-2">
                                                    {' '}
                                                    {renderInputField('weight', '', 'number', 'Weight(kg)', {
                                                        onBlur: handleBSACalc,
                                                    })}
                                                </TableCell>

                                                <TableCell className="border p-2">
                                                    {' '}
                                                    {renderInputField('height', '', 'number', 'Height(cm)', {
                                                        onBlur: handleBSACalc,
                                                    })}
                                                </TableCell>
                                                <TableCell className="border p-2"> {renderInputField('bsa', '')}</TableCell>
                                                <TableCell className="border p-2"> {renderInputField('spo2', '')}</TableCell>
                                                <TableCell className="border p-2">{renderInputField('blood_pressure', '')}</TableCell>
                                            </TableRow>
                                        </TableBody>
                                    </Table>
                                </div>

                                <div className="grid grid-cols-1 items-center justify-items-end rounded border pb-1 md:grid-cols-3">
                                    <div>{renderInputField('heart_rate', '', 'text', 'Heart Rate (bpm)')}</div>
                                    <div>{renderInputField('indication', '', 'text', 'Indication for Study')}</div>
                                </div>
                            </TabsContent>

                            {/* Dimensions Tab */}
                            <TabsContent value="dimensions" className="space-y-4">
                                <Table className="border">
                                    <TableHeader>
                                        <TableRow>
                                            <TableHead className="border p-2">Abdominal Siatus</TableHead>
                                            <TableHead className="border p-2">Cardiac Position</TableHead>
                                            <TableHead className="border p-2">systemic Venous Drainage</TableHead>
                                            <TableHead className="border p-2">Pulmonary Venous Drainage</TableHead>
                                        </TableRow>
                                    </TableHeader>
                                    <TableBody>
                                        <TableRow>
                                            <TableCell className="border p-2">
                                                {' '}
                                                {renderInputField('abdominal_situs', '', 'text', 'Abdominal Situs')}
                                            </TableCell>
                                            <TableCell className="border p-2">
                                                {' '}
                                                {renderInputField('cardiac_position', '', 'text', 'cardiac_position')}
                                            </TableCell>
                                            <TableCell className="border p-1">
                                                {' '}
                                                {renderInputField('systemic_venous_drainage', '', 'text', 'Sytemic Veinous Drainage')}
                                            </TableCell>
                                            <TableCell className="border p-1">
                                                {' '}
                                                {renderInputField('pulmonary_venous_drainage', '', 'text', 'Pulmonary Veinous Drainage')}
                                            </TableCell>
                                        </TableRow>
                                    </TableBody>
                                    <TableHeader>
                                        <TableRow>
                                            <TableHead className="border p-2">Atrio-Ventricular Connection</TableHead>
                                            <TableHead className="border p-2">Ventriculo-arterial Connection</TableHead>
                                            <TableHead className="border p-2">Ventricular Loop</TableHead>
                                            <TableHead className="border p-2"></TableHead>
                                        </TableRow>
                                    </TableHeader>
                                    <TableBody>
                                        <TableRow>
                                            <TableCell className="border p-1">
                                                {' '}
                                                {renderInputField('atrio_ventricular_connection', '', 'text', 'atrio_ventricular_connection')}
                                            </TableCell>
                                            <TableCell className="border p-1">
                                                {' '}
                                                {renderInputField('ventricular_arterial_connection', '', 'text', 'ventricular_arterial_connection')}
                                            </TableCell>
                                            <TableCell className="border p-1">
                                                {' '}
                                                {renderInputField('ventricular_loop', '', 'text', 'ventricular_loop')}
                                            </TableCell>
                                            <TableCell className="border p-1"></TableCell>
                                        </TableRow>
                                    </TableBody>
                                    <TableHeader>
                                        <TableRow>
                                            <TableHead
                                                colSpan={2}
                                                className="border bg-gray-800 text-center text-white dark:bg-gray-200 dark:text-black"
                                            >
                                                Atria
                                            </TableHead>
                                            <TableHead
                                                colSpan={2}
                                                className="border bg-gray-800 text-center text-white dark:bg-gray-200 dark:text-black"
                                            >
                                                AtrioVentricular Valves
                                            </TableHead>
                                        </TableRow>
                                        <TableRow>
                                            <TableHead className="border p-2">Left Atrium</TableHead>
                                            <TableHead className="border p-2">Right Atrium</TableHead>
                                            <TableHead className="border p-2">Mitral</TableHead>
                                            <TableHead className="border p-2">Triscupid</TableHead>
                                        </TableRow>
                                    </TableHeader>
                                    <TableBody>
                                        <TableRow>
                                            <TableCell className="border p-1">
                                                {' '}
                                                {renderInputField('left_atrium', '', 'text', 'left Atrium')}
                                            </TableCell>

                                            <TableCell className="border p-1">
                                                {' '}
                                                {renderInputField('right_atrium', '', 'number', 'Right Atrium')}
                                            </TableCell>
                                            <TableCell className="border p-1"> {renderInputField('mitral_av', '', 'number', 'Mitral')}</TableCell>
                                            <TableCell className="border p-1"> {renderInputField('triscupid', '', 'number', 'Triscupid')}</TableCell>
                                        </TableRow>
                                    </TableBody>
                                    <TableHeader>
                                        <TableRow>
                                            <TableHead
                                                colSpan={2}
                                                className="border bg-gray-800 text-center text-white dark:bg-gray-200 dark:text-black"
                                            >
                                                Ventricles
                                            </TableHead>
                                            <TableHead
                                                colSpan={2}
                                                className="border bg-gray-800 text-center text-white dark:bg-gray-200 dark:text-black"
                                            >
                                                Septae
                                            </TableHead>
                                        </TableRow>
                                        <TableRow>
                                            <TableHead className="border p-2">Left Ventricle</TableHead>
                                            <TableHead className="border p-2">Right Ventricle</TableHead>
                                            <TableHead className="border p-2">Interventricular septum</TableHead>
                                            <TableHead className="border p-2">Interatrial septum</TableHead>
                                        </TableRow>
                                    </TableHeader>
                                    <TableBody>
                                        <TableRow>
                                            <TableCell className="border p-1"> {renderInputField('left_ventricle', '', 'number', 'LV')}</TableCell>
                                            <TableCell className="border p-1"> {renderInputField('right_ventricle', '', 'number', 'RV')}</TableCell>
                                            <TableCell className="border p-1">
                                                {' '}
                                                {renderInputField('interventricular_septum', '', 'number', 'IVS')}
                                            </TableCell>
                                            <TableCell className="border p-1">
                                                {' '}
                                                {renderInputField('interatrial_septum', '', 'number', 'IAS')}
                                            </TableCell>
                                        </TableRow>
                                    </TableBody>
                                    <TableHeader>
                                        <TableRow>
                                            <TableHead
                                                colSpan={2}
                                                className="border bg-gray-800 text-center text-white dark:bg-gray-200 dark:text-black"
                                            >
                                                Semilunar Valves
                                            </TableHead>
                                            <TableHead
                                                colSpan={2}
                                                className="border bg-gray-800 text-center text-white dark:bg-gray-200 dark:text-black"
                                            >
                                                Great Arteries
                                            </TableHead>
                                        </TableRow>
                                        <TableRow>
                                            <TableHead className="border p-2">Aortic Valve</TableHead>
                                            <TableHead className="border p-2">Pulmonary Valve</TableHead>
                                            <TableHead className="border p-2">Aorta</TableHead>
                                            <TableHead className="border p-2">Pulmonary artery</TableHead>
                                        </TableRow>
                                    </TableHeader>
                                    <TableBody>
                                        <TableRow>
                                            <TableCell className="border p-1"> {renderInputField('aortic_valve', '', 'text', 'AOV')}</TableCell>
                                            <TableCell className="border p-1"> {renderInputField('pulmonary_valve', '', 'text', 'PV')}</TableCell>
                                            <TableCell className="border p-1"> {renderInputField('aorta', '', 'text', 'AO')}</TableCell>
                                            <TableCell className="border p-1"> {renderInputField('pulmonary_artery', '', 'text', 'PA')}</TableCell>
                                        </TableRow>
                                    </TableBody>
                                    <TableHeader>
                                        <TableRow>
                                            <TableHead className="border p-2">Outflow Tract</TableHead>
                                            <TableHead className="border p-2">Arch</TableHead>
                                            <TableHead className="border p-2">PDA</TableHead>
                                            <TableHead className="border p-2">Coronary Arteries</TableHead>
                                        </TableRow>
                                    </TableHeader>
                                    <TableBody>
                                        <TableRow>
                                            <TableCell> {renderInputField('outflow_tract', '', 'text', 'Aortic Root')}</TableCell>
                                            <TableCell> {renderInputField('arch', '', 'text', 'Arch')}</TableCell>
                                            <TableCell> {renderInputField('pda', '', 'text', 'PDA')}</TableCell>
                                            <TableCell> {renderInputField('corona_arteries', '', 'text', 'Coronary Arteries')}</TableCell>
                                        </TableRow>
                                    </TableBody>
                                </Table>
                            </TabsContent>

                            {/* Diastolic Function Tab */}
                            <TabsContent value="diastolic-function" className="space-y-4">
                                <Table className="mt-1">
                                    <TableHeader>
                                        <TableRow>
                                            <TableHead>
                                                <TableHead
                                                    colSpan={4}
                                                    className="border bg-gray-800 text-center text-white dark:bg-gray-200 dark:text-black"
                                                >
                                                    Doppler Measurements
                                                </TableHead>
                                            </TableHead>
                                        </TableRow>
                                        <TableRow>
                                            <TableHead className="border p-2">Mitral</TableHead>
                                            <TableHead className="border p-2">Aortic</TableHead>
                                            <TableHead className="border p-2">Triscupid</TableHead>
                                            <TableHead className="border p-2">Pulmonary</TableHead>
                                        </TableRow>
                                    </TableHeader>
                                    <TableBody>
                                        <TableRow>
                                            <TableCell className="border p-1">{renderInputField('mitral', '', 'text', 'Mitral')}</TableCell>
                                            <TableCell className="border p-1">{renderInputField('aortic', '', 'number', 'Aortic')}</TableCell>
                                            <TableCell className="border p-1">{renderInputField('triscupid', '', 'number', 'Triscupid')}</TableCell>
                                            <TableCell className="border p-1"> {renderInputField('pulmonary', '', 'number', 'Pulmonary')}</TableCell>
                                        </TableRow>
                                    </TableBody>
                                    <TableHeader>
                                        <TableRow>
                                            <TableHead
                                                colSpan={4}
                                                className="border bg-gray-800 text-center text-white dark:bg-gray-200 dark:text-black"
                                            >
                                                M-MODE
                                            </TableHead>
                                        </TableRow>
                                        <TableRow>
                                            <TableHead className="border p-2">AO</TableHead>
                                            <TableHead className="border p-2">LVIDd(mm)</TableHead>
                                            <TableHead className="border p-2">IVSd(mm)</TableHead>
                                            <TableHead className="border p-2">EDV(ml)</TableHead>
                                        </TableRow>
                                    </TableHeader>
                                    <TableBody>
                                        <TableRow>
                                            <TableCell className="border p-1">
                                                {' '}
                                                {renderInputField('ao', '', 'number', 'AO', {
                                                    onBlur: handleLaAoCalc,
                                                })}
                                            </TableCell>
                                            <TableCell className="border p-1"> {renderInputField('lvidd', '', 'number', 'LVIDd')}</TableCell>

                                            <TableCell className="border p-1"> {renderInputField('ivsd', '', 'number', 'IVSd')}</TableCell>
                                            <TableCell className="border p-1"> {renderInputField('edv', '', 'number', 'EDV')}</TableCell>
                                        </TableRow>
                                    </TableBody>
                                    <TableHeader>
                                        <TableRow>
                                            <TableHead className="border p-2">LA (mm)</TableHead>
                                            <TableHead className="border p-2">LVIDs (mm)</TableHead>
                                            <TableHead className="border p-2">PWD (mm)</TableHead>
                                            <TableHead className="border p-2">ESV</TableHead>
                                        </TableRow>
                                    </TableHeader>
                                    <TableBody>
                                        <TableRow>
                                            <TableCell className="border p-1">
                                                {renderInputField('la', '', 'number', 'LA', {
                                                    onBlur: handleLaAoCalc,
                                                })}
                                            </TableCell>
                                            <TableCell className="border p-1">{renderInputField('lvids', '', 'number', 'LVIDs')}</TableCell>
                                            <TableCell className="border p-1">{renderInputField('pwd', '', 'number', 'PWD')}</TableCell>
                                            <TableCell className="border p-1"> {renderInputField('esv', '', 'number', 'ESV')}</TableCell>
                                        </TableRow>
                                    </TableBody>
                                    <TableHeader>
                                        <TableRow>
                                            <TableHead className="border p-2">LA/AO</TableHead>
                                            <TableHead className="border p-2">EF(%)</TableHead>
                                            <TableHead className="border p-2">FS(%)</TableHead>
                                            <TableHead className="border p-2">Cardiac Output(L/min)</TableHead>
                                        </TableRow>
                                    </TableHeader>
                                    <TableBody>
                                        <TableRow>
                                            <TableCell className="border p-1"> {renderInputField('la_ao', '', 'number', 'LA/AO')}</TableCell>
                                            <TableCell className="border p-1"> {renderInputField('ef', '', 'number', 'EF')}</TableCell>
                                            <TableCell className="border p-1"> {renderInputField('fs', '', 'number', 'FS')}</TableCell>
                                            <TableCell className="border p-1">
                                                {' '}
                                                {renderInputField('cardiac_output', '', 'number', 'Cardiac Output')}
                                            </TableCell>
                                        </TableRow>
                                    </TableBody>
                                </Table>

                                <div className="mt-4">{renderInputField('cardiac_index', 'Cardiac Index', 'text', 'Cardiac Index')}</div>
                            </TabsContent>

                            {/* Report Tab */}
                            <TabsContent value="report" className="space-y-4">
                                <div>
                                    <h2 className="mb-4 text-xl font-semibold">Final Report</h2>
                                    <div className="grid grid-cols-1 gap-6">
                                        <div className="grid gap-2">
                                            <Label>recommendations</Label>
                                            <Textarea
                                                value={data.recommendations}
                                                onChange={(e) => setData('recommendations', e.target.value)}
                                                className="w-full"
                                                placeholder="Recommendations"
                                                rows={4}
                                            />
                                            <InputError message={errors.recommendations} className="mt-2" />
                                        </div>
                                        {renderTextareaField('summary', 'Summary', 'Summary of Findings')}
                                        {renderTextareaField('conclusion', 'Conclusion', 'Conclusion')}
                                    </div>

                                    <div className={`mt-3`}>
                                        <Label>Doctor Name</Label>
                                        <Input
                                            type="text"
                                            value={data.doctor_name}
                                            onChange={(e) => setData('doctor_name', e.target.value)}
                                            className="w-full"
                                            placeholder="Doctor Name"
                                        />
                                        <InputError message={errors.doctor_name} className="mt-2" />
                                    </div>
                                </div>
                                <Button type="submit" disabled={processing} className="mt-4">
                                    Create Test Record
                                </Button>
                            </TabsContent>
                        </Tabs>
                    </form>
                </div>
            </div>
        </AppLayout>
    );
}
