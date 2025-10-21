import { memo } from 'react';
import { Transaction } from '@/types/transaction';
import { formatCurrency, formatDate } from '@/lib/calculations';

interface TransactionItemProps {
  transaction: Transaction;
  onDelete: (id: string) => void;
  onEdit: (id: string) => void;
}

export const TransactionItem = memo(function TransactionItem({ transaction, onDelete, onEdit }: TransactionItemProps) {
  const isIncome = transaction.amount >= 0;
  const amountColor = isIncome ? 'text-green-600' : 'text-red-500';

  const handleDelete = () => {
    if (window.confirm('Are you sure you want to delete this transaction?')) {
      onDelete(transaction.id);
    }
  };

  return (
    <div className="bg-zinc-900 rounded-lg border border-zinc-700 p-4 hover:border-zinc-600">
      <div className="flex items-center justify-between gap-4">
        <div className="flex-1 min-w-0">
          <p className="font-semibold text-white text-sm truncate">
            {transaction.description}
          </p>
          <div className="flex items-center gap-2 mt-1 text-xs text-gray-500">
            <span>{formatDate(transaction.date)}</span>
            {transaction.category && (
              <>
                <span>•</span>
                <span>{transaction.category}</span>
              </>
            )}
          </div>
          {transaction.notes && (
            <p className="text-xs text-gray-500 mt-2 line-clamp-2">
              {transaction.notes}
            </p>
          )}
        </div>

        <div className="flex items-center gap-3">
          <span className={`text-lg font-bold ${amountColor} whitespace-nowrap`}>
            {isIncome ? '+' : ''}
            {formatCurrency(transaction.amount)}
          </span>
          <div className="flex gap-1">
            <button
              onClick={() => onEdit(transaction.id)}
              className="px-2 py-1 text-xs text-gray-400 hover:text-white"
              aria-label="Edit transaction"
            >
              Edit
            </button>
            <button
              onClick={handleDelete}
              className="px-2 py-1 text-xs text-gray-400 hover:text-red-500"
              aria-label="Delete transaction"
            >
              Delete
            </button>
          </div>
        </div>
      </div>
    </div>
  );
});
