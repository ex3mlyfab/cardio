
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
            <div className="flex h-full flex-1 flex-col gap-4 rounded-xl p-4">
                {/* Test Records Table */}
                <Card className="shadow-md">
                    <CardHeader>
                        <CardTitle>Test Records</CardTitle>
                        <CardDescription>List of all patient test records</CardDescription>
                        <div className="mt-4 flex flex-col sm:flex-row gap-4">
                            <Input
                                placeholder="Search by patient name or hospital ID..."
                                value={search}
                                onChange={handleSearchChange}
                                className="max-w-sm"
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
                                <SelectTrigger className="max-w-xs">
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
                    </CardHeader>
                    <CardContent>
                        <Table aria-label="Test records list">
                            <TableHeader>
                                <TableRow>
                                    <TableHead scope="col">Diagnosis</TableHead>
                                    <TableHead scope="col">Surname</TableHead>
                                    <TableHead scope="col">Other Names</TableHead>
                                    <TableHead scope="col">Hospital ID</TableHead>
                                    <TableHead scope="col">Test Date</TableHead>
                                    <TableHead scope="col">Actions</TableHead>
                                </TableRow>
                            </TableHeader>
                            <TableBody>
                                {tests.data.length === 0 ? (
                                    <TableRow>
                                        <TableCell colSpan={6} className="text-center py-4">
                                            No test records found
                                        </TableCell>
                                    </TableRow>
                                ) : (
                                    tests.data.map((test) => (
                                        <TableRow key={test.id}>
                                            <TableCell>{test.conclusion || 'No diagnosis'}</TableCell>
                                            <TableCell>{test.patient.surname}</TableCell>
                                            <TableCell>{test.patient.other_names}</TableCell>
                                            <TableCell>{test.patient.hospital_id}</TableCell>
                                            <TableCell>
                                                {new Date(test.test_date).toLocaleDateString()}
                                            </TableCell>
                                            <TableCell>
                                                <div className="flex space-x-2 justify-between items-center">
                                                <Button variant="outline" size="sm" asChild>
                                                    <Link href={route('patients.showTest', test.id)}>
                                                        <FileText className="h-4 w-4 mr-1" />
                                                          View
                                                    </Link>
                                                </Button>
                                                <Button variant="outline" size="sm" asChild>
                                                    <Link href={route('patients.editTest', test.id)}>
                                                        <FilePenLine className="h-4 w-4 mr-1" />
                                                        Update
                                                    </Link>
                                                </Button>
                                                 <Button
                                                     variant="destructive"
                                                     size="sm"
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

                        {/* Pagination */}
                        {tests.data.length > 0 && (
                            <div className="mt-4 flex items-center justify-between">
                                <div className="text-sm text-gray-500">
                                    Showing {tests.from} to {tests.to} of {tests.total} test records
                                </div>
                                <div className="flex space-x-2">
                                    {tests.links.map((link, i) => {
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
