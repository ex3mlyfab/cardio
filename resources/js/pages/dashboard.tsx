import AppLayout from '@/layouts/app-layout';
import { type BreadcrumbItem } from '@/types';
import { Head, Link, router } from '@inertiajs/react';
import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle
} from '@/components/ui/card';
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow
} from '@/components/ui/table';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import {
    ResponsiveContainer,
    PieChart,
    Pie,
    Cell,
    Tooltip
} from 'recharts';
import {
    FileText,
    Activity,
    Calendar
} from 'lucide-react';
import { useState, useCallback } from 'react';
import { debounce } from 'lodash';

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Dashboard',
        href: '/dashboard',
    },
];

// Colors for the pie chart
const COLORS = ['#0088FE', '#FF8042'];

interface Patient {
    id: number;
    hospital_id: string;
    surname: string;
    other_names: string;
    gender: string;
    date_of_birth: string;
    test_records_count: number;
    child_readings_count: number;
}

interface PaginationLink {
    url: string | null;
    label: string;
    active: boolean;
}

interface PaginationData {
    data: Patient[];
    links: PaginationLink[];
    from: number;
    to: number;
    total: number;
}

interface DashboardProps {
    yearlyTestCount: number;
    monthlyTestCount: number;
    yearKidsTestCount: number;
    monthlyKidsTestCount: number;
    genderData: {
        male: number;
        female: number;
    };
    patients: PaginationData;
    filters: {
        search: string;
    };
}

