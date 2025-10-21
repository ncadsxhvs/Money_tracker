import { Transaction } from '@/types/transaction';
import { formatCurrency } from '@/lib/calculations';

interface SummaryStatsProps {
  transactions: Transaction[];
}

export function SummaryStats({ transactions }: SummaryStatsProps) {
  const totalIncome = transactions
    .filter((t) => t.amount >= 0)
    .reduce((sum, t) => sum + t.amount, 0);

  const totalExpenses = Math.abs(
    transactions
      .filter((t) => t.amount < 0)
      .reduce((sum, t) => sum + t.amount, 0)
  );

  const netBalance = totalIncome - totalExpenses;
  const transactionCount = transactions.length;

  if (transactionCount === 0) return null;

  const stats = [
    {
      label: 'Income',
      value: formatCurrency(totalIncome),
      color: 'text-green-600',
    },
    {
      label: 'Expenses',
      value: formatCurrency(totalExpenses),
      color: 'text-red-500',
    },
    {
      label: 'Net',
      value: formatCurrency(netBalance),
      color: netBalance >= 0 ? 'text-green-600' : 'text-red-500',
    },
    {
      label: 'Count',
      value: transactionCount.toString(),
      color: 'text-amber-500',
    },
  ];

  return (
    <div className="grid grid-cols-2 md:grid-cols-4 gap-3 md:gap-4">
      {stats.map((stat, index) => (
        <div
          key={stat.label}
          className="bg-zinc-900 rounded-lg border border-zinc-700 p-5 transition-all duration-200 hover:border-zinc-600"
          style={{ animationDelay: `${index * 0.1}s` }}
        >
          <p className="text-xs font-medium text-gray-500 mb-2 tracking-tight">{stat.label}</p>
          <p className={`text-xl md:text-2xl font-bold ${stat.color} tracking-tight`}>
            {stat.value}
          </p>
        </div>
      ))}
    </div>
  );
}
