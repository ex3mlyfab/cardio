
import AppLayout from '@/layouts/app-layout';
import { type BreadcrumbItem } from '@/types';
import { Head, Link } from '@inertiajs/react';
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Printer, FilePenLine } from "lucide-react";
import { useCallback } from "react";


const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Dashboard',
        href: '/dashboard',
    },
    {
        title: 'Test Details',
        href: '#',
    }
];

export default function ShowTest({
    testRecord,
}: {
    testRecord: {
        id: string;
        patient: {
        surname: string;
        other_names: string;
        gender: string;
        hospital_id: string;
        date_of_birth: string;
        phone_number: string;
        age: string;},
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
    };
}) {
    // Add print functionality
    const handlePrint = useCallback(() => {
        const printContents = document.getElementById('testRecord')?.innerHTML;

        if (printContents) {
            // Create a new window with only the test record content
            const printWindow = window.open('', '_blank');
            if (printWindow) {
                printWindow.document.write(`
                    <!DOCTYPE html>
                    <html>
                        <head>
                            <title>Test Record - ${testRecord.patient?.surname || 'Patient'} ${testRecord.patient?.other_names || ''}</title>
                            <style>
                                body { font-family: Arial, sans-serif; margin: 10px 55px;  }
                                table { width: 100%; border-collapse: collapse; margin-top: 10px}
                                th, td { border: 2px solid #ddd; padding: 2px 2px 2px 5px; font-size: 12px  }
                                th { background-color: #f2f2f2; }
                                h2, h3 { margin-top: 4px; font-size: 14px; }
                                @media print {
                                    button { display: none; }
                                }
                            </style>
                        </head>
                        <body>
                            <div>
                               <div style="display:flex;
                                            flex-direction:column;
                                            align-items:center;
                                            justify-content: flex-start
                                            ">




                               </div>

                                ${printContents}
                                <div style="text-align: center; margin-top: 30px;">
                                    <button onclick="window.print(); window.close();">Print</button>
                                </div>
                            </div>
                        </body>
                    </html>
                `);
                printWindow.document.close();
            }
        }
    }, [testRecord]);

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Test Record Details" />
            <div className="mb-4 flex justify-between">
                <Button variant="secondary">
                    <Link href={route('patients.editTest', testRecord.id)} className="flex justify-center">
                        <FilePenLine className="mr-1 h-4 w-4" />
                        Update
                    </Link>
                </Button>
                <Button onClick={handlePrint} className="bg-blue-600 text-white hover:bg-blue-700">
                    <Printer className="mr-2 h-4 w-4" />
                    Print Test Record
                </Button>
            </div>
            <div className="flex h-full flex-1 flex-col gap-4 rounded-xl p-4" id="testRecord">
                {/* Form Container */}
                <div className="border-sidebar-border/70 dark:border-sidebar-border relative flex-1 overflow-hidden rounded-xl border p-4 md:p-6">
                    <div className="space-y-8">
                        <div
                            className="mb-4 flex items-center justify-between"
                            style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '10px', alignItems: 'center' }}
                        >
                            <div
                                className="flex flex-col items-center justify-center"
                                style={{
                                    display: 'flex',
                                    alignItems: 'center',
                                    justifyContent: 'center',
                                    flexDirection: 'column',
                                    border: '1px solid #ddd',
                                    padding: '10px',
                                    borderRadius: '8px',
                                }}
                            >
                                <img src="/fmc_logo.jpeg" style={{ width: '100px', height: '100px' }} alt="FMC Logo" />
                                <h6 className="p-o m-0" style={{ margin: 0, padding: 0, fontSize: '11px', textAlign: 'center' }}>
                                    FEDERAL MEDICAL CENTRE
                                </h6>

                                <h6 className="p-o m-0" style={{ margin: 0, padding: 0, fontSize: '11px' }}>
                                    JABI - AIRPORT ROAD ABUJA{' '}
                                </h6>

                                <h6 className="p-o m-0" style={{ margin: 0, padding: 0, fontSize: '11px' }}>
                                    ECHOCARDIOGRAPHY LABORATORY - PAEDIATRIC
                                </h6>
                            </div>
                            <div
                                className="flex flex-col items-center justify-center"
                                style={{ gridColumn: 'span 2', alignItems: 'center', justifyContent: 'center' }}
                            >
                                <h2 className="mb-4 text-xl font-semibold">Patient Details</h2>
                                <Table className="border">
                                    <TableHeader>
                                        <TableRow>
                                            <TableHead className="border p-2">Hospital No</TableHead>
                                            <TableHead className="border p-2">Surname</TableHead>
                                            <TableHead className="border p-2">Other Names</TableHead>
                                            <TableHead className="w-[100px] border p-2">Sex</TableHead>
                                            <TableHead className="border p-2">DOB</TableHead>
                                            <TableHead className="border p-2">Phone Mumber`</TableHead>
                                        </TableRow>
                                    </TableHeader>
                                    <TableBody>
                                        <TableRow>
                                            <TableCell className="border p-2">{testRecord.patient?.hospital_id || 'N/A'}</TableCell>
                                            <TableCell className="border p-2">{testRecord?.patient?.surname || 'N/A'}</TableCell>
                                            <TableCell className="border p-2">{testRecord?.patient?.other_names || 'N/A'}</TableCell>
                                            <TableCell className="border p-2">{testRecord?.patient?.gender || 'N/A'}</TableCell>
                                            <TableCell className="border p-2">{testRecord?.patient?.date_of_birth || 'N/A'}</TableCell>
                                            <TableCell className="border p-2">{testRecord?.patient?.phone_number || 'N/A'}</TableCell>
                                        </TableRow>
                                    </TableBody>
                                    <TableHeader>
                                        <TableRow>
                                            <TableHead className="border p-2">TEST DATE</TableHead>
                                            <TableHead className="border p-2">WEIGHT(kg)</TableHead>

                                            <TableHead className="w-[100px] border p-2">HEIGHT(cm)</TableHead>

                                            <TableHead className="border p-2">
                                                BSA(m<sup>2</sup>)
                                            </TableHead>
                                            <TableHead className="border p-2">
                                                {' '}
                                                SP0<sub>2</sub> in room air
                                            </TableHead>
                                            <TableHead className="border p-2">BP(mmHg)</TableHead>
                                        </TableRow>
                                    </TableHeader>
                                    <TableBody>
                                        <TableRow>
                                            <TableCell className="border p-2">{testRecord.test_date}</TableCell>
                                            <TableCell className="border p-2">{testRecord.weight}</TableCell>

                                            <TableCell className="border p-2">{testRecord.height}</TableCell>
                                            <TableCell className="border p-2">{testRecord.bsa}</TableCell>
                                            <TableCell className="border p-2">{testRecord.spo2}</TableCell>
                                            <TableCell className="border p-2">{testRecord.blood_pressure}</TableCell>
                                        </TableRow>
                                    </TableBody>
                                </Table>
                            </div>
                        </div>

                        <div
                            className="align-center mt-1 flex justify-evenly gap-2"
                            style={{
                                display: 'grid',
                                gridTemplateColumns: 'repeat(4, 1fr)',
                                gap: '20px',
                                fontSize: '14px',
                                justifyContent: 'start',
                                alignItems: 'center',
                                border: '1px solid #ddd',
                                padding: '10px',
                                borderRadius: '8px',
                            }}
                        >
                            <h2
                                className="mt-2 text-xl font-semibold"
                                style={{
                                    fontSize: '12px',
                                    paddingTop: '1px',
                                }}
                            >
                                Heart Rate:
                            </h2>
                            <div
                                className="flex-1 rounded border p-2"
                                style={{
                                    gridColumn: 'span 3',
                                }}
                            >
                                {testRecord.indication}
                            </div>
                            <h2
                                className="mt-2 text-xl font-semibold"
                                style={{
                                    fontSize: '12px',
                                    paddingTop: '1px',
                                }}
                            >
                                Indication for study:
                            </h2>
                            <div
                                className="flex-1 rounded border p-2"
                                style={{
                                    gridColumn: 'span 3',
                                }}
                            >
                                {testRecord.indication}
                            </div>
                        </div>

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
                                    <TableCell className="border p-2">{testRecord.abdominal_situs}</TableCell>
                                    <TableCell className="border p-2">{testRecord.cardiac_position}</TableCell>
                                    <TableCell className="border p-1">{testRecord.systemic_venous_drainage}</TableCell>
                                    <TableCell className="border p-1">{testRecord.pulmonary_venous_drainage}</TableCell>
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
                                    <TableCell className="border p-1">{testRecord.atrio_ventricular_connection}</TableCell>
                                    <TableCell className="border p-1">{testRecord.ventricular_arterial_connection}</TableCell>
                                    <TableCell className="border p-1">{testRecord.ventricular_loop}</TableCell>
                                    <TableCell className="border p-1"></TableCell>
                                </TableRow>
                            </TableBody>
                            <TableHeader>
                                <TableRow>
                                    <TableHead colSpan={2} className="border bg-gray-800 text-center text-white dark:bg-gray-200 dark:text-black">
                                        Atria
                                    </TableHead>
                                    <TableHead colSpan={2} className="border bg-gray-800 text-center text-white dark:bg-gray-200 dark:text-black">
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
                                    <TableCell className="border p-1">{testRecord.left_atrium}</TableCell>

                                    <TableCell className="border p-1">{testRecord.right_atrium}</TableCell>
                                    <TableCell className="border p-1"> {testRecord.mitral}</TableCell>
                                    <TableCell className="border p-1">{testRecord.triscupid}</TableCell>
                                </TableRow>
                            </TableBody>
                            <TableHeader>
                                <TableRow>
                                    <TableHead colSpan={2} className="border bg-gray-800 text-center text-white dark:bg-gray-200 dark:text-black">
                                        Ventricles
                                    </TableHead>
                                    <TableHead colSpan={2} className="border bg-gray-800 text-center text-white dark:bg-gray-200 dark:text-black">
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
                                    <TableCell className="border p-1">{testRecord.left_ventricle}</TableCell>
                                    <TableCell className="border p-1">{testRecord.right_ventricle}</TableCell>
                                    <TableCell className="border p-1">{testRecord.interventricular_septum}</TableCell>
                                    <TableCell className="border p-1">{testRecord.interatrial_septum}</TableCell>
                                </TableRow>
                            </TableBody>
                            <TableHeader>
                                <TableRow>
                                    <TableHead colSpan={2} className="border bg-gray-800 text-center text-white dark:bg-gray-200 dark:text-black">
                                        Semilunar Valves
                                    </TableHead>
                                    <TableHead colSpan={2} className="border bg-gray-800 text-center text-white dark:bg-gray-200 dark:text-black">
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
                                    <TableCell className="border p-1">{testRecord.aortic_valve}</TableCell>
                                    <TableCell className="border p-1">{testRecord.pulmonary_valve}</TableCell>
                                    <TableCell className="border p-1">{testRecord.aorta}</TableCell>
                                    <TableCell className="border p-1">{testRecord.pulmonary_artery}</TableCell>
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
                                    <TableCell>{testRecord.outflow_tract}</TableCell>
                                    <TableCell>{testRecord.arch}</TableCell>
                                    <TableCell>{testRecord.pda}</TableCell>
                                    <TableCell>{testRecord.corona_arteries}</TableCell>
                                </TableRow>
                            </TableBody>
                        </Table>
                        <Table className="mt-1">
                            <TableHeader>
                                <TableRow>
                                    <TableHead>
                                        <TableHead colSpan={4} className="border bg-gray-800 text-center text-white dark:bg-gray-200 dark:text-black">
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
                                    <TableCell className="border p-1">{testRecord.mitral}</TableCell>
                                    <TableCell className="border p-1">{testRecord.aortic}</TableCell>
                                    <TableCell className="border p-1">{testRecord.triscupid_doppler}</TableCell>
                                    <TableCell className="border p-1">{testRecord.pulmonary_doppler}</TableCell>
                                </TableRow>
                            </TableBody>
                            <TableHeader>
                                <TableRow>
                                    <TableHead colSpan={4} className="border bg-gray-800 text-center text-white dark:bg-gray-200 dark:text-black">
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
                                    <TableCell className="border p-1">{testRecord.ao}</TableCell>
                                    <TableCell className="border p-1">
                                        <div className="flex items-center justify-center">{testRecord.lvidd} mm</div>
                                    </TableCell>

                                    <TableCell className="border p-1">{testRecord.ivsd}</TableCell>
                                    <TableCell className="border p-1">{testRecord.edv}</TableCell>
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
                                    <TableCell className="border p-1">{testRecord.la}</TableCell>
                                    <TableCell className="border p-1">{testRecord.lvids}</TableCell>
                                    <TableCell className="border p-1">{testRecord.pwd}</TableCell>
                                    <TableCell className="border p-1">{testRecord.esv}</TableCell>
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
                                    <TableCell className="border p-1">{testRecord.la_ao}</TableCell>
                                    <TableCell className="border p-1">{testRecord.ef}</TableCell>
                                    <TableCell className="border p-1">{testRecord.fs}</TableCell>
                                    <TableCell className="border p-1">{testRecord.cardiac_output}</TableCell>
                                </TableRow>
                            </TableBody>
                        </Table>

                        <div className="mt-4">{testRecord.cardiac_index}</div>

                        <div className="space-y-4">
                            <div
                                className="rounded border p-4"
                                style={{
                                    display: 'grid',
                                    gridTemplateColumns: 'repeat(4, 1fr)',
                                    gap: '20px',
                                    fontSize: '14px',
                                    justifyContent: 'start',
                                    alignItems: 'center',
                                }}
                            >
                                <h3
                                    className="mb-2 font-semibold"
                                    style={{
                                        fontSize: '14px',
                                    }}
                                >
                                    Pericardium
                                </h3>
                                <p
                                    style={{
                                        gridColumn: 'span 3',
                                    }}
                                >
                                    {testRecord.recommendations}
                                </p>
                            </div>
                            <div
                                className="rounded border p-4"
                                style={{
                                    display: 'grid',
                                    gridTemplateColumns: 'repeat(4, 1fr)',
                                    gap: '20px',
                                    fontSize: '14px',
                                    justifyContent: 'start',
                                    alignItems: 'center',
                                }}
                            >
                                <h3
                                    className="mb-2 font-semibold"
                                    style={{
                                        fontSize: '14px',
                                    }}
                                >
                                    Summary
                                </h3>
                                <p
                                    style={{
                                        gridColumn: 'span 3',
                                    }}
                                >
                                    {testRecord.summary}
                                </p>
                            </div>
                            <div
                                className="rounded border p-4"
                                style={{
                                    display: 'grid',
                                    gridTemplateColumns: 'repeat(4, 1fr)',
                                    gap: '20px',
                                    fontSize: '14px',
                                    justifyContent: 'start',
                                    alignItems: 'center',
                                }}
                            >
                                <h3
                                    className="mb-2 font-semibold"
                                    style={{
                                        fontSize: '14px',
                                    }}
                                >
                                    Conclusion
                                </h3>
                                <p
                                    style={{
                                        gridColumn: 'span 3',
                                    }}
                                >
                                    {testRecord.conclusion}
                                </p>
                            </div>
                            <div
                                className="rounded border p-4"
                                style={{
                                    display: 'grid',
                                    gridTemplateColumns: 'repeat(4, 1fr)',
                                    gap: '20px',
                                    fontSize: '14px',
                                    justifyContent: 'start',
                                    alignItems: 'center',
                                }}
                            >
                                <h3
                                    className="mb-2 font-semibold"
                                    style={{
                                        fontSize: '14px',
                                    }}
                                >
                                    Doctor's Sign & Name
                                </h3>
                                <p
                                    style={{
                                        gridColumn: 'span 3',
                                    }}
                                >
                                    {testRecord.doctor_name}
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </AppLayout>
    );
}
