import { FlashToaster } from '@/components/flash-toaster';
import ProgramGridSkeleton from '@/components/skeleton-loader';
import { Button } from '@/components/ui/button';
import AppLayout from '@/layouts/app-layout';
import { cn } from '@/lib/utils';
import { dashboard } from '@/routes';
import { Program, User, type BreadcrumbItem } from '@/types';
import { Head, usePage, useRemember, WhenVisible } from '@inertiajs/react';
import { Eye, EyeClosed } from 'lucide-react';
import { useState } from 'react';
import ToggleGridList from '../../../components/toggle-list-grid';
import ProgramDialog from './components/program-dialog';
import ReviewProgram from './components/review';
import Programs from './programs';

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Programs',
        href: dashboard().url,
    },
];

export default function ProgramsPage() {
    const [open, setOpen] = useState<boolean>(false);
    const [isList, setIsList] = useRemember<boolean>(false);
    const [selectReviewProgram, setSelecReviewProgram] =
        useState<Program | null>();
    const [reviewOpen, setReviewOpen] = useState<boolean>(true);

    const { coordinators } = usePage<{
        coordinators: Pick<User, 'id' | 'name' | 'email' | 'avatar'>[];
    }>().props;

    console.log({ isList });

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Programs" />

            <FlashToaster />

            <div
                className="flex h-full flex-1 flex-col gap-4 overflow-x-auto rounded-xl"
                onClick={(e) => {
                    if (e.target === e.currentTarget)
                        setSelecReviewProgram(null);
                }}
            >
                <div className="mt-4 flex justify-end gap-2 px-4">
                    <ProgramDialog
                        coordinators={coordinators}
                        open={open}
                        setOpen={setOpen}
                    />
                    <Button
                        onClick={() => {
                            setReviewOpen((prev) => !prev);
                        }}
                        variant={'outline'}
                    >
                        {reviewOpen ? <EyeClosed /> : <Eye />}
                        {reviewOpen ? 'Hide' : 'Show'} Preview
                    </Button>
                    <ToggleGridList isList={isList} setIsList={setIsList} />
                </div>

                <div
                    className="relative h-full overflow-hidden border-t p-4"
                    onClick={(e) => {
                        if (e.target === e.currentTarget)
                            setSelecReviewProgram(null);
                    }}
                >
                    <WhenVisible
                        data="programs"
                        fallback={<ProgramGridSkeleton />}
                    >
                        <Programs
                            isList={isList}
                            reviewOpen={reviewOpen}
                            selectReviewProgram={selectReviewProgram}
                            setOpen={setOpen}
                            setSelecReviewProgram={setSelecReviewProgram}
                        />
                    </WhenVisible>

                    {/* Review Panel with Slide Transition */}
                    <div
                        className={cn(
                            'absolute top-0 right-0 h-full w-[350px] border-l bg-background transition-transform duration-300 ease-in-out',
                            reviewOpen ? 'translate-x-0' : 'translate-x-full',
                        )}
                    >
                        <ReviewProgram program={selectReviewProgram} />
                    </div>
                </div>
            </div>
        </AppLayout>
    );
}
