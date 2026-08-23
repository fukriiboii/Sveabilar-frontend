export function WeekdayRow() {
  const weekdays = ['Mån', 'Tis', 'Ons', 'Tor', 'Fre', 'Lör', 'Sön'];

  return (
    <div className="mb-1 grid grid-cols-7 gap-1 text-center">
      {weekdays.map((weekday) => (
        <div
          key={weekday}
          className="px-1 py-2 text-[10px] font-semibold uppercase tracking-[0.15em] text-slate-400"
        >
          {weekday}
        </div>
      ))}
    </div>
  );
}