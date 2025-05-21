
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
import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle
} from "@/components/ui/card";
import { Button } from '@/components/ui/button';
import { CalendarIcon, FileText } from 'lucide-react';

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Dashboard',
        href: '/dashboard',
    },
    {
        title: 'Patients',
        href: '/patients',
    },
    {
        title: 'Patient Details',
        href: '#',
    }
];

export default function PatientDetails({ patient, tests }: {
    patient: {
        hospital_id: string;
        surname: string;
        other_names: string;
        gender: string;
        date_of_birth: string;
        nicl: string;
    },
    tests: Array<{
        id: number;
        test_date: string;
        weight: number;
        wc_cm: number;
        height: number;
        bsa: number;
        blood_pressure: string;
        indication: string;
        // Other test record fields
    }>
}) {
    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Patient Details" />
            <div className="flex h-full flex-1 flex-col gap-4 rounded-xl p-4">
                {/* Patient Details Card */}
                <Card className="shadow-md">
                    <CardHeader>
                        <CardTitle>Patient Information</CardTitle>
                        <CardDescription>Personal and demographic details</CardDescription>
                    </CardHeader>
                    <CardContent>
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
                        </Table>
                    </CardContent>
                </Card>

                {/* Test Records Section */}
                <div className="mt-6">
                    <h2 className="text-2xl font-semibold mb-4">Test Records</h2>

                    {tests.length === 0 ? (
                        <Card className="shadow-md">
                            <CardContent className="p-6">
                                <p className="text-center text-gray-500">No test records found for this patient.</p>
                                <div className="flex justify-center mt-4">
                                    <Button asChild>
                                        <Link href={`/patients/${patient.hospital_id}/tests/create`}>Create New Test</Link>
                                    </Button>
                                </div>
                            </CardContent>
                        </Card>
                    ) : (
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                            {tests.map((record, index) => (
                                <Card key={record.id || index} className="shadow-md hover:shadow-lg transition-shadow">
                                    <CardHeader>
                                        <CardTitle className="flex items-center justify-between">
                                            <span>Test Record</span>
                                            <span className="text-sm font-normal bg-blue-100 dark:bg-blue-900 px-2 py-1 rounded-full">
                                                {record.test_date}
                                            </span>
                                        </CardTitle>
                                        <CardDescription>
                                            <div className="flex items-center gap-1 text-sm">
                                                <CalendarIcon className="h-4 w-4" />
                                                <span>{record.test_date}</span>
                                            </div>
                                        </CardDescription>
                                    </CardHeader>
                                    <CardContent>
                                        <div className="space-y-2">
                                            <div className="grid grid-cols-2 gap-2">
                                                <div className="text-sm">
                                                    <span className="font-medium">Weight:</span> {record.weight} kg
                                                </div>
                                                <div className="text-sm">
                                                    <span className="font-medium">Height:</span> {record.height} cm
                                                </div>
                                                <div className="text-sm">
                                                    <span className="font-medium">BSA:</span> {record.bsa} m²
                                                </div>
                                                <div className="text-sm">
                                                    <span className="font-medium">BP:</span> {record.blood_pressure}
                                                </div>
                                            </div>
                                            <div className="mt-2">
                                                <span className="font-medium text-sm">Indication:</span>
                                                <p className="text-sm truncate">{record.indication}</p>
                                            </div>
                                        </div>
                                    </CardContent>
                                    <CardFooter className="flex justify-end">
                                        <Button variant="outline" size="sm" asChild>
                                            <Link href={`/patients/showTest/${record.id}`}>
                                                <FileText className="h-4 w-4 mr-1" />
                                                View Details
                                            </Link>
                                        </Button>
                                    </CardFooter>
                                </Card>
                            ))}
                        </div>
                    )}

                    <div className="mt-6 flex justify-end">
                        <Button asChild>
                            <Link href={`/patients/${patient.hospital_id}/tests/create`}>Add New Test Record</Link>
                        </Button>
                    </div>
                </div>
            </div>
        </AppLayout>
    );
}
