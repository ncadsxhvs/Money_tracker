'use client';

import { Transaction } from '@/types/transaction';
import { formatCurrency, formatDate } from '@/lib/calculations';

interface TransactionTableProps {
  transactions: Transaction[];
  onEdit: (id: string) => void;
  onDelete: (id: string) => void;
}

export function TransactionTable({ transactions, onEdit, onDelete }: TransactionTableProps) {
  if (transactions.length === 0) {
    return (
      <div className="bg-white rounded-lg border border-[#D5C4B3] p-12 text-center">
        <p className="text-[#8B7355]">No transactions yet. Add your first transaction above!</p>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-lg border border-[#D5C4B3] overflow-hidden">
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead className="bg-[#F5EFE7] border-b border-[#D5C4B3]">
            <tr>
              <th className="px-4 py-3 text-left text-xs font-semibold text-[#3E2723]">Transaction Date</th>
              <th className="px-4 py-3 text-left text-xs font-semibold text-[#3E2723]">Post Date</th>
              <th className="px-4 py-3 text-left text-xs font-semibold text-[#3E2723]">Description</th>
              <th className="px-4 py-3 text-left text-xs font-semibold text-[#3E2723]">Category</th>
              <th className="px-4 py-3 text-left text-xs font-semibold text-[#3E2723]">Type</th>
              <th className="px-4 py-3 text-right text-xs font-semibold text-[#3E2723]">Amount</th>
              <th className="px-4 py-3 text-left text-xs font-semibold text-[#3E2723]">Memo</th>
              <th className="px-4 py-3 text-right text-xs font-semibold text-[#3E2723]">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-[#E8DDD3]">
            {transactions.map((transaction) => {
              const isIncome = transaction.amount >= 0;
              const amountColor = isIncome ? 'text-green-600' : 'text-[#3E2723]';

              return (
                <tr key={transaction.id} className="hover:bg-[#F5EFE7] transition-colors">
                  <td className="px-4 py-3 text-sm text-[#3E2723] whitespace-nowrap">
                    {formatDate(transaction.date)}
                  </td>
                  <td className="px-4 py-3 text-sm text-[#3E2723] whitespace-nowrap">
                    {transaction.postDate ? formatDate(transaction.postDate) : '-'}
                  </td>
                  <td className="px-4 py-3 text-sm text-[#3E2723]">
                    {transaction.description}
                  </td>
                  <td className="px-4 py-3 text-sm text-[#3E2723]">
                    {transaction.category || 'Other'}
                  </td>
                  <td className="px-4 py-3 text-sm text-[#3E2723]">
                    <span className={`inline-block px-2 py-1 rounded text-xs font-medium ${
                      isIncome ? 'bg-green-100 text-green-700' : 'bg-gray-100 text-gray-700'
                    }`}>
                      {isIncome ? 'Income' : 'Expense'}
                    </span>
                  </td>
                  <td className={`px-4 py-3 text-sm font-semibold text-right ${amountColor} whitespace-nowrap`}>
                    {formatCurrency(transaction.amount)}
                  </td>
                  <td className="px-4 py-3 text-sm text-[#3E2723] max-w-xs truncate">
                    {transaction.notes || '-'}
                  </td>
                  <td className="px-4 py-3 text-right whitespace-nowrap">
                    <button
                      onClick={() => onEdit(transaction.id)}
                      className="text-[#8B7355] hover:text-[#6D5B47] text-xs font-medium mr-3"
                    >
                      Edit
                    </button>
                    <button
                      onClick={() => {
                        if (window.confirm('Delete this transaction?')) {
                          onDelete(transaction.id);
                        }
                      }}
                      className="text-red-600 hover:text-red-800 text-xs font-medium"
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
}
