import { formatCurrency } from '@/lib/calculations';

interface BalanceDisplayProps {
  balance: number;
}

export function BalanceDisplay({ balance }: BalanceDisplayProps) {
  const isPositive = balance > 0;
  const isNegative = balance < 0;
  const balanceColor = isPositive ? 'text-green-600' : isNegative ? 'text-red-500' : 'text-gray-600';

  return (
    <div className="bg-zinc-900 rounded-lg p-8 border border-zinc-700">
      <p className="text-sm font-medium text-gray-400 mb-3">Total Balance</p>
      <h1 className={`text-5xl font-black tracking-tight text-white`}>
        {formatCurrency(balance)}
      </h1>
    </div>
  );
}
