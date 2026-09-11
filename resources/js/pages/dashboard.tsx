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
    Calendar,
    Plus,
    Stethoscope,
    Baby
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
            <div className="flex h-full flex-1 flex-col gap-4 rounded-[1.25rem] p-3 md:p-5">
                <div className="flex flex-wrap gap-3">
                    <Button asChild className="h-11 rounded-xl bg-sky-700 px-4 text-white shadow-sm hover:bg-sky-800">
                        <Link href={route('patients.create')}>
                            <Plus className="mr-2 h-4 w-4" />
                            New Adult Test
                        </Link>
                    </Button>
                    <Button asChild variant="outline" className="h-11 rounded-xl border-sky-200 bg-white px-4 text-sky-700 hover:bg-sky-50 hover:text-sky-800">
                        <Link href={route('patients.index')}>
                            <Stethoscope className="mr-2 h-4 w-4" />
                            Adult Tests
                        </Link>
                    </Button>
                    <Button asChild className="h-11 rounded-xl bg-emerald-600 px-4 text-white shadow-sm hover:bg-emerald-700">
                        <Link href={route('kids.create')}>
                            <Plus className="mr-2 h-4 w-4" />
                            New Paediatric Test
                        </Link>
                    </Button>
                    <Button asChild variant="outline" className="h-11 rounded-xl border-emerald-200 bg-white px-4 text-emerald-700 hover:bg-emerald-50 hover:text-emerald-800">
                        <Link href={route('kids.index')}>
                            <Baby className="mr-2 h-4 w-4" />
                            Paediatric Tests
                        </Link>
                    </Button>
                </div>

                <div className="grid auto-rows-min gap-4 md:grid-cols-2 xl:grid-cols-4">
                    <Card className="border border-border/80 bg-card shadow-[0_1px_2px_rgba(15,23,42,0.04),0_10px_24px_rgba(15,23,42,0.03)]">
                        <CardHeader className="pb-2">
                            <CardTitle className="text-sm font-medium uppercase tracking-[0.14em] text-muted-foreground">Tests this year</CardTitle>
                            <CardDescription className="text-sm text-muted-foreground">Total tests in {new Date().getFullYear()}</CardDescription>
                        </CardHeader>
                        <CardContent>
                            <div className="flex items-end justify-between gap-3">
                                <div className="text-3xl font-semibold tracking-tight text-foreground">{yearlyTestCount}</div>
                                <div className="rounded-xl bg-primary/10 p-2.5 text-primary">
                                    <Activity className="h-5 w-5" />
                                </div>
                            </div>
                        </CardContent>
                    </Card>

                    <Card className="border border-border/80 bg-card shadow-[0_1px_2px_rgba(15,23,42,0.04),0_10px_24px_rgba(15,23,42,0.03)]">
                        <CardHeader className="pb-2">
                            <CardTitle className="text-sm font-medium uppercase tracking-[0.14em] text-muted-foreground">This month</CardTitle>
                            <CardDescription className="text-sm text-muted-foreground">Adult tests in {new Date().toLocaleString('default', { month: 'long' })}</CardDescription>
                        </CardHeader>
                        <CardContent>
                            <div className="flex items-end justify-between gap-3">
                                <div className="text-3xl font-semibold tracking-tight text-foreground">{monthlyTestCount}</div>
                                <div className="rounded-xl bg-emerald-500/10 p-2.5 text-emerald-600">
                                    <Calendar className="h-5 w-5" />
                                </div>
                            </div>
                        </CardContent>
                    </Card>

                    <Card className="border border-border/80 bg-card shadow-[0_1px_2px_rgba(15,23,42,0.04),0_10px_24px_rgba(15,23,42,0.03)]">
                        <CardHeader className="pb-2">
                            <CardTitle className="text-sm font-medium uppercase tracking-[0.14em] text-muted-foreground">Paediatric this month</CardTitle>
                            <CardDescription className="text-sm text-muted-foreground">Kids tests in {new Date().toLocaleString('default', { month: 'long' })}</CardDescription>
                        </CardHeader>
                        <CardContent>
                            <div className="flex items-end justify-between gap-3">
                                <div className="text-3xl font-semibold tracking-tight text-foreground">{monthlyKidsTestCount}</div>
                                <div className="rounded-xl bg-cyan-500/10 p-2.5 text-cyan-600">
                                    <Calendar className="h-5 w-5" />
                                </div>
                            </div>
                        </CardContent>
                    </Card>

                    <Card className="border border-border/80 bg-card shadow-[0_1px_2px_rgba(15,23,42,0.04),0_10px_24px_rgba(15,23,42,0.03)]">
                        <CardHeader className="pb-2">
                            <CardTitle className="text-sm font-medium uppercase tracking-[0.14em] text-muted-foreground">Paediatric this year</CardTitle>
                            <CardDescription className="text-sm text-muted-foreground">Total kids tests in {new Date().getFullYear()}</CardDescription>
                        </CardHeader>
                        <CardContent>
                            <div className="flex items-end justify-between gap-3">
                                <div className="text-3xl font-semibold tracking-tight text-foreground">{yearKidsTestCount}</div>
                                <div className="rounded-xl bg-violet-500/10 p-2.5 text-violet-600">
                                    <Activity className="h-5 w-5" />
                                </div>
                            </div>
                        </CardContent>
                    </Card>

                    <Card className="border border-border/80 bg-card shadow-[0_1px_2px_rgba(15,23,42,0.04),0_10px_24px_rgba(15,23,42,0.03)] md:col-span-2 xl:col-span-4">
                        <CardHeader className="pb-2">
                            <CardTitle className="text-lg font-semibold text-foreground">Gender distribution</CardTitle>
                            <CardDescription className="text-sm text-muted-foreground">Male to female patient ratio</CardDescription>
                        </CardHeader>
                        <CardContent className="h-[190px]">
                            <ResponsiveContainer width="100%" height="100%">
                                <PieChart>
                                    <Pie
                                        data={genderChartData}
                                        cx="50%"
                                        cy="50%"
                                        labelLine={false}
                                        label={({ name, percent }) => `${name}: ${(percent! * 100).toFixed(0)}%`}
                                        outerRadius={68}
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
                </div>

                <Card className="overflow-hidden border border-border/80 bg-card shadow-[0_1px_2px_rgba(15,23,42,0.04),0_10px_24px_rgba(15,23,42,0.03)]">
                    <CardHeader className="border-b border-border/80 bg-muted/30 px-5 py-5 md:px-6">
                        <div className="flex flex-col gap-3 md:flex-row md:items-end md:justify-between">
                            <div>
                                <CardTitle className="text-xl font-semibold text-foreground">Patients</CardTitle>
                                <CardDescription className="mt-1 text-sm text-muted-foreground">Registered patients and their reported test activity</CardDescription>
                            </div>
                        </div>
                        <div className="mt-2 max-w-sm">
                            <Input
                                placeholder="Search by name or hospital ID..."
                                value={search}
                                onChange={handleSearchChange}
                                className="h-11 rounded-xl border-border bg-background text-sm shadow-none"
                            />
                        </div>
                    </CardHeader>
                    <CardContent className="p-0">
                        <Table aria-label="Patients list">
                            <TableHeader>
                                <TableRow className="bg-muted/20 hover:bg-muted/20">
                                    <TableHead scope="col" className="px-5 py-3 text-[11px] font-semibold uppercase tracking-[0.14em] text-muted-foreground">Hospital ID</TableHead>
                                    <TableHead scope="col" className="px-5 py-3 text-[11px] font-semibold uppercase tracking-[0.14em] text-muted-foreground">Surname</TableHead>
                                    <TableHead scope="col" className="px-5 py-3 text-[11px] font-semibold uppercase tracking-[0.14em] text-muted-foreground">Other Names</TableHead>
                                    <TableHead scope="col" className="px-5 py-3 text-[11px] font-semibold uppercase tracking-[0.14em] text-muted-foreground">Gender</TableHead>
                                    <TableHead scope="col" className="px-5 py-3 text-[11px] font-semibold uppercase tracking-[0.14em] text-muted-foreground">Date of Birth</TableHead>
                                    <TableHead scope="col" className="px-5 py-3 text-[11px] font-semibold uppercase tracking-[0.14em] text-muted-foreground">Tests</TableHead>
                                    <TableHead scope="col" className="px-5 py-3 text-[11px] font-semibold uppercase tracking-[0.14em] text-muted-foreground">Actions</TableHead>
                                </TableRow>
                            </TableHeader>
                            <TableBody>
                                {patients.data.length === 0 ? (
                                    <TableRow>
                                        <TableCell colSpan={7} className="px-5 py-8 text-center text-sm text-muted-foreground">
                                            No patients found
                                        </TableCell>
                                    </TableRow>
                                ) : (
                                    patients.data.map((patient) => (
                                        <TableRow key={patient.id} className="border-b border-border/60 last:border-0 hover:bg-muted/20">
                                            <TableCell className="px-5 py-3 text-sm text-foreground">{patient.hospital_id}</TableCell>
                                            <TableCell className="px-5 py-3 text-sm text-foreground">{patient.surname}</TableCell>
                                            <TableCell className="px-5 py-3 text-sm text-foreground">{patient.other_names}</TableCell>
                                            <TableCell className="px-5 py-3 text-sm text-foreground">{patient.gender}</TableCell>
                                            <TableCell className="px-5 py-3 text-sm text-foreground">
                                                {patient.date_of_birth ? new Date(patient.date_of_birth).toLocaleDateString() : 'N/A'}
                                            </TableCell>
                                            <TableCell className="px-5 py-3 text-sm text-foreground">
                                                {patient.test_records_count}- Adult • {patient.child_readings_count}- Kids
                                            </TableCell>
                                            <TableCell className="px-5 py-3">
                                                <Button variant="outline" size="sm" asChild className="h-9 rounded-lg">
                                                    <Link href={route('patients.show', patient.id)}>
                                                        <FileText className="mr-1.5 h-4 w-4" />
                                                        View
                                                    </Link>
                                                </Button>
                                            </TableCell>
                                        </TableRow>
                                    ))
                                )}
                            </TableBody>
                        </Table>

                        {patients.data.length > 0 && (
                            <div className="flex flex-col gap-3 border-t border-border/80 p-4 md:flex-row md:items-center md:justify-between md:px-6">
                                <div className="text-sm text-muted-foreground">
                                    Showing {patients.from} to {patients.to} of {patients.total} patients
                                </div>
                                <div className="flex flex-wrap gap-2">
                                    {patients.links.map((link, i) => {
                                        const labelText = link.label.replace(/&laquo;/g, '«').replace(/&raquo;/g, '»');

                                        return (
                                            <Button
                                                key={i}
                                                variant={link.active ? 'default' : 'outline'}
                                                size="sm"
                                                disabled={!link.url}
                                                onClick={() => link.url && router.get(link.url)}
                                                className="h-9 rounded-lg"
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
