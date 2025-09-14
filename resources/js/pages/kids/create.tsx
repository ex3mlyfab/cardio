
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

import * as TabsPrimitive from "@radix-ui/react-tabs";
import { cn } from '@/lib/utils';

// Custom Tabs components with styling
const Tabs = TabsPrimitive.Root;

const TabsList = React.forwardRef<
    React.ElementRef<typeof TabsPrimitive.List>,
    React.ComponentPropsWithoutRef<typeof TabsPrimitive.List>
>(({ className, ...props }, ref) => (
    <TabsPrimitive.List
        ref={ref}
        className={cn(
            "bg-muted text-muted-foreground inline-flex h-10 items-center justify-center rounded-md p-1",
            className
        )}
        {...props}
    />
));
TabsList.displayName = TabsPrimitive.List.displayName;

import React from 'react';


const TabsTrigger = React.forwardRef<
    React.ElementRef<typeof TabsPrimitive.Trigger>,
    React.ComponentPropsWithoutRef<typeof TabsPrimitive.Trigger>
>(({ className, ...props }, ref) => (
    <TabsPrimitive.Trigger
        ref={ref}
        className={cn(
            "ring-offset-background focus-visible:ring-ring data-[state=active]:bg-background data-[state=active]:text-foreground inline-flex items-center justify-center whitespace-nowrap rounded-sm px-3 py-1.5 text-sm font-medium transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 data-[state=active]:shadow-sm",
            className
        )}
        {...props}
    />
));
TabsTrigger.displayName = TabsPrimitive.Trigger.displayName;

const TabsContent = React.forwardRef<
    React.ElementRef<typeof TabsPrimitive.Content>,
    React.ComponentPropsWithoutRef<typeof TabsPrimitive.Content>
>(({ className, ...props }, ref) => (
    <TabsPrimitive.Content
        ref={ref}
        className={cn(
            "ring-offset-background focus-visible:ring-ring mt-2 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2",
            className
        )}
        {...props}
    />
));
TabsContent.displayName = TabsPrimitive.Content.displayName;

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Create New Test Record',
        href: '/patients/paed-create',
    },
];

export default function CreateKidPage() {

    const { data, setData, post, processing, errors } = useForm({
        // Patient fields
        surname: '',
        other_names: '',
        gender: '',
        hospital_id: '',
        date_of_birth: '',
        phone_number: '',
        age: '',
        referring: '',

        // Test Record fields
        test_date: '',
        weight: '',
        height: '',
        bsa: '',
        blood_pressure: '',
        indication: '',
        // Dimension
        heart_rate: '',
        spo2: '',
        //2d summary
        abdominal_situs: '',
        cardiac_position: '',
        systemic_venous_drainage: '',
        pulmonary_venous_drainage: '',
        atrio_ventricular_connection: '',
        ventricular_arterial_connection: '',
        ventricular_loop: '',
        left_atrium: '',
        right_atrium: '',
        mitral_av: '',
        triscupid: '',
        left_ventricle: '',
        right_ventricle: '',

        // Diastolic function
        interatrial_septum: '',
        interventricular_septum: '',
        aortic_arteries: '',
        pulmonary_arteries: '',
        outflow_tract: '',
        arch: '',
        pda: '',
        corona_arteries: '',
        pulmonary: '',
        aorta: '',
        pulmonary_artery: '',
        pulmonary_valve: '',
        aortic_valve: '',

        // Doppler
        mitral: '',
        aortic: '',
        triscupid_doppler: '',
        pulmonary_doppler: '',
        // m-mode
        ao: '',
        lvidd: '',
        ivsd: '',
        edv: '',
        la_ao: '',
        la: '',
        lvids: '',
        pwd: '',
        esv: '',
        ef: '',
        fs: '',
        cardiac_output: '',
        cardiac_index: '',
        recommendations: '',
        summary: '',
        conclusion: '',

        doctor_name: '',
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
        console.log(data);
        post(route('kids.store'), {
            onSuccess: (id) => {
                console.log('Patient created successfully!');
                // You can redirect the user to the patient's profile page or any other page
                window.location.href = route('kids.show', { testRecord: id });
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
            let ageCAlc = today.getFullYear() - birthDate.getFullYear();
            const monthDiff = today.getMonth() - birthDate.getMonth();
            if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birthDate.getDate())) {
                ageCAlc--;
            }
            setData('age', ageCAlc.toString());
        }
    };
    const handleLaAoCalc: FocusEventHandler<HTMLInputElement> = async () => {
        if (data.la && data.ao) {
            const la_ao = Number(data.la) / Number(data.ao);
            setData('la_ao', la_ao.toFixed(2));
        }
    };

    // const handleRVSPCalc: FocusEventHandler<HTMLInputElement> = async () => {
    //     if (data.pulmonary) {
    //         const rvsp = Math.pow(Number(data.pulmonary), 2);
    //         setData('mvsp', rvsp.toFixed(2));
    //     }
    // }
    // const handlePASPCalc: FocusEventHandler<HTMLInputElement> = async () => {
    //     if (data.mvsp && data.additional_info) {
    //         const pasp = Number(data.mvsp) + Number(data.additional_info);
    //         setData('pasp', pasp.toFixed(2));
    //         const mpap = (0.61 * Number(data.pasp)) + 2;
    //         setData('mpap', mpap.toFixed(2));
    //     }
    // }

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
            <Head title="Create New Paediatric Test Record" />
            <div className="flex h-full flex-1 flex-col gap-4 rounded-xl p-4">
                {/*show all validation errors */}
                {Object.keys(errors).length > 0 && (
                    <div className="mb-4 rounded-lg bg-red-100 p-4 text-red-700">
                        <ul className="list-disc space-y-1 pl-5">
                            {Object.values(errors).map((error, index) => (
                                <li key={index}>{error}</li>
                            ))}
                        </ul>
                    </div>
                )}
                {/* Form Container */}
                <div className="flex justify-end">
                    <Button>
                        <a href="/kids/">Back to Test List</a>
                    </Button>
                </div>
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
                                                    <TableCell className="border p-2"> {renderInputField('age', '', 'text', 'Age', {
                                                        onBlur: handleAgeCalc,
                                                    })}</TableCell>
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
                                            <TableCell className="border p-1"> {renderInputField('ao', '', 'number', 'AO', {
                                                onBlur: handleLaAoCalc,
                                            })}</TableCell>
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
                                            <TableCell className="border p-1">
                                                {renderInputField('lvids', '', 'number', 'LVIDs')}
                                            </TableCell>
                                            <TableCell className="border p-1">
                                                {renderInputField('pwd', '', 'number', 'PWD')}
                                            </TableCell>
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

                                <div className="mt-4">

                                    {renderInputField('cardiac_index', 'Cardiac Index', 'text', 'Cardiac Index')}
                                </div>
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
