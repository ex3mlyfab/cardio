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
            age: string;
        };
        referring: string;
        test_date: string;
        weight: string;
        height: string;
        bsa: string;
        blood_pressure: string;
        indication: string;
        heart_rate: string;
        spo2: string;
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
        interatrial_septum: string;
        interventricular_septum: string;
        aortic_arteries: string;
        pulmonary_arteries: string;
        outflow_tract: string;
        arch: string;
        pda: string;
        corona_arteries: string;
        pulmonary: string;
        pulmonary_artery: string;
        pulmonary_valve: string;
        aortic_valve: string;
        aorta: string;
        mitral: string;
        aortic: string;
        triscupid_doppler: string;
        pulmonary_doppler: string;
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
    const handlePrint = useCallback(() => {
        const printContents = document.getElementById('testRecord')?.innerHTML;
        if (printContents) {
            const printWindow = window.open('', '_blank');
            if (printWindow) {
                printWindow.document.write(`
                    <!DOCTYPE html>
                    <html>
                        <head>
                            <title>Test Record - ${testRecord.patient?.surname || 'Patient'} ${testRecord.patient?.other_names || ''}</title>
                            <style>
                                body { font-family: Arial, sans-serif; margin: 10px 55px; }
                                table { width: 100%; border-collapse: collapse; margin-top: 10px; }
                                th, td { border: 2px solid #ddd; padding: 2px 2px 2px 5px; font-size: 12px; }
                                th { background-color: #f2f2f2; }
                                h2, h3 { margin-top: 4px; font-size: 14px; }
                                @media print { button { display: none; } }
                            </style>
                        </head>
                        <body>
                            <div>
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
            <div className="mb-4 flex justify-between mt-2">
                <Button variant="default" className="bg-yellow-700 hover:bg-yellow-800 text-white">
                    <Link href={route('kids.edit', testRecord.id)} className="flex justify-center">
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
                <div className="border-sidebar-border/70 dark:border-sidebar-border relative flex-1 overflow-hidden rounded-xl border p-4 md:p-6">
                    <div className="space-y-8">
                        {/* Header: logo + patient details */}
                        <div className="grid grid-cols-3 gap-2 items-center">
                            <div className="flex flex-col items-center justify-center border rounded-lg p-2.5">
                                <img src="/fmc_logo.jpeg" className="w-24 h-24 object-contain" alt="FMC Logo" />
                                <h6 className="text-[11px] text-center m-0 p-0">FEDERAL MEDICAL CENTRE</h6>
                                <h6 className="text-[11px] m-0 p-0">JABI - AIRPORT ROAD ABUJA</h6>
                                <h6 className="text-[11px] m-0 p-0">ECHOCARDIOGRAPHY LABORATORY - PAEDIATRIC</h6>
                            </div>
                            <div className="col-span-2 flex flex-col items-center justify-center">
                                <h2 className="mb-4 text-xl font-semibold">Patient Details</h2>
                                <Table className="border">
                                    <TableHeader>
                                        <TableRow>
                                            <TableHead className="border p-2">Hospital No</TableHead>
                                            <TableHead className="border p-2">Surname</TableHead>
                                            <TableHead className="border p-2">Other Names</TableHead>
                                            <TableHead className="w-[100px] border p-2">Sex</TableHead>
                                            <TableHead className="border p-2">DOB</TableHead>
                                            <TableHead className="border p-2">Phone Number</TableHead>
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
                                            <TableHead className="border p-2">BSA(m<sup>2</sup>)</TableHead>
                                            <TableHead className="border p-2">SpO2 in room air</TableHead>
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

                        {/* Heart rate + indication */}
                        <div className="grid grid-cols-4 gap-5 border rounded-lg p-2.5 text-sm">
                            <h2 className="font-semibold text-sm pt-0.5">Heart Rate:</h2>
                            <div className="col-span-3 rounded border p-2">{testRecord.heart_rate || 'N/A'}</div>
                            <h2 className="font-semibold text-sm pt-0.5">Indication for study:</h2>
                            <div className="col-span-3 rounded border p-2">{testRecord.indication || 'N/A'}</div>
                        </div>

                        {/* 2D Summary tables */}
                        <Table className="border">
                            <TableHeader>
                                <TableRow>
                                    <TableHead className="border p-2">Abdominal Situs</TableHead>
                                    <TableHead className="border p-2">Cardiac Position</TableHead>
                                    <TableHead className="border p-2">Systemic Venous Drainage</TableHead>
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
                                    <TableHead colSpan={2} className="border bg-gray-800 text-center text-white dark:bg-gray-200 dark:text-black">Atria</TableHead>
                                    <TableHead colSpan={2} className="border bg-gray-800 text-center text-white dark:bg-gray-200 dark:text-black">AtrioVentricular Valves</TableHead>
                                </TableRow>
                                <TableRow>
                                    <TableHead className="border p-2">Left Atrium</TableHead>
                                    <TableHead className="border p-2">Right Atrium</TableHead>
                                    <TableHead className="border p-2">Mitral</TableHead>
                                    <TableHead className="border p-2">Tricuspid</TableHead>
                                </TableRow>
                            </TableHeader>
                            <TableBody>
                                <TableRow>
                                    <TableCell className="border p-1">{testRecord.left_atrium}</TableCell>
                                    <TableCell className="border p-1">{testRecord.right_atrium}</TableCell>
                                    <TableCell className="border p-1">{testRecord.mitral_av}</TableCell>
                                    <TableCell className="border p-1">{testRecord.triscupid}</TableCell>
                                </TableRow>
                            </TableBody>
                            <TableHeader>
                                <TableRow>
                                    <TableHead colSpan={2} className="border bg-gray-800 text-center text-white dark:bg-gray-200 dark:text-black">Ventricles</TableHead>
                                    <TableHead colSpan={2} className="border bg-gray-800 text-center text-white dark:bg-gray-200 dark:text-black">Septae</TableHead>
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
                                    <TableHead colSpan={2} className="border bg-gray-800 text-center text-white dark:bg-gray-200 dark:text-black">Semilunar Valves</TableHead>
                                    <TableHead colSpan={2} className="border bg-gray-800 text-center text-white dark:bg-gray-200 dark:text-black">Great Arteries</TableHead>
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

                        {/* Doppler + M-Mode */}
                        <Table className="mt-1">
                            <TableHeader>
                                <TableRow>
                                    <TableHead colSpan={4} className="border bg-gray-800 text-center text-white dark:bg-gray-200 dark:text-black">Doppler Measurements</TableHead>
                                </TableRow>
                                <TableRow>
                                    <TableHead className="border p-2">Mitral</TableHead>
                                    <TableHead className="border p-2">Aortic</TableHead>
                                    <TableHead className="border p-2">Tricuspid</TableHead>
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
                                    <TableHead colSpan={4} className="border bg-gray-800 text-center text-white dark:bg-gray-200 dark:text-black">M-Mode</TableHead>
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
                                    <TableCell className="border p-1"><div className="flex items-center justify-center">{testRecord.lvidd} mm</div></TableCell>
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

                        {/* Report sections */}
                        <div className="space-y-4">
                            {/* Recommendations */}
                            <div className="grid grid-cols-4 gap-5 text-sm rounded border p-4">
                                <h3 className="font-semibold text-sm mb-2">Recommendations</h3>
                                <p className="col-span-3">{testRecord.recommendations}</p>
                            </div>

                            {/* Summary - Rich Text */}
                            <div className="grid grid-cols-4 gap-5 text-sm rounded border p-4">
                                <h3 className="font-semibold text-sm mb-2">Summary</h3>
                                <div 
                                    className="col-span-3 prose prose-sm dark:prose-invert max-w-none"
                                    dangerouslySetInnerHTML={{ __html: testRecord.summary || '' }}
                                />
                            </div>

                            {/* Conclusion - Rich Text */}
                            <div className="grid grid-cols-4 gap-5 text-sm rounded border p-4">
                                <h3 className="font-semibold text-sm mb-2">Conclusion</h3>
                                <div 
                                    className="col-span-3 prose prose-sm dark:prose-invert max-w-none"
                                    dangerouslySetInnerHTML={{ __html: testRecord.conclusion || '' }}
                                />
                            </div>

                            {/* Doctor's Sign & Name */}
                            <div className="grid grid-cols-4 gap-5 text-sm rounded border p-4">
                                <h3 className="font-semibold text-sm mb-2">Doctor's Sign & Name</h3>
                                <p className="col-span-3">{testRecord.doctor_name}</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </AppLayout>
    );
}
