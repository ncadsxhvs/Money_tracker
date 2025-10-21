interface DateRangeFilterProps {
  startDate: string;
  endDate: string;
  onStartDateChange: (date: string) => void;
  onEndDateChange: (date: string) => void;
  onClear: () => void;
}

export function DateRangeFilter({
  startDate,
  endDate,
  onStartDateChange,
  onEndDateChange,
  onClear,
}: DateRangeFilterProps) {
  const hasFilter = startDate || endDate;

  return (
    <div className="flex flex-col md:flex-row gap-3 items-start md:items-end">
      <div className="flex-1 w-full">
        <label htmlFor="start-date" className="block text-xs font-medium text-gray-600 mb-1.5">
          From Date
        </label>
        <input
          type="date"
          id="start-date"
          value={startDate}
          onChange={(e) => onStartDateChange(e.target.value)}
          className="w-full px-3 py-2 border border-gray-200 rounded-lg bg-white focus:outline-none focus:ring-2 focus:ring-amber-400 focus:border-transparent transition-all text-sm"
        />
      </div>

      <div className="flex-1 w-full">
        <label htmlFor="end-date" className="block text-xs font-medium text-gray-600 mb-1.5">
          To Date
        </label>
        <input
          type="date"
          id="end-date"
          value={endDate}
          onChange={(e) => onEndDateChange(e.target.value)}
          className="w-full px-3 py-2 border border-gray-200 rounded-lg bg-white focus:outline-none focus:ring-2 focus:ring-amber-400 focus:border-transparent transition-all text-sm"
        />
      </div>

      {hasFilter && (
        <button
          onClick={onClear}
          className="px-4 py-2 bg-gray-100 text-gray-700 text-sm font-medium rounded-lg hover:bg-gray-200 transition-colors whitespace-nowrap"
        >
          Clear
        </button>
      )}
    </div>
  );
}
