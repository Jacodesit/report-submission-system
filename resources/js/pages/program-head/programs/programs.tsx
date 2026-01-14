import { ScrollArea } from '@/components/ui/scroll-area';
import { cn } from '@/lib/utils';
import { Program } from '@/types';
import { usePage } from '@inertiajs/react';
import { Activity, Dispatch, SetStateAction } from 'react';
import EmptyProgram from './components/empty-programs';
import GridView from './components/grid';
import ListView from './components/list';

interface Props {
    reviewOpen: boolean;
    setOpen: Dispatch<SetStateAction<boolean>>;
    isList: boolean;
    selectReviewProgram: Program | null | undefined;
    setSelecReviewProgram: Dispatch<SetStateAction<Program | null | undefined>>;
}

export default function Programs({
    reviewOpen,
    setOpen,
    isList,
    selectReviewProgram,
    setSelecReviewProgram,
}: Props) {
    const { programs } = usePage<{ programs: Program[] }>().props;

    return (
        <>
            <ScrollArea className="relative h-[600px] w-full">
                <div
                    className={cn(
                        'space-x-3 transition-all duration-300 ease-in-out',
                        reviewOpen ? 'mr-[350px]' : 'mr-0',
                    )}
                >
                    <div className="">
                        <h1 className="mb-3 font-semibold">All Programs</h1>
                    </div>
                    <div>
                        <Activity
                            mode={programs.length === 0 ? 'visible' : 'hidden'}
                        >
                            <EmptyProgram setIsOpen={setOpen} />
                        </Activity>

                        <Activity
                            mode={programs.length > 0 ? 'visible' : 'hidden'}
                        >
                            {isList ? (
                                <ListView
                                    programs={programs}
                                    selectReviewProgram={selectReviewProgram}
                                    setSelecReviewProgram={
                                        setSelecReviewProgram
                                    }
                                />
                            ) : (
                                <GridView
                                    programs={programs}
                                    selectReviewProgram={selectReviewProgram}
                                    setSelecReviewProgram={
                                        setSelecReviewProgram
                                    }
                                />
                            )}
                        </Activity>
                    </div>
                </div>
            </ScrollArea>
        </>
    );
}
