export function TransactionSkeleton() {
  return (
    <div className="bg-white rounded-lg border-2 border-gray-200 p-4 animate-pulse">
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-3">
        <div className="flex-1 space-y-2">
          <div className="flex items-center gap-3">
            <div className="h-4 bg-gray-200 rounded w-24"></div>
            <div className="h-4 bg-gray-200 rounded w-48"></div>
          </div>
          <div className="h-3 bg-gray-200 rounded w-64"></div>
        </div>
        <div className="flex items-center gap-4">
          <div className="h-6 bg-gray-200 rounded w-24"></div>
          <div className="h-8 bg-gray-200 rounded w-8"></div>
          <div className="h-8 bg-gray-200 rounded w-8"></div>
        </div>
      </div>
    </div>
  );
}

export function BalanceSkeleton() {
  return (
    <div className="bg-white rounded-lg shadow-md p-6 md:p-8 animate-pulse">
      <div className="text-center">
        <div className="h-4 bg-gray-200 rounded w-32 mx-auto mb-4"></div>
        <div className="h-12 bg-gray-200 rounded w-48 mx-auto"></div>
      </div>
    </div>
  );
}

export function StatsSkeleton() {
  return (
    <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
      {[...Array(4)].map((_, i) => (
        <div key={i} className="bg-white rounded-lg shadow p-4 animate-pulse">
          <div className="h-4 bg-gray-200 rounded w-20 mb-2"></div>
          <div className="h-6 bg-gray-200 rounded w-24"></div>
        </div>
      ))}
    </div>
  );
}

export function DashboardSkeleton() {
  return (
    <div className="space-y-6">
      <BalanceSkeleton />
      <StatsSkeleton />

      <div className="space-y-3">
        <div className="flex items-center justify-between mb-2">
          <div className="h-6 bg-gray-200 rounded w-32 animate-pulse"></div>
        </div>
        <div className="space-y-2">
          {[...Array(5)].map((_, i) => (
            <TransactionSkeleton key={i} />
          ))}
        </div>
      </div>
    </div>
  );
}
