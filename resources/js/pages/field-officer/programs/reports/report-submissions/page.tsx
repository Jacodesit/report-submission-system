import ViewController from '@/actions/App/Http/Controllers/FieldOfficer/ViewController';
import Back from '@/components/back';
import AppLayout from '@/layouts/app-layout';
import { Program, Report, ReportSubmission } from '@/types';
import { usePage } from '@inertiajs/react';
import {
    AlertCircle,
    Calendar,
    Clock,
    EllipsisVertical,
    Folder,
} from 'lucide-react';
import { Activity, useState } from 'react';
import EmptyReportSubmission from './components/empty-submission';
import ReportSubmissionDialog from './components/report-submission-dialog';
import SampleTemplate from './components/sample-template';

export default function page() {
    const [open, setOpen] = useState<boolean>(false);

    const { program, report, reportSubmissions, hasSubmitted } = usePage<{
        program: Program;
        report: Report;
        reportSubmissions: ReportSubmission[];
        hasSubmitted: boolean;
    }>().props;

    const isOverdue = new Date(report.deadline) < new Date();

    const deadline = new Date(report.deadline).getTime();
    const now = Date.now();

    const daysUntilDeadline = Math.ceil(
        (deadline - now) / (1000 * 60 * 60 * 24),
    );

    return (
        <AppLayout>
            <div className="flex h-full flex-1 flex-col gap-6 overflow-x-auto p-6">
                {/* Header Section */}
                <div className="flex flex-col gap-6">
                    <div className="flex items-center justify-between">
                        <Back link={ViewController.reports(program)} />
                        <ReportSubmissionDialog
                            open={open}
                            hasSubmitted={hasSubmitted}
                            setOpen={setOpen}
                            report={report}
                        />
                    </div>

                    {/* Title and Deadline Card */}
                    <div className="relative overflow-hidden rounded-2xl border bg-gradient-to-br from-background via-background to-muted/20 p-8 shadow-sm">
                        <div className="absolute -top-8 -right-8 h-32 w-32 rounded-full bg-primary/5 blur-3xl" />
                        <div className="absolute -bottom-8 -left-8 h-32 w-32 rounded-full bg-primary/5 blur-3xl" />

                        <div className="relative flex items-start justify-between gap-6">
                            <div className="flex-1">
                                <h1 className="mb-3 text-3xl font-bold tracking-tight">
                                    {report.title}
                                </h1>
                                <div className="flex items-center gap-2 text-sm text-muted-foreground">
                                    <Calendar className="h-4 w-4" />
                                    <span>Report Submissions</span>
                                    <span className="mx-2">•</span>
                                    <span className="font-medium text-foreground">
                                        {reportSubmissions.length} submission
                                        {reportSubmissions.length !== 1
                                            ? 's'
                                            : ''}
                                    </span>
                                </div>
                            </div>

                            {/* Enhanced Deadline Badge */}
                            <div
                                className={`inline-flex items-center gap-3 rounded-xl px-5 py-3 shadow-sm transition-all ${
                                    isOverdue
                                        ? 'border-2 border-destructive/30 bg-destructive/10 text-destructive shadow-destructive/10'
                                        : daysUntilDeadline <= 3
                                          ? 'border-2 border-amber-500/30 bg-amber-500/10 text-amber-700 shadow-amber-500/10 dark:text-amber-400'
                                          : 'border-2 border-emerald-500/30 bg-emerald-500/10 text-emerald-700 shadow-emerald-500/10 dark:text-emerald-400'
                                }`}
                            >
                                <div
                                    className={`rounded-full p-1.5 ${
                                        isOverdue
                                            ? 'bg-destructive/20'
                                            : daysUntilDeadline <= 3
                                              ? 'bg-amber-500/20'
                                              : 'bg-emerald-500/20'
                                    }`}
                                >
                                    {isOverdue ? (
                                        <AlertCircle className="h-4 w-4" />
                                    ) : (
                                        <Clock className="h-4 w-4" />
                                    )}
                                </div>
                                <div className="flex flex-col">
                                    <span className="text-xs font-medium opacity-80">
                                        {isOverdue ? 'Overdue' : 'Deadline'}
                                    </span>
                                    <span className="text-sm font-bold">
                                        {isOverdue ? (
                                            new Date(
                                                report.deadline,
                                            ).toLocaleDateString('en-US', {
                                                month: 'short',
                                                day: 'numeric',
                                                year: 'numeric',
                                            })
                                        ) : (
                                            <>
                                                {new Date(
                                                    report.deadline,
                                                ).toLocaleDateString('en-US', {
                                                    month: 'short',
                                                    day: 'numeric',
                                                    year: 'numeric',
                                                })}
                                                {daysUntilDeadline <= 3 && (
                                                    <span className="ml-1.5 text-xs">
                                                        ({daysUntilDeadline}d)
                                                    </span>
                                                )}
                                            </>
                                        )}
                                    </span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Sample Template Section */}
                <SampleTemplate templates={report.templates} />

                {/* Empty State */}
                <Activity
                    mode={reportSubmissions.length === 0 ? 'visible' : 'hidden'}
                >
                    <EmptyReportSubmission setIsOpen={setOpen} />
                </Activity>

                {/* Submissions Grid */}
                <Activity
                    mode={reportSubmissions.length > 0 ? 'visible' : 'hidden'}
                >
                    <div className="space-y-4">
                        <h2 className="text-lg font-semibold text-foreground/90">
                            Submissions
                        </h2>
                        <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
                            {reportSubmissions.map((submission) => (
                                <div
                                    key={submission.id}
                                    className="group relative overflow-hidden rounded-xl border bg-card shadow-sm transition-all duration-300 hover:border-primary/50 hover:shadow-md"
                                >
                                    <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-transparent to-transparent opacity-0 transition-opacity group-hover:opacity-100" />

                                    <div className="relative flex items-center gap-4 p-5">
                                        <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-primary/10 transition-colors group-hover:bg-primary/20">
                                            <Folder className="h-6 w-6 text-primary" />
                                        </div>

                                        <div className="flex flex-1 flex-col gap-1">
                                            <h3 className="truncate font-semibold text-foreground">
                                                {submission.field_officer?.name}
                                            </h3>
                                            <div className="flex items-center gap-1.5 text-xs text-muted-foreground">
                                                <Calendar className="h-3 w-3" />
                                                <span>
                                                    {new Date(
                                                        submission.created_at,
                                                    ).toLocaleDateString(
                                                        'en-US',
                                                        {
                                                            month: 'short',
                                                            day: 'numeric',
                                                            year: 'numeric',
                                                        },
                                                    )}
                                                </span>
                                            </div>
                                        </div>

                                        <button className="flex h-8 w-8 items-center justify-center rounded-lg transition-colors hover:bg-muted">
                                            <EllipsisVertical className="h-4 w-4 text-muted-foreground transition-colors hover:text-foreground" />
                                        </button>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </Activity>
            </div>
        </AppLayout>
    );
}