export default function Dashboard({
    yearlyTestCount,
    monthlyTestCount,
    yearKidsTestCount,
    monthlyKidsTestCount,
    genderData,
    patients,
    filters
}: DashboardProps) {
    const [search, setSearch] = useState(filters.search || '');

    // Convert gender data to format for pie chart
    const genderChartData = [
        { name: 'Male', value: genderData.male },
        { name: 'Female', value: genderData.female }
    ];

    // Use useCallback to prevent recreation of the debounced function on each render
    const debouncedSearch = useCallback(
        debounce((value: string) => {
            router.get(
                route('dashboard'),
                { search: value },
                { preserveState: true, replace: true }
            );
        }, 300),
        []
    );

    // Handle search input changes with debounce
    const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setSearch(e.target.value);
        debouncedSearch(e.target.value);
    };

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Dashboard" />
            <div className="flex h-full flex-1 flex-col gap-4 rounded-xl p-4">
                <div className="grid auto-rows-min gap-4 md:grid-cols-3">
                    {/* Card 1: Yearly Test Count */}
                    <Card className="shadow-md">
                        <CardHeader className="pb-2">
                            <CardTitle className="text-lg">Tests This Year</CardTitle>
                            <CardDescription>Total tests conducted in {new Date().getFullYear()}</CardDescription>
                        </CardHeader>
                        <CardContent>
                            <div className="flex items-center justify-between">
                                <div className="text-3xl font-bold">{yearlyTestCount}</div>
                                <Activity className="h-8 w-8 text-blue-500" />
                            </div>
                        </CardContent>
                    </Card>

                    {/* Card 2: Gender Distribution */}
                    <Card className="shadow-md">
                        <CardHeader className="pb-2">
                            <CardTitle className="text-lg">Gender Distribution</CardTitle>
                            <CardDescription>Male to female patient ratio</CardDescription>
                        </CardHeader>
                        <CardContent className="h-[150px]">
                            <ResponsiveContainer width="100%" height="100%">
                                <PieChart>
                                    <Pie
                                        data={genderChartData}
                                        cx="50%"
                                        cy="50%"
                                        labelLine={false}
                                        label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
                                        outerRadius={60}
                                        fill="#8884d8"
                                        dataKey="value"
                                    >
                                        {genderChartData.map((entry, index) => (
                                            <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                                        ))}
                                    </Pie>
                                    <Tooltip />
                                </PieChart>
                            </ResponsiveContainer>
                        </CardContent>
                    </Card>

                    {/* Card 3: Monthly Test Count */}
                    <Card className="shadow-md">
                        <CardHeader className="pb-2">
                            <CardTitle className="text-lg">Tests This Month</CardTitle>
                            <CardDescription>Tests conducted in {new Date().toLocaleString('default', { month: 'long' })}</CardDescription>
                        </CardHeader>
                        <CardContent>
                            <div className="flex items-center justify-between">
                                <div className="text-3xl font-bold">{monthlyTestCount}</div>
                                <Calendar className="h-8 w-8 text-green-500" />
                            </div>
                        </CardContent>
                    </Card>
                    {/* Card 4: Monthly Kids Test Count */}
                    <Card className="shadow-md">
                        <CardHeader className="pb-2">
                            <CardTitle className="text-lg">Kids Tests This Month</CardTitle>
                            <CardDescription>Kids Tests conducted in {new Date().toLocaleString('default', { month: 'long' })}</CardDescription>
                        </CardHeader>
                        <CardContent>
                            <div className="flex items-center justify-between">
                                <div className="text-3xl font-bold">{monthlyKidsTestCount}</div>
                                <Calendar className="h-8 w-8 text-green-500" />
                            </div>
                        </CardContent>
                    </Card>

                    {/* Card 5: Yearly Kids Test Count */}
                    <Card className="shadow-md">
                        <CardHeader className="pb-2">
                            <CardTitle className="text-lg">Kids Tests This Year</CardTitle>
                            <CardDescription>Total Kids tests conducted in {new Date().getFullYear()}</CardDescription>
                        </CardHeader>
                        <CardContent>
                            <div className="flex items-center justify-between">
                                <div className="text-3xl font-bold">{yearKidsTestCount}</div>
                                <Activity className="h-8 w-8 text-blue-500" />
                            </div>
                        </CardContent>
                    </Card>
                </div>

                {/* Patients Table */}
                <Card className="shadow-md">
                    <CardHeader>
                        <CardTitle>Patients</CardTitle>
                        <CardDescription>List of all registered patients and their test records</CardDescription>
                        <div className="mt-2">
                            <Input
                                placeholder="Search by name or hospital ID..."
                                value={search}
                                onChange={handleSearchChange}
                                className="max-w-sm"
                            />
                        </div>
                    </CardHeader>
                    <CardContent>
                        <Table aria-label="Patients list">
                            <TableHeader>
                                <TableRow>
                                    <TableHead scope="col">Hospital ID</TableHead>
                                    <TableHead scope="col">Surname</TableHead>
                                    <TableHead scope="col">Other Names</TableHead>
                                    <TableHead scope="col">Gender</TableHead>
                                    <TableHead scope="col">Date of Birth</TableHead>
                                    <TableHead scope="col">Tests</TableHead>
                                    <TableHead scope="col">Actions</TableHead>
                                </TableRow>
                            </TableHeader>
                            <TableBody>
                                {patients.data.length === 0 ? (
                                    <TableRow>
                                        <TableCell colSpan={7} className="text-center py-4">
                                            No patients found
                                        </TableCell>
                                    </TableRow>
                                ) : (
                                    patients.data.map((patient) => (
                                        <TableRow key={patient.id}>
                                            <TableCell>{patient.hospital_id}</TableCell>
                                            <TableCell>{patient.surname}</TableCell>
                                            <TableCell>{patient.other_names}</TableCell>
                                            <TableCell>{patient.gender}</TableCell>
                                            <TableCell>
                                                {patient.date_of_birth ?
                                                    new Date(patient.date_of_birth).toLocaleDateString() :
                                                    'N/A'
                                                }
                                            </TableCell>
                                            <TableCell>{patient.test_records_count }- Adult ||
                                                {patient.child_readings_count} - Kids
                                            </TableCell>
                                            <TableCell>
                                                <Button variant="outline" size="sm" asChild>
                                                    <Link href={route('patients.show', patient.id)}>
                                                        <FileText className="h-4 w-4 mr-1" />
                                                        View
                                                    </Link>
                                                </Button>
                                            </TableCell>
                                        </TableRow>
                                    ))
                                )}
                            </TableBody>
                        </Table>

                        {/* Pagination */}
                        {patients.data.length > 0 && (
                            <div className="mt-4 flex items-center justify-between">
                                <div className="text-sm text-gray-500">
                                    Showing {patients.from} to {patients.to} of {patients.total} patients
                                </div>
                                <div className="flex space-x-2">
                                    {patients.links.map((link, i) => {
                                        // Parse the label to handle HTML entities
                                        const labelText = link.label.replace(/&laquo;/g, '«').replace(/&raquo;/g, '»');

                                        return (
                                            <Button
                                                key={i}
                                                variant={link.active ? "default" : "outline"}
                                                size="sm"
                                                disabled={!link.url}
                                                onClick={() => link.url && router.get(link.url)}
                                            >
                                                {labelText}
                                            </Button>
                                        );
                                    })}
                                </div>
                            </div>
                        )}
                    </CardContent>
                </Card>
            </div>

        </AppLayout>
    );
}
