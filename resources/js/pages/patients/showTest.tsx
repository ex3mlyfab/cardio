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

export default function ShowTest({ testRecord }: {
    testRecord: {
        id:string;
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
        pasp: string;
        mvsp: string;
        mpap: string;
        summary: string;
        sign: string;
        conclusion: string;
        patient?: {
            hospital_id: string;
            surname: string;
            other_names: string;
            gender: string;
            date_of_birth: string;
            nicl: string;
        }
    }
}) {
    const handlePrint = useCallback(() => {
        const printContents = document.getElementById('testRecord')?.innerHTML;
        if (!printContents) return;

        const printWindow = window.open('', '_blank', 'width=1200,height=900');
        if (!printWindow) return;

        const cssLinks = Array.from(document.querySelectorAll('link[rel="stylesheet"]'))
            .map((link) => link.outerHTML)
            .join('\n');

        printWindow.document.open();
        printWindow.document.write(`
            <!DOCTYPE html>
            <html>
                <head>
                    <meta charset="UTF-8" />
                    <title>Test Record - ${testRecord.patient?.surname || 'Patient'} ${testRecord.patient?.other_names || ''}</title>
                    ${cssLinks}
                    <style>
                        html, body {
                            margin: 0;
                            padding: 0;
                            background: #ffffff;
                            color: #111827;
                            font-family: Arial, sans-serif;
                        }
                        body {
                            padding: 10px 18px;
                            font-size: 11px;
                        }
                        #testRecord {
                            display: block !important;
                            padding: 0 !important;
                            margin: 0 !important;
                        }
                        #testRecord > div {
                            padding: 0.35rem !important;
                        }
                        #testRecord .space-y-8 > * + *,
                        #testRecord .space-y-4 > * + * {
                            margin-top: 0.2rem !important;
                        }
                        #testRecord .gap-5,
                        #testRecord .gap-2 {
                            gap: 0.25rem !important;
                        }
                        #testRecord .grid {
                            gap: 0.25rem !important;
                        }
                        table {
                            width: 100%;
                            border-collapse: collapse;
                            margin-top: 0 !important;
                            table-layout: fixed;
                        }
                        th, td {
                            border: 1px solid #d1d5db;
                            padding: 2px 4px !important;
                            font-size: 10.5px;
                            vertical-align: top;
                            line-height: 1.2;
                        }
                        th {
                            background-color: #f2f2f2;
                        }
                        h2, h3, h6 {
                            margin: 0 0 2px 0;
                            font-size: 12px;
                        }
                        p, div {
                            margin: 0;
                        }
                        img {
                            max-width: 100%;
                            height: auto;
                        }
                        .mt-1 {
                            margin-top: 0 !important;
                        }
                        .rounded-xl, .rounded-lg, .rounded {
                            border-radius: 0 !important;
                        }
                        @media print {
                            body {
                                margin: 0;
                                padding: 0;
                            }
                            button {
                                display: none !important;
                            }
                        }
                    </style>
                </head>
                <body>
                    ${printContents}
                </body>
            </html>
        `);
        printWindow.document.close();
        printWindow.focus();
        printWindow.print();
    }, [testRecord]);

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Test Record Details" />
            <div className="no-print mb-4 flex justify-between">
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
                <div className="border-sidebar-border/70 dark:border-sidebar-border relative flex-1 overflow-hidden rounded-xl border p-4 md:p-6">
                    <div className="space-y-8">
                        {/* Header row: logo + patient details */}
                        <div className="grid grid-cols-3 gap-2 items-center border rounded-lg">
                            <div className="flex flex-col items-center justify-center border rounded-lg p-2.5">
                                <img src="/fmc_logo.jpeg" width={24} height={24} className="w-24 h-24 object-contain" alt="FMC Logo" />
                                <h6 className="text-[11px] text-center m-0 p-0">FEDERAL MEDICAL CENTRE</h6>
                                <h6 className="text-[11px] m-0 p-0">JABI - AIRPORT ROAD ABUJA</h6>
                                <h6 className="text-[11px] m-0 p-0">ECHOCARDIOGRAPHY LABORATORY</h6>
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
                                            <TableHead className="border p-2">NICL</TableHead>
                                        </TableRow>
                                    </TableHeader>
                                    <TableBody>
                                        <TableRow>
                                            <TableCell className="border p-2">{testRecord.patient?.hospital_id || 'N/A'}</TableCell>
                                            <TableCell className="border p-2">{testRecord?.patient?.surname || 'N/A'}</TableCell>
                                            <TableCell className="border p-2">{testRecord?.patient?.other_names || 'N/A'}</TableCell>
                                            <TableCell className="border p-2">{testRecord?.patient?.gender || 'N/A'}</TableCell>
                                            <TableCell className="border p-2">{testRecord?.patient?.date_of_birth || 'N/A'}</TableCell>
                                            <TableCell className="border p-2">{testRecord?.patient?.nicl || 'N/A'}</TableCell>
                                        </TableRow>
                                    </TableBody>
                                    <TableHeader>
                                        <TableRow>
                                            <TableHead className="border p-2">TEST DATE</TableHead>
                                            <TableHead className="border p-2">WEIGHT(kg)</TableHead>
                                            <TableHead className="border p-2">WC(cm)</TableHead>
                                            <TableHead className="w-[100px] border p-2">HEIGHT(cm)</TableHead>
                                            <TableHead className="border p-2">BSA(m<sup>2</sup>)</TableHead>
                                            <TableHead className="border p-2">BP(mmHg)</TableHead>
                                        </TableRow>
                                    </TableHeader>
                                    <TableBody>
                                        <TableRow>
                                            <TableCell className="border p-2">{new Date(testRecord.test_date).toLocaleDateString('en-GB', { day: '2-digit', month: 'short', year: 'numeric' })}</TableCell>
                                            <TableCell className="border p-2">{testRecord.weight}</TableCell>
                                            <TableCell className="border p-2">{testRecord.wc_cm}</TableCell>
                                            <TableCell className="border p-2">{testRecord.height}</TableCell>
                                            <TableCell className="border p-2">{testRecord.bsa}</TableCell>
                                            <TableCell className="border p-2">{testRecord.blood_pressure}</TableCell>
                                        </TableRow>
                                    </TableBody>
                                </Table>
                            </div>
                        </div>

                        {/* Indication row */}
                        <div className="grid grid-cols-4 gap-5 border rounded-lg p-2.5 text-sm">
                            <h2 className="font-semibold text-sm pt-0.5">Indication for study:</h2>
                            <div className="col-span-3 rounded border p-2">{testRecord.indication}</div>
                        </div>

                        {/* Dimensions table */}
                        <Table className="border">
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

                        {/* Diastolic function table */}
                        <Table className="mt-1">
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

                        {/* Valve velocities */}
                        <Table className="mt-1">
                            <TableBody>
                                <TableRow>
                                    <TableCell className="border p-1">Aortic Valve(Peak vel)</TableCell>
                                    <TableCell className="border p-1">{testRecord.aortic_valve_peak} m/s</TableCell>
                                    <TableCell className="border p-1">Pulmonary valve (Peak vel)</TableCell>
                                    <TableCell className="border p-1">{testRecord.pulmonary_valve_peak} m/s</TableCell>
                                </TableRow>
                                <TableRow>
                                    <TableCell className="border p-1">Aortic valve (pressure gradient)</TableCell>
                                    <TableCell className="border p-1">{testRecord.aortic_valve_press} mmHg</TableCell>
                                    <TableCell className="border p-1">Pulmonary valve (pressure gradient)</TableCell>
                                    <TableCell className="border p-1">{testRecord.pulmonary_valve_press} mmHg</TableCell>
                                </TableRow>
                            </TableBody>
                        </Table>

                        {/* Doppler measurements */}
                        <Table className="mt-1">
                            <TableBody>
                                <TableRow>
                                    <TableCell className="border p-1">TRV<sub>max</sub></TableCell>
                                    <TableCell className="border p-1">{testRecord.triscupid_regurg_peak}</TableCell>
                                    <TableCell className="border p-1">TR<sub>max</sub>PG</TableCell>
                                    <TableCell className="border p-1">{testRecord.triscupid_regurg_press}</TableCell>
                                    <TableCell className="border p-1">MRV<sub>max</sub></TableCell>
                                    <TableCell className="border p-1">{testRecord.mitral_regurg_peak}</TableCell>
                                </TableRow>
                                <TableRow>
                                    <TableCell className="border p-1">MR<sub>max</sub>PG</TableCell>
                                    <TableCell className="border p-1">{testRecord.mitral_regurg_press}</TableCell>
                                    <TableCell className="border p-1">ARV<sub>max</sub></TableCell>
                                    <TableCell className="border p-1">{testRecord.aortic_regurg_peak}</TableCell>
                                    <TableCell className="border p-1">AR<sub>max</sub>PG</TableCell>
                                    <TableCell className="border p-1">{testRecord.aortic_regurg_press}</TableCell>
                                </TableRow>
                                <TableRow>
                                    <TableCell className="border p-1">Mitral Stenosis (valve Area)</TableCell>
                                    <TableCell className="border p-1">{testRecord.mitral_stenosis}</TableCell>
                                    <TableCell className="border p-1">IVC<sub>(ins)</sub></TableCell>
                                    <TableCell className="border p-1">{testRecord.inferior_vena_cava_insp}</TableCell>
                                    <TableCell className="border p-1">IVC<sub>(ex)</sub></TableCell>
                                    <TableCell className="border p-1">{testRecord.inferior_vena_cava_expi}</TableCell>
                                </TableRow>
                                <TableRow>
                                    <TableCell className="border p-1">IVC<sub>(diameter with valva manoeuvre)</sub></TableCell>
                                    <TableCell className="border p-1">{testRecord.inferior_vena_cava_diam}</TableCell>
                                    <TableCell className="border p-1">Est. Right Atrial pressure</TableCell>
                                    <TableCell className="border p-1">{testRecord.est_right}</TableCell>
                                    <TableCell className="border p-1">PASP</TableCell>
                                    <TableCell className="border p-1">{testRecord.pasp}</TableCell>
                                </TableRow>
                                <TableRow>
                                    <TableCell className="border p-1">MPAP</TableCell>
                                    <TableCell className="border p-1">{testRecord.mpap}</TableCell>
                                    <TableCell className="border p-1">RVSP</TableCell>
                                    <TableCell className="border p-1">{testRecord.mvsp}</TableCell>
                                    <TableCell className="border p-1"></TableCell>
                                    <TableCell className="border p-1"></TableCell>
                                </TableRow>
                            </TableBody>
                        </Table>

                        {/* Report sections */}
                        <div className="space-y-4">
                            {/* Pericardium */}
                            <div className="grid grid-cols-4 gap-5 text-sm rounded border p-4">
                                <h3 className="font-semibold text-sm mb-2">Pericardium</h3>
                                <p className="col-span-3">{testRecord.pericardium}</p>
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

                            {/* Signed */}
                            <div className="grid grid-cols-4 gap-5 text-sm rounded border p-4">
                                <h3 className="font-semibold text-sm mb-2">Signed</h3>
                                <p className="col-span-3">{testRecord.sign}</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </AppLayout>
    );
}
