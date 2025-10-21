import { Transaction } from '@/types/transaction';
import { TransactionItem } from './TransactionItem';
import { sortTransactionsByDate } from '@/lib/calculations';

interface TransactionListProps {
  transactions: Transaction[];
  onDelete: (id: string) => void;
  onEdit: (id: string) => void;
}

export function TransactionList({ transactions, onDelete, onEdit }: TransactionListProps) {
  const sortedTransactions = sortTransactionsByDate(transactions);

  if (transactions.length === 0) {
    return (
      <div className="bg-white rounded-lg shadow-md p-8 text-center">
        <svg
          className="mx-auto h-12 w-12 text-gray-400"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
          />
        </svg>
        <h3 className="mt-2 text-lg font-medium text-gray-900">No transactions</h3>
        <p className="mt-1 text-sm text-gray-500">
          Get started by adding a transaction or uploading a CSV file.
        </p>
      </div>
    );
  }

  return (
    <div className="space-y-3">
      <div className="flex items-center justify-between mb-2">
        <h2 className="text-lg font-semibold text-gray-900">
          Transactions ({transactions.length})
        </h2>
      </div>
      <div className="space-y-2">
        {sortedTransactions.map((transaction, index) => (
          <div
            key={transaction.id}
            className="fade-in"
            style={{ animationDelay: `${index * 0.05}s` }}
          >
            <TransactionItem
              transaction={transaction}
              onDelete={onDelete}
              onEdit={onEdit}
            />
          </div>
        ))}
      </div>
    </div>
  );
}
