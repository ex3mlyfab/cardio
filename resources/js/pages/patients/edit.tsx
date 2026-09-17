import AppLayout from '@/layouts/app-layout';
import { type BreadcrumbItem } from '@/types';
import { Head, useForm } from '@inertiajs/react';
import { FormEventHandler } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import InputError from '@/components/input-error';
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table"
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select"

export default function EditPatientPage({ patient }: { patient: any }) {
    const breadcrumbs: BreadcrumbItem[] = [
        {
            title: 'Patients',
            href: '/patients',
        },
        {
            title: 'Edit Patient',
            href: `/patients/${patient.id}/edit`,
        },
    ];

    const { data, setData, put, processing, errors } = useForm({
        surname: patient.surname || '',
        other_names: patient.other_names || '',
        gender: patient.gender || '',
        hospital_id: patient.hospital_id || '',
        date_of_birth: patient.date_of_birth || '',
        nicl: patient.nicl || '',
        phone_number: patient.phone_number || '',
    });

    // Add this function to handle keydown events
    const handleKeyDown = (e: React.KeyboardEvent) => {
        // Prevent form submission when Enter key is pressed
        if (e.key === 'Enter') {
            e.preventDefault();
        }
    };

    const submit: FormEventHandler = (e) => {
        e.preventDefault();
        put(route('patients.update', patient.id), {
            onSuccess: () => {
                console.log('Patient updated successfully!');
            },
        });
    };

    const renderInputField = (
        id: keyof typeof data,
        label: string,
        type = 'text',
        placeholder?: string,
        config?: {
            autoFocus?: boolean;
        }
    ) => (
        <div className="grid gap-2">
            {label ? <Label htmlFor={id} className="text-[11px] font-medium uppercase tracking-[0.12em] text-muted-foreground">{label}</Label> : null}
            <Input
                id={id}
                name={id}
                type={type}
                value={data[id]}
                onChange={(e) => setData(id, e.target.value)}
                placeholder={placeholder || label}
                className="mt-1 block w-full rounded-xl border border-input bg-background px-3 py-2 text-sm shadow-none transition-colors focus-visible:border-ring"
                autoFocus={config?.autoFocus}
                onKeyDown={handleKeyDown}
            />
            <InputError message={errors[id]} className="mt-1 text-xs" />
        </div>
    );

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title={`Edit Patient - ${patient.surname}`} />
            <div className="flex h-full flex-1 flex-col gap-4 rounded-[1.25rem] p-3 md:p-5">
                {Object.keys(errors).length > 0 && (
                    <div className="rounded-xl border border-red-200 bg-red-50 p-4 text-sm text-red-700 shadow-sm">
                        <ul className="list-disc space-y-1 pl-5">
                            {Object.values(errors).map((error, index) => (
                                <li key={index}>{error}</li>
                            ))}
                        </ul>
                    </div>
                )}

                <div className="relative flex-1 overflow-hidden rounded-[1.25rem] border border-border/80 bg-card p-4 shadow-[0_1px_2px_rgba(15,23,42,0.04),0_12px_30px_rgba(15,23,42,0.04)] md:p-6">
                    <form onSubmit={submit} className="space-y-8" onKeyDown={handleKeyDown}>
                        <div>
                            <h2 className="mb-4 text-xl font-semibold">Patient Details</h2>
                            <Table className="border">
                                <TableHeader>
                                    <TableRow>
                                        <TableHead className="border bg-muted/50 p-2 text-[11px] font-semibold uppercase tracking-[0.15em] text-muted-foreground">Hospital No</TableHead>
                                        <TableHead className="border bg-muted/50 p-2 text-[11px] font-semibold uppercase tracking-[0.15em] text-muted-foreground">Surname</TableHead>
                                        <TableHead className="border bg-muted/50 p-2 text-[11px] font-semibold uppercase tracking-[0.15em] text-muted-foreground">Other Names</TableHead>
                                        <TableHead className="w-[100px] border bg-muted/50 p-2 text-[11px] font-semibold uppercase tracking-[0.15em] text-muted-foreground">Sex</TableHead>
                                        <TableHead className="border bg-muted/50 p-2 text-[11px] font-semibold uppercase tracking-[0.15em] text-muted-foreground">DOB</TableHead>
                                    </TableRow>
                                </TableHeader>
                                <TableBody>
                                    <TableRow>
                                        <TableCell className="border p-2">
                                            {' '}
                                            {renderInputField('hospital_id', '', 'text', 'Hospital Id', {
                                                autoFocus: true,
                                            })}
                                        </TableCell>
                                        <TableCell className="border p-2">
                                            {' '}
                                            {renderInputField('surname', '', 'text', 'Surname')}
                                        </TableCell>
                                        <TableCell className="border p-2"> {renderInputField('other_names', '')}</TableCell>
                                        <TableCell className="border p-2">
                                            <div className="grid gap-2">
                                                <Select value={data.gender} onValueChange={(value) => setData('gender', value)}>
                                                    <SelectTrigger className="w-[140px]">
                                                        <SelectValue placeholder="Gender" />
                                                    </SelectTrigger>

                                                    <SelectContent>
                                                        <SelectItem value="male">Male</SelectItem>
                                                        <SelectItem value="female">Female</SelectItem>
                                                    </SelectContent>
                                                </Select>
                                                <InputError message={errors.gender} className="mt-2" />
                                            </div>
                                        </TableCell>
                                        <TableCell className="border p-2"> {renderInputField('date_of_birth', '', 'date')}</TableCell>
                                    </TableRow>
                                </TableBody>
                            </Table>
                            <Table className="mt-1 border">
                                <TableHeader>
                                    <TableRow>
                                        <TableHead className="border bg-muted/50 p-2 text-[11px] font-semibold uppercase tracking-[0.15em] text-muted-foreground">NICL</TableHead>
                                        <TableHead className="border bg-muted/50 p-2 text-[11px] font-semibold uppercase tracking-[0.15em] text-muted-foreground">Phone Number</TableHead>
                                        <TableHead className="border bg-muted/50 p-2 text-[11px] font-semibold uppercase tracking-[0.15em] text-muted-foreground"></TableHead>
                                    </TableRow>
                                </TableHeader>
                                <TableBody>
                                    <TableRow>
                                        <TableCell className="border p-2">{renderInputField('nicl', '')}</TableCell>
                                        <TableCell className="border p-2">{renderInputField('phone_number', '')}</TableCell>
                                        <TableCell className="border p-2"></TableCell>
                                    </TableRow>
                                </TableBody>
                            </Table>
                        </div>
                        <div className="flex justify-end">
                            <Button type="submit" disabled={processing} className="mt-4">
                                Update Patient
                            </Button>
                        </div>
                    </form>
                </div>
            </div>
        </AppLayout>
    );
}
