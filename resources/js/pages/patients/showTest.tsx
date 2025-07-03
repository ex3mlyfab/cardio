
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
                        <div className="mb-4 flex items-center justify-between" style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '10px', alignItems: 'center' }}>
                            <div
                                className="flex flex-col items-center justify-center"
                                style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', flexDirection: 'column', border: '1px solid #ddd', padding: '10px', borderRadius: '8px' }}
                            >
                                <img src="/fmc_logo.jpeg" style={{ width: '100px', height: '100px' }} alt="FMC Logo" />
                                <h6 className="p-o m-0" style={{ margin: 0, padding: 0, fontSize: '11px', textAlign: 'center' }}>
                                    FEDERAL MEDICAL CENTRE
                                </h6>

                                <h6 className="p-o m-0" style={{ margin: 0, padding: 0, fontSize: '11px' }}>
                                    JABI - AIRPORT ROAD ABUJA{' '}
                                </h6>

                                <h6 className="p-o m-0" style={{ margin: 0, padding: 0, fontSize: '11px' }}>
                                    ECHOCARDIOGRAPHY LABORATORY
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
                                            <TableHead className="border p-2">
                                                BSA(m<sup>2</sup>)
                                            </TableHead>
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
                                    <TableCell className="border p-1">
                                        RAA(cm<sup>2</sup>)
                                    </TableCell>
                                    <TableCell className="border p-1">27 - 33</TableCell>
                                    <TableCell className="border p-1">{testRecord.raa}</TableCell>
                                    <TableCell className="border p-1">FS(%)</TableCell>
                                    <TableCell className="border p-1">25-45</TableCell>
                                    <TableCell className="border p-1">{testRecord.fs}</TableCell>
                                </TableRow>
                                <TableRow>
                                    <TableCell className="border p-1">
                                        LAA(cm<sup>2</sup>)
                                    </TableCell>
                                    <TableCell className="border p-1">&le; 20</TableCell>
                                    <TableCell className="border p-1">{testRecord.laa}</TableCell>
                                    <TableCell className="border p-1">EF(%)</TableCell>
                                    <TableCell className="border p-1">&gt; 45</TableCell>
                                    <TableCell className="border p-1">{testRecord.ef}</TableCell>
                                </TableRow>
                            </TableBody>
                        </Table>
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
                        <Table className="nt-1">
                            <TableBody>
                                <TableRow>
                                    <TableCell className="border p-1">
                                        {' '}
                                        TRV<sub>max</sub>
                                    </TableCell>
                                    <TableCell className="border p-1">{testRecord.triscupid_regurg_peak}</TableCell>
                                    <TableCell className="border p-1">
                                        TR<sub>max</sub>PG
                                    </TableCell>
                                    <TableCell className="border p-1">{testRecord.triscupid_regurg_press}</TableCell>
                                    <TableCell className="border p-1">
                                        {' '}
                                        MRV <sub>max</sub>
                                    </TableCell>
                                    <TableCell className="border p-1"> {testRecord.mitral_regurg_peak}</TableCell>
                                </TableRow>
                                <TableRow>
                                    <TableCell className="border p-1">
                                        {' '}
                                        MR<sub>max</sub>PG
                                    </TableCell>
                                    <TableCell className="border p-1">{testRecord.mitral_regurg_press}</TableCell>
                                    <TableCell className="border p-1">
                                        ARV<sub>max</sub>
                                    </TableCell>
                                    <TableCell className="border p-1">{testRecord.aortic_regurg_peak}</TableCell>
                                    <TableCell className="border p-1">
                                        AR<sub>max</sub>PG
                                    </TableCell>
                                    <TableCell className="border p-1">{testRecord.aortic_regurg_press}</TableCell>
                                </TableRow>
                                <TableRow>
                                    <TableCell className="border p-1">Mitral Stenosis (valve Area)</TableCell>
                                    <TableCell className="border p-1">{testRecord.mitral_stenosis}</TableCell>
                                    <TableCell className="border p-1">
                                        IVC<sub>(ins)</sub>
                                    </TableCell>
                                    <TableCell className="border p-1">{testRecord.inferior_vena_cava_insp}</TableCell>
                                    <TableCell className="border p-1">
                                        IVC<sub>(ex)</sub>
                                    </TableCell>
                                    <TableCell className="border p-1">{testRecord.inferior_vena_cava_expi}</TableCell>
                                </TableRow>
                                <TableRow>
                                    <TableCell className="border p-1">
                                        IVC<sub>(diameter with valva manoeuvre)</sub>
                                    </TableCell>
                                    <TableCell className="border p-1">{testRecord.inferior_vena_cava_diam}</TableCell>
                                    <TableCell className="border p-1">Est. Right Aterial pressure</TableCell>
                                    <TableCell className="border p-1">{testRecord.est_right}</TableCell>
                                    <TableCell className="border p-1">PASP</TableCell>
                                    <TableCell className="border p-1">{testRecord.pasp}</TableCell>
                                </TableRow>
                                <TableRow>
                                    <TableCell className="border p-1">MPAP</TableCell>
                                    <TableCell className="border p-1">{testRecord.mpap}</TableCell>
                                    <TableCell className="border p-1">RVSP</TableCell>
                                    <TableCell className="border p-1">{testRecord.mvsp}</TableCell>
                                    <TableCell className="border p-1"> </TableCell>
                                    <TableCell className="border p-1"> </TableCell>
                                </TableRow>
                            </TableBody>
                        </Table>

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
                                    {testRecord.pericardium}
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
                                    Signed
                                </h3>
                                <p
                                    style={{
                                        gridColumn: 'span 3',
                                    }}
                                >
                                    {testRecord.sign}
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </AppLayout>
    );
}
