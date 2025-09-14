
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

export default function PatientDetails({ patient, tests, kidsTest }: {
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
    }>,
    kidsTest: Array<{
        id: number;
        test_date: string;
        weight: number;
        height: number;
        bsa: number;
        blood_pressure: string;
        indication: string;
        // Other test record fields
    }>;
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
                    <h2 className="mb-4 text-2xl font-semibold">Test Records</h2>

                    {tests.length === 0 ? (
                        <Card className="shadow-md">
                            <CardContent className="p-6">
                                <p className="text-center text-gray-500">No test records found for this patient.</p>
                                <div className="mt-4 flex justify-center">
                                    <Button asChild>
                                        <Link href={`/patients/${patient.hospital_id}/tests/create`}>Create New Test</Link>
                                    </Button>
                                </div>
                            </CardContent>
                        </Card>
                    ) : (
                        <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
                            {tests.map((record, index) => (
                                <Card key={record.id || index} className="shadow-md transition-shadow hover:shadow-lg">
                                    <CardHeader>
                                        <CardTitle className="flex items-center justify-between">
                                            <span>Test Record</span>
                                            <span className="rounded-full bg-blue-100 px-2 py-1 text-sm font-normal dark:bg-blue-900">
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
                                                <span className="text-sm font-medium">Indication:</span>
                                                <p className="truncate text-sm">{record.indication}</p>
                                            </div>
                                        </div>
                                    </CardContent>
                                    <CardFooter className="flex justify-end">
                                        <Button variant="outline" size="sm" asChild>
                                            <Link href={`/patients/showTest/${record.id}`}>
                                                <FileText className="mr-1 h-4 w-4" />
                                                View Details
                                            </Link>
                                        </Button>
                                    </CardFooter>
                                </Card>
                            ))}
                        </div>
                    )}
                    {kidsTest.length === 0 ? null : (
                        <div className="mt-10">
                            <h2 className="mb-4 text-2xl font-semibold">Paediatric Test Records</h2>
                            <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
                                {kidsTest.map((record, index) => (
                                    <Card key={record.id || index} className="shadow-md transition-shadow hover:shadow-lg">
                                        <CardHeader>
                                            <CardTitle className="flex items-center justify-between">
                                                <span>Paediatric Test Record</span>
                                                <span className="rounded-full bg-green-100 px-2 py-1 text-sm font-normal dark:bg-green-900">
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
                                                    <span className="text-sm font-medium">Indication:</span>
                                                    <p className="truncate text-sm">{record.indication}</p>
                                                </div>
                                            </div>
                                        </CardContent>
                                        <CardFooter className="flex justify-end">
                                            <Button variant="outline" size="sm" asChild>
                                                <Link href={`/kids/childReading/${record.id}`}>
                                                    <FileText className="mr-1 h-4 w-4" />
                                                    View Details
                                                </Link>
                                            </Button>
                                        </CardFooter>
                                    </Card>
                                ))}
                            </div>
                        </div>
                    )}
                    <div className="mt-6 flex justify-end">
                        <Button asChild>
                            <Link href={`/patients/${patient.hospital_id}/tests/create`}>Add New Adult Record</Link>
                        </Button>
                        <Button className="ml-4" variant="secondary" asChild>
                            <Link href={`/kids/create`}>Add New Paediatric Record</Link>
                        </Button>
                    </div>
                </div>
            </div>
        </AppLayout>
    );
}
