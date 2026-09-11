
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
import { FileText, FilePenLine } from 'lucide-react';
import { useState, useCallback } from 'react';
import { debounce } from 'lodash';
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from '@/components/ui/select';

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Dashboard',
        href: '/dashboard',
    },
    {
        title: 'All Tests',
        href: '/patients',
    }
];

interface Patient {
    id: number;
    hospital_id: string;
    surname: string;
    other_names: string;
}

interface TestRecord {
    id: number;
    patient: Patient;
    test_date: string;
    conclusion: string;
    created_at: string;
}

interface PaginationLink {
    url: string | null;
    label: string;
    active: boolean;
}

interface PaginationData {
    data: TestRecord[];
    links: PaginationLink[];
    from: number;
    to: number;
    total: number;
}

interface PatientsIndexProps {
    tests: PaginationData;
    filters: {
        search: string;
        filter: string;
    };
}

export default function PatientsIndex({ tests, filters }: PatientsIndexProps) {
    const [search, setSearch] = useState(filters.search || '');
    const [filter, setFilter] = useState(filters.filter || 'all');
    const [deletingId, setDeletingId] = useState<number | null>(null);

    const debouncedSearch = useCallback(
        debounce(
            (value: string) => {
                router.get(
                    route('patients.index'),
                    { search: value, filter },
                    { preserveState: true, replace: true }
                );
            },
            300
        ),
        [filter, router]
    );

    // Handle search input changes with debounce
    const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setSearch(e.target.value);
        debouncedSearch(e.target.value);
    };

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="All Tests" />
            <div className="flex h-full flex-1 flex-col gap-4 rounded-[1.25rem] p-3 md:p-5">
                <Card className="overflow-hidden border border-sky-200/80 bg-white shadow-[0_20px_50px_rgba(15,23,42,0.08)] ring-1 ring-slate-200/80">
                    <CardHeader className="space-y-4 border-b border-sky-100 bg-gradient-to-r from-sky-800 via-sky-700 to-cyan-700 px-5 py-5 text-white md:px-6">
                        <div className="flex flex-col gap-2 md:flex-row md:items-end md:justify-between">
                            <div>
                                <CardTitle className="text-xl font-semibold text-white">Test Records</CardTitle>
                                <CardDescription className="mt-1 text-sm text-sky-100">List of all patient test records</CardDescription>
                            </div>
                        </div>
                        <div className="flex flex-col gap-3">
                            <div className="flex flex-wrap gap-3">
                                <Button asChild className="h-10 rounded-xl bg-white text-sky-700 shadow-sm hover:bg-sky-50">
                                    <Link href={route('patients.create')}>
                                        <FileText className="mr-2 h-4 w-4" />
                                        New Adult Test
                                    </Link>
                                </Button>
                                <Button asChild variant="outline" className="h-10 rounded-xl border-white/30 bg-sky-700/10 text-white hover:bg-sky-700/15 hover:text-white">
                                    <Link href={route('patients.index')}>
                                        <FilePenLine className="mr-2 h-4 w-4" />
                                        Adult Tests
                                    </Link>
                                </Button>
                                <Button asChild className="h-10 rounded-xl bg-emerald-500 text-white shadow-sm hover:bg-emerald-600">
                                    <Link href={route('kids.create')}>
                                        <FileText className="mr-2 h-4 w-4" />
                                        New Paediatric Test
                                    </Link>
                                </Button>
                                <Button asChild variant="outline" className="h-10 rounded-xl border-white/30 bg-sky-700/10 text-white hover:bg-sky-700/15 hover:text-white">
                                    <Link href={route('kids.index')}>
                                        <FilePenLine className="mr-2 h-4 w-4" />
                                        Paediatric Tests
                                    </Link>
                                </Button>
                            </div>
                            <div className="flex flex-col gap-3 sm:flex-row">
                                <Input
                                    placeholder="Search by patient name or hospital ID..."
                                    value={search}
                                    onChange={handleSearchChange}
                                    className="h-11 max-w-sm rounded-xl border-white/20 bg-white/95 text-sm text-slate-900 shadow-sm placeholder:text-slate-400 focus-visible:ring-sky-200"
                                />
                                <Select
                                    value={filter}
                                    onValueChange={(v) => {
                                        setFilter(v);
                                        router.get(
                                            route('patients.index'),
                                            { search, filter: v },
                                            { preserveState: true, replace: true }
                                        );
                                    }}
                                >
                                    <SelectTrigger className="h-11 max-w-xs rounded-xl border-white/20 bg-white/95 text-sm text-slate-900 shadow-sm focus:ring-sky-200">
                                        <SelectValue placeholder="Filter" />
                                    </SelectTrigger>
                                    <SelectContent>
                                        <SelectItem value="all">All Records</SelectItem>
                                        <SelectItem value="recent">Recent (Last 30 days)</SelectItem>
                                        <SelectItem value="male">Male Patients</SelectItem>
                                        <SelectItem value="female">Female Patients</SelectItem>
                                    </SelectContent>
                                </Select>
                            </div>
                        </div>
                    </CardHeader>
                    <CardContent className="p-0">
                        <Table aria-label="Test records list">
                            <TableHeader>
                                <TableRow className="bg-slate-100/90 hover:bg-slate-100">
                                    <TableHead scope="col" className="px-5 py-3 text-[11px] font-semibold uppercase tracking-[0.14em] text-slate-700">Diagnosis</TableHead>
                                    <TableHead scope="col" className="px-5 py-3 text-[11px] font-semibold uppercase tracking-[0.14em] text-slate-700">Surname</TableHead>
                                    <TableHead scope="col" className="px-5 py-3 text-[11px] font-semibold uppercase tracking-[0.14em] text-slate-700">Other Names</TableHead>
                                    <TableHead scope="col" className="px-5 py-3 text-[11px] font-semibold uppercase tracking-[0.14em] text-slate-700">Hospital ID</TableHead>
                                    <TableHead scope="col" className="px-5 py-3 text-[11px] font-semibold uppercase tracking-[0.14em] text-slate-700">Test Date</TableHead>
                                    <TableHead scope="col" className="px-5 py-3 text-[11px] font-semibold uppercase tracking-[0.14em] text-slate-700">Actions</TableHead>
                                </TableRow>
                            </TableHeader>
                            <TableBody>
                                {tests.data.length === 0 ? (
                                    <TableRow>
                                        <TableCell colSpan={6} className="px-5 py-8 text-center text-sm text-slate-500">
                                            No test records found
                                        </TableCell>
                                    </TableRow>
                                ) : (
                                    tests.data.map((test) => (
                                        <TableRow key={test.id} className="border-b border-slate-200 last:border-0 hover:bg-sky-50/80">
                                            <TableCell className="px-5 py-3 align-top">
                                                <div
                                                    className="line-clamp-2 max-w-[220px] text-sm font-medium text-slate-700"
                                                    dangerouslySetInnerHTML={{ __html: test.conclusion || 'No diagnosis' }}
                                                />
                                            </TableCell>
                                            <TableCell className="px-5 py-3 text-sm font-medium text-slate-800">{test.patient.surname}</TableCell>
                                            <TableCell className="px-5 py-3 text-sm text-slate-700">{test.patient.other_names}</TableCell>
                                            <TableCell className="px-5 py-3 text-sm text-slate-700">{test.patient.hospital_id}</TableCell>
                                            <TableCell className="px-5 py-3 text-sm text-slate-700">
                                                {new Date(test.test_date).toLocaleDateString()}
                                            </TableCell>
                                            <TableCell className="px-5 py-3">
                                                <div className="flex flex-wrap items-center gap-2">
                                                    <Button variant="outline" size="sm" asChild className="h-9 rounded-lg border-sky-200 bg-white text-sky-700 hover:bg-sky-50 hover:text-sky-800">
                                                        <Link href={route('patients.showTest', test.id)}>
                                                            <FileText className="mr-1.5 h-4 w-4" />
                                                            View
                                                        </Link>
                                                    </Button>
                                                    <Button variant="outline" size="sm" asChild className="h-9 rounded-lg border-slate-200 bg-white text-slate-700 hover:bg-slate-50 hover:text-slate-900">
                                                        <Link href={route('patients.editTest', test.id)}>
                                                            <FilePenLine className="mr-1.5 h-4 w-4" />
                                                            Update
                                                        </Link>
                                                    </Button>
                                                    <Button
                                                        variant="destructive"
                                                        size="sm"
                                                        className="h-9 rounded-lg bg-rose-600 text-white hover:bg-rose-700"
                                                        disabled={deletingId === test.id}
                                                        onClick={() => {
                                                            if (confirm('Are you sure you want to delete this test record? \n This action cannot be undone.')) {
                                                                setDeletingId(test.id);
                                                                router.delete(route('patients.deleteTest', test.id), {
                                                                    onFinish: () => setDeletingId(null),
                                                                });
                                                            }
                                                        }}
                                                    >
                                                        {deletingId === test.id ? 'Deleting...' : 'Delete'}
                                                    </Button>
                                                </div>
                                            </TableCell>
                                        </TableRow>
                                    ))
                                )}
                            </TableBody>
                        </Table>

                        {tests.data.length > 0 && (
                            <div className="flex flex-col gap-3 border-t border-slate-200 bg-slate-50/70 p-4 md:flex-row md:items-center md:justify-between md:px-6">
                                <div className="text-sm font-medium text-slate-600">
                                    Showing {tests.from} to {tests.to} of {tests.total} test records
                                </div>
                                <div className="flex flex-wrap gap-2">
                                    {tests.links.map((link, i) => {
                                        const labelText = link.label.replace(/&laquo;/g, '«').replace(/&raquo;/g, '»');

                                        return (
                                            <Button
                                                key={i}
                                                variant={link.active ? 'default' : 'outline'}
                                                size="sm"
                                                disabled={!link.url}
                                                onClick={() => link.url && router.get(link.url)}
                                                className={`h-9 rounded-lg ${
                                                    link.active
                                                        ? 'bg-sky-700 text-white hover:bg-sky-800'
                                                        : 'border-slate-200 bg-white text-slate-700 hover:bg-slate-50'
                                                }`}
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
