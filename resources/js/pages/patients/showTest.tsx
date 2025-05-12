
import AppLayout from '@/layouts/app-layout';
import { type BreadcrumbItem } from '@/types';
import { Head } from '@inertiajs/react';
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Printer } from "lucide-react";
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

export default function ShowTest({ patient, testRecord }: {
    patient: {
        hospital_id: string;
        surname: string;
        other_names: string;
        gender: string;
        date_of_birth: string;
        nicl: string;
    },
    testRecord: {
        test_date: string;
        weight: number;
        wc_cm: number;
        height: number;
        bsa: number;
        blood_pressure: string;
        indication: string;
        aortic_root: number;
        ivsd: number;
        la_ap: number;
        lvidd: number;
        mv_excursion: number;
        lvpwd: number;
        ef_slope: number;
        ivss: number;
        epss: number;
        lvids: number;
        rvid: number;
        lvpws: number;
        raa: number;
        fs: number;
        laa: number;
        ef: number;
        e_wave: number;
        e_lat: number;
        a_wave: number;
        a_lat: number;
        e_a: number;
        s_lat: number;
        e_wave_dt: number;
        e_e: number;
        ivrt: number;
        aortic_valve_peak: number;
        pulmonary_valve_peak: number;
        aortic_valve_press: number;
        pulmonary_valve_press: number;
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
        est_right: string;
        pericardium: string;
        summary:string;
        sign:string;
        conclusion:string;
    }
}) {
    // Add print functionality
    const handlePrint = useCallback(() => {
        const printContents = document.getElementById('testRecord')?.innerHTML;

        if (printContents) {
            // Create a new window with only the test record content
            const printWindow = window.open('', '_blank');
            if (printWindow) {
                printWindow.document.open();

                // Create HTML structure using DOM methods instead of document.write
                const html = printWindow.document.createElement('html');

                const head = printWindow.document.createElement('head');
                const title = printWindow.document.createElement('title');
                title.textContent = `Test Record - ${patient.surname} ${patient.other_names}`;

                const style = printWindow.document.createElement('style');
                style.textContent = `
                    body { font-family: Arial, sans-serif; }
                    table { width: 100%; border-collapse: collapse; }
                    th, td { border: 1px solid #ddd; padding: 8px; }
                    th { background-color: #f2f2f2; }
                    h2, h3 { margin-top: 20px; }
                    @media print {
                        button { display: none; }
                    }
                `;

                head.appendChild(title);
                head.appendChild(style);

                const body = printWindow.document.createElement('body');

                const container = printWindow.document.createElement('div');

                const heading = printWindow.document.createElement('h1');
                heading.textContent = `Test Record - ${patient.surname} ${patient.other_names}`;

                const content = printWindow.document.createElement('div');
                content.innerHTML = printContents;

                const buttonContainer = printWindow.document.createElement('div');
                buttonContainer.style.textAlign = 'center';
                buttonContainer.style.marginTop = '30px';

                const printButton = printWindow.document.createElement('button');
                printButton.textContent = 'Print';
                printButton.onclick = () => {
                    printWindow.print();
                    printWindow.close();
                };

                buttonContainer.appendChild(printButton);

                container.appendChild(heading);
                container.appendChild(content);
                container.appendChild(buttonContainer);

                body.appendChild(container);

                html.appendChild(head);
                html.appendChild(body);

                printWindow.document.body = body;
while (printWindow.document.head.firstChild) {
    printWindow.document.head.removeChild(printWindow.document.head.firstChild);
}
Array.from(head.children).forEach(child => {
    printWindow.document.head.appendChild(child);
});
while (printWindow.document.documentElement.firstChild) {
    printWindow.document.documentElement.removeChild(printWindow.document.documentElement.firstChild);
}
printWindow.document.documentElement.appendChild(head);
printWindow.document.documentElement.appendChild(body);

                printWindow.document.close();
            }
        }
    }, [patient]);

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Test Record Details" />
            <div className="flex justify-end mb-4">
                <Button
                    onClick={handlePrint}
                    className="bg-blue-600 hover:bg-blue-700 text-white"
                >
                    <Printer className="h-4 w-4 mr-2" />
                    Print Test Record
                </Button>
            </div>
            <div className="flex h-full flex-1 flex-col gap-4 rounded-xl p-4" id='testRecord'>

                {/* Form Container */}
                <div className="border-sidebar-border/70 dark:border-sidebar-border relative flex-1 overflow-hidden rounded-xl border p-4 md:p-6">
                    <div className="space-y-8">
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
                                        <TableCell className="border p-2">{patient.hospital_id}</TableCell>
                                        <TableCell className="border p-2">{patient.surname}</TableCell>
                                        <TableCell className="border p-2">{patient.other_names}</TableCell>
                                        <TableCell className="border p-2">{patient.gender}</TableCell>
                                        <TableCell className="border p-2">{patient.date_of_birth}</TableCell>
                                        <TableCell className="border p-2">{patient.nicl}</TableCell>
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
                                        <TableCell className="border p-2">{testRecord.test_date}</TableCell>
                                        <TableCell className="border p-2">{testRecord.weight}</TableCell>
                                        <TableCell className="border p-2">{testRecord.wc_cm}</TableCell>
                                        <TableCell className="border p-2">{testRecord.height}</TableCell>
                                        <TableCell className="border p-2">{testRecord.bsa}</TableCell>
                                        <TableCell className="border p-2">{testRecord.blood_pressure}</TableCell>
                                    </TableRow>
                                </TableBody>
                            </Table>
                        </div>

                        <div className="flex justify-evenly mt-1 gap-2 align-center">
                            <h2 className="text-xl font-semibold mt-2">Indication for study:</h2>
                            <div className="flex-1 p-2 border rounded">{testRecord.indication}</div>
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
                                    <TableCell className="border p-1">Aortic Root</TableCell>
                                    <TableCell className="border p-1">20-40 mm</TableCell>
                                    <TableCell className="border p-1">{testRecord.aortic_root}</TableCell>
                                    <TableCell className="border p-1">IVSD(mm)</TableCell>
                                    <TableCell className="border p-1">6 - 11</TableCell>
                                    <TableCell className="border p-1">{testRecord.ivsd}</TableCell>
                                </TableRow>
                                <TableRow>
                                    <TableCell className="border p-1">LA(AP)</TableCell>
                                    <TableCell className="border p-1">20-40 mm</TableCell>
                                    <TableCell className="border p-1">{testRecord.la_ap}</TableCell>
                                    <TableCell className="border p-1">LVIDd(mm)</TableCell>
                                    <TableCell className="border p-1">38 - 55</TableCell>
                                    <TableCell className="border p-1">{testRecord.lvidd}</TableCell>
                                </TableRow>
                                <TableRow>
                                    <TableCell className="border p-1">MV Excursion</TableCell>
                                    <TableCell className="border p-1"></TableCell>
                                    <TableCell className="border p-1">{testRecord.mv_excursion}</TableCell>
                                    <TableCell className="border p-1">LVPWD(mm)</TableCell>
                                    <TableCell className="border p-1">6 - 11</TableCell>
                                    <TableCell className="border p-1">{testRecord.lvpwd}</TableCell>
                                </TableRow>
                                <TableRow>
                                    <TableCell className="border p-1">EF slope (mm/s)</TableCell>
                                    <TableCell className="border p-1">50-180</TableCell>
                                    <TableCell className="border p-1">{testRecord.ef_slope}</TableCell>
                                    <TableCell className="border p-1">IVSs</TableCell>
                                    <TableCell className="border p-1"></TableCell>
                                    <TableCell className="border p-1">{testRecord.ivss}</TableCell>
                                </TableRow>
                                <TableRow>
                                    <TableCell className="border p-1">EPSS(mm)</TableCell>
                                    <TableCell className="border p-1">&le; 10</TableCell>
                                    <TableCell className="border p-1">{testRecord.epss}</TableCell>
                                    <TableCell className="border p-1">LVIDs</TableCell>
                                    <TableCell className="border p-1"></TableCell>
                                    <TableCell className="border p-1">{testRecord.lvids}</TableCell>
                                </TableRow>
                                <TableRow>
                                    <TableCell className="border p-1">RVID(mm)</TableCell>
                                    <TableCell className="border p-1">27 - 33</TableCell>
                                    <TableCell className="border p-1">{testRecord.rvid}</TableCell>
                                    <TableCell className="border p-1">LVPWs</TableCell>
                                    <TableCell className="border p-1"></TableCell>
                                    <TableCell className="border p-1">{testRecord.lvpws}</TableCell>
                                </TableRow>
                                <TableRow>
                                    <TableCell className="border p-1">RAA(cm<sup>2</sup>)</TableCell>
                                    <TableCell className="border p-1">27 - 33</TableCell>
                                    <TableCell className="border p-1">{testRecord.raa}</TableCell>
                                    <TableCell className="border p-1">FS(%)</TableCell>
                                    <TableCell className="border p-1">25-45</TableCell>
                                    <TableCell className="border p-1">{testRecord.fs}</TableCell>
                                </TableRow>
                                <TableRow>
                                    <TableCell className="border p-1">LAA(cm<sup>2</sup>)</TableCell>
                                    <TableCell className="border p-1">&le; 20</TableCell>
                                    <TableCell className="border p-1">{testRecord.laa}</TableCell>
                                    <TableCell className="border p-1">EF(%)</TableCell>
                                    <TableCell className="border p-1">&gt; 45</TableCell>
                                    <TableCell className="border p-1">{testRecord.ef}</TableCell>
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
                                    <TableCell className="border p-1">E Wave (m/s)</TableCell>
                                    <TableCell className="border p-1"></TableCell>
                                    <TableCell className="border p-1">{testRecord.e_wave}</TableCell>
                                    <TableCell className="border p-1">E' (lat)(m/s)</TableCell>
                                    <TableCell className="border p-1"></TableCell>
                                    <TableCell className="border p-1">{testRecord.e_lat}</TableCell>
                                </TableRow>
                                <TableRow>
                                    <TableCell className="border p-1">A Wave(m/s)</TableCell>
                                    <TableCell className="border p-1"></TableCell>
                                    <TableCell className="border p-1">{testRecord.a_wave}</TableCell>
                                    <TableCell className="border p-1">A'(lat)(m/s)</TableCell>
                                    <TableCell className="border p-1"></TableCell>
                                    <TableCell className="border p-1">{testRecord.a_lat}</TableCell>
                                </TableRow>
                                <TableRow>
                                    <TableCell className="border p-1">E/A</TableCell>
                                    <TableCell className="border p-1"></TableCell>
                                    <TableCell className="border p-1">{testRecord.e_a}</TableCell>
                                    <TableCell className="border p-1">S' (lat)(m/s)</TableCell>
                                    <TableCell className="border p-1"></TableCell>
                                    <TableCell className="border p-1">{testRecord.s_lat}</TableCell>
                                </TableRow>
                                <TableRow>
                                    <TableCell className="border p-1">E wave DT(m/s)</TableCell>
                                    <TableCell className="border p-1"></TableCell>
                                    <TableCell className="border p-1">{testRecord.e_wave_dt}</TableCell>
                                    <TableCell className="border p-1">E/E'</TableCell>
                                    <TableCell className="border p-1">&le;15</TableCell>
                                    <TableCell className="border p-1">{testRecord.e_e}</TableCell>
                                </TableRow>
                                <TableRow>
                                    <TableCell className="border p-1">IVRT(m/s)</TableCell>
                                    <TableCell className="border p-1"></TableCell>
                                    <TableCell className="border p-1">{testRecord.ivrt}</TableCell>
                                    <TableCell className="border p-1"></TableCell>
                                    <TableCell className="border p-1"></TableCell>
                                    <TableCell className="border p-1"></TableCell>
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
                                    <TableCell className="border p-1">Aortic Valve(Peak vel)</TableCell>
                                    <TableCell className="border p-1"></TableCell>
                                    <TableCell className="border p-1">{testRecord.aortic_valve_peak}</TableCell>
                                    <TableCell className="border p-1">Pulmonary valve (Peak vel)</TableCell>
                                    <TableCell className="border p-1"></TableCell>
                                    <TableCell className="border p-1">{testRecord.pulmonary_valve_peak}</TableCell>
                                </TableRow>
                                <TableRow>
                                    <TableCell className="border p-1">Aortic valve (pressure gradient)</TableCell>
                                    <TableCell className="border p-1"></TableCell>
                                    <TableCell className="border p-1">{testRecord.aortic_valve_press}</TableCell>
                                    <TableCell className="border p-1">Pulmonary valve (pressure gradient)</TableCell>
                                    <TableCell className="border p-1"></TableCell>
                                    <TableCell className="border p-1">{testRecord.pulmonary_valve_press}</TableCell>
                                </TableRow>
                            </TableBody>
                        </Table>

                        <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
                            <div className="border p-2 rounded">
                                <h3 className="font-semibold mb-1">Triscupid Regurgitation (Peak Velocity)</h3>
                                <p>{testRecord.triscupid_regurg_peak}</p>
                            </div>
                            <div className="border p-2 rounded">
                                <h3 className="font-semibold mb-1">Triscupid Regurgitation (Peak pressure gradient)</h3>
                                <p>{testRecord.triscupid_regurg_press}</p>
                            </div>
                            <div className="border p-2 rounded">
                                <h3 className="font-semibold mb-1">Mitral Regurgitation (Peak Velocity)</h3>
                                <p>{testRecord.mitral_regurg_peak}</p>
                            </div>
                            <div className="border p-2 rounded">
                                <h3 className="font-semibold mb-1">Mitral Regurgitation (Pressure Gradient)</h3>
                                <p>{testRecord.mitral_regurg_press}</p>
                            </div>
                            <div className="border p-2 rounded">
                                <h3 className="font-semibold mb-1">Aortic Regurgitation (Peak Velocity)</h3>
                                <p>{testRecord.aortic_regurg_peak}</p>
                            </div>
                            <div className="border p-2 rounded">
                                <h3 className="font-semibold mb-1">Aortic Regurgitation (Pressure Gradient)</h3>
                                <p>{testRecord.aortic_regurg_press}</p>
                            </div>
                            <div className="border p-2 rounded">
                                <h3 className="font-semibold mb-1">Mitral Stenosis(Valve Area)</h3>
                                <p>{testRecord.mitral_stenosis}</p>
                            </div>
                            <div className="border p-2 rounded">
                                <h3 className="font-semibold mb-1">Inferior Vena Cava (Diameter in Inspiration)</h3>
                                <p>{testRecord.inferior_vena_cava_insp}</p>
                            </div>
                            <div className="border p-2 rounded">
                                <h3 className="font-semibold mb-1">Inferior Vena Cava (Diameter in Expiration)</h3>
                                <p>{testRecord.inferior_vena_cava_expi}</p>
                            </div>
                            <div className="border p-2 rounded">
                                <h3 className="font-semibold mb-1">Inferior Vena Cava (Diameter with valsalva manoeuvre)</h3>
                                <p>{testRecord.inferior_vena_cava_diam}</p>
                            </div>
                            <div className="border p-2 rounded">
                                <h3 className="font-semibold mb-1">Est. Right Atrial Pressure</h3>
                                <p>{testRecord.est_right}</p>
                            </div>
                        </div>

                        <div className="space-y-4">
                            <div className="border p-4 rounded">
                                <h3 className="font-semibold mb-2">Pericardium</h3>
                                <p>{testRecord.pericardium}</p>
                            </div>
                            <div className="border p-4 rounded">
                                <h3 className="font-semibold mb-2">Summary</h3>
                                <p>{testRecord.summary}</p>
                            </div>
                            <div className="border p-4 rounded">
                                <h3 className="font-semibold mb-2">Conclusion</h3>
                                <p>{testRecord.conclusion}</p>
                            </div>
                            <div className="border p-4 rounded">
                                <h3 className="font-semibold mb-2">Signed</h3>
                                <p>{testRecord.sign}</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </AppLayout>
    );
}
