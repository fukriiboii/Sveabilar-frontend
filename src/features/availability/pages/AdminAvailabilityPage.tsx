import { useState } from 'react';
import { CalendarDays } from 'lucide-react';

import CreateAvailabilityScheduleForm from '../components/CreateAvailabilityScheduleForm';
import AvailabilityMonthCalendar from '../components/AvailabilityMonthCalendar';
import AvailabilityDayModal from '../components/AvailabilityDayModal';

import { useAvailabilityMonth } from '../hooks/useAvailabilityMonth';
import { deleteAvailability } from '../api/adminAvailabilityApi';

export default function AdminAvailabilityPage() {
    const today = new Date();

    const [currentDate, setCurrentDate] = useState(
        new Date(
            today.getFullYear(),
            today.getMonth(),
            1,
        ),
    );

    const [selectedDate, setSelectedDate] =
        useState<string | null>(null);

    const [deletingId, setDeletingId] =
        useState<number | null>(null);

    const [deleteError, setDeleteError] =
        useState<string | null>(null);

    const year = currentDate.getFullYear();
    const month = currentDate.getMonth();

    const {
        availabilities,
        isLoading,
        error,
        reload,
    } = useAvailabilityMonth(
        year,
        month,
    );

    function handlePreviousMonth() {
        setCurrentDate(
            (current) =>
                new Date(
                    current.getFullYear(),
                    current.getMonth() - 1,
                    1,
                ),
        );
    }

    function handleNextMonth() {
        setCurrentDate(
            (current) =>
                new Date(
                    current.getFullYear(),
                    current.getMonth() + 1,
                    1,
                ),
        );
    }

    function handleSelectDate(date: string) {
        setDeleteError(null);
        setSelectedDate(date);
    }

    function handleCloseModal() {
        if (deletingId !== null) {
            return;
        }

        setDeleteError(null);
        setSelectedDate(null);
    }

    async function handleDeleteAvailability(
        id: number,
    ): Promise<void> {
        try {
            setDeletingId(id);
            setDeleteError(null);

            await deleteAvailability(id);

            await reload();
        } catch {
            setDeleteError(
                'Kunde inte ta bort tiden. Försök igen.',
            );
        } finally {
            setDeletingId(null);
        }
    }

    const selectedDateAvailabilities =
        selectedDate
            ? availabilities.filter(
                (availability) =>
                    availability.date === selectedDate,
            )
            : [];

    return (
        <main className="p-4 sm:p-6 lg:p-8">
            {/* Header */}
            <div>
                <div className="flex items-center gap-3">
                    <CalendarDays
                        size={24}
                        className="text-brand-gold"
                    />

                    <h1 className="text-2xl font-semibold text-brand-text sm:text-3xl">
                        Tillgänglighet
                    </h1>
                </div>

                <p className="mt-2 text-sm text-brand-text-muted sm:text-base">
                    Skapa och hantera bokningsbara tider.
                </p>
            </div>

            {/* Create availability */}
            <div className="mt-6">
                <CreateAvailabilityScheduleForm />
            </div>

            {/* Calendar */}
            <section className="mt-8">
                <div className="mb-4">
                    <h2 className="text-lg font-semibold text-brand-text">
                        Bokningskalender
                    </h2>

                    <p className="mt-1 text-sm text-brand-text-muted">
                        Överblick över alla bokningsbara tider per dag.
                    </p>
                </div>

                {/* Load error */}
                {error && (
                    <div className="mb-4 rounded-xl border border-red-400/20 bg-red-400/10 px-4 py-3 text-sm text-red-300">
                        {error}
                    </div>
                )}

                {/* Calendar loading */}
                {isLoading ? (
                    <div className="rounded-2xl border border-brand-border bg-brand-surface px-6 py-12 text-center">
                        <p className="text-sm text-brand-text-muted">
                            Hämtar tillgänglighet...
                        </p>
                    </div>
                ) : (
                    <AvailabilityMonthCalendar
                        year={year}
                        month={month}
                        availabilities={availabilities}
                        onPreviousMonth={
                            handlePreviousMonth
                        }
                        onNextMonth={handleNextMonth}
                        onSelectDate={handleSelectDate}
                    />
                )}
            </section>

            {/* Day modal */}
            {selectedDate && (
                <AvailabilityDayModal
                    date={selectedDate}
                    availabilities={selectedDateAvailabilities}
                    onClose={handleCloseModal}
                    onDelete={handleDeleteAvailability}
                    deletingId={deletingId}
                    deleteError={deleteError}
                />
            )}
        </main>
    );
}