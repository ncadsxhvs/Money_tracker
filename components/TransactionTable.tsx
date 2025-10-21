'use client';

import { useState, useMemo } from 'react';
import { Transaction, TransactionCategory } from '@/types/transaction';
import { formatCurrency, formatDate } from '@/lib/calculations';

interface TransactionTableProps {
  transactions: Transaction[];
  filteredTransactions: Transaction[];
  categoryFilter: string;
  setCategoryFilter: (filter: string) => void;
  typeFilter: string;
  setTypeFilter: (filter: string) => void;
  onEdit: (id: string) => void;
  onDelete: (id: string) => void;
}

type SortField = 'date' | 'postDate' | 'description' | 'category' | 'type' | 'amount';
type SortDirection = 'asc' | 'desc';

export function TransactionTable({
  transactions,
  filteredTransactions,
  categoryFilter,
  setCategoryFilter,
  typeFilter,
  setTypeFilter,
  onEdit,
  onDelete
}: TransactionTableProps) {
  const [sortField, setSortField] = useState<SortField>('date');
  const [sortDirection, setSortDirection] = useState<SortDirection>('desc');

  const handleSort = (field: SortField) => {
    if (sortField === field) {
      setSortDirection(sortDirection === 'asc' ? 'desc' : 'asc');
    } else {
      setSortField(field);
      setSortDirection('desc');
    }
  };

  const sortedAndFilteredTransactions = useMemo(() => {
    let filtered = [...filteredTransactions];

    // Apply sorting
    filtered.sort((a, b) => {
      let aValue: any;
      let bValue: any;

      switch (sortField) {
        case 'date':
          aValue = new Date(a.date).getTime();
          bValue = new Date(b.date).getTime();
          break;
        case 'postDate':
          aValue = a.postDate ? new Date(a.postDate).getTime() : 0;
          bValue = b.postDate ? new Date(b.postDate).getTime() : 0;
          break;
        case 'description':
          aValue = a.description.toLowerCase();
          bValue = b.description.toLowerCase();
          break;
        case 'category':
          aValue = (a.category || 'Other').toLowerCase();
          bValue = (b.category || 'Other').toLowerCase();
          break;
        case 'type':
          aValue = a.type;
          bValue = b.type;
          break;
        case 'amount':
          aValue = a.amount;
          bValue = b.amount;
          break;
      }

      if (aValue < bValue) return sortDirection === 'asc' ? -1 : 1;
      if (aValue > bValue) return sortDirection === 'asc' ? 1 : -1;
      return 0;
    });

    return filtered;
  }, [filteredTransactions, sortField, sortDirection]);

  const SortIcon = ({ field }: { field: SortField }) => {
    if (sortField !== field) {
      return <span className="text-gray-400 ml-1">⇅</span>;
    }
    return <span className="ml-1">{sortDirection === 'asc' ? '↑' : '↓'}</span>;
  };

  const allCategories = useMemo(() => {
    const categories = new Set(transactions.map(t => t.category || 'Other'));
    return Array.from(categories).sort();
  }, [transactions]);

  if (transactions.length === 0) {
    return (
      <div className="bg-white rounded-lg border border-[#D5C4B3] p-12 text-center">
        <p className="text-[#8B7355]">No transactions yet. Add your first transaction above!</p>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-lg border border-[#D5C4B3] overflow-hidden">
      {/* Filter Bar */}
      <div className="bg-[#F5EFE7] border-b border-[#D5C4B3] px-4 py-3 flex items-center gap-4">
        <span className="text-sm font-medium text-[#3E2723]">Filters:</span>
        <div className="flex items-center gap-2">
          <label className="text-xs text-[#3E2723]">Category:</label>
          <select
            value={categoryFilter}
            onChange={(e) => setCategoryFilter(e.target.value)}
            className="px-2 py-1 border border-[#D5C4B3] rounded text-xs focus:outline-none focus:ring-2 focus:ring-[#8B7355]"
          >
            <option value="all">All</option>
            {allCategories.map(cat => (
              <option key={cat} value={cat}>{cat}</option>
            ))}
          </select>
        </div>
        <div className="flex items-center gap-2">
          <label className="text-xs text-[#3E2723]">Type:</label>
          <select
            value={typeFilter}
            onChange={(e) => setTypeFilter(e.target.value)}
            className="px-2 py-1 border border-[#D5C4B3] rounded text-xs focus:outline-none focus:ring-2 focus:ring-[#8B7355]"
          >
            <option value="all">All</option>
            <option value="income">Income</option>
            <option value="expense">Expense</option>
          </select>
        </div>
        <div className="ml-auto text-xs text-[#8B7355]">
          {categoryFilter !== 'all' || typeFilter !== 'all'
            ? `Showing ${sortedAndFilteredTransactions.length} of ${transactions.length} transactions (filtered)`
            : `Showing ${sortedAndFilteredTransactions.length} transactions`}
        </div>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full">
          <thead className="bg-[#F5EFE7] border-b border-[#D5C4B3]">
            <tr>
              <th
                onClick={() => handleSort('date')}
                className="px-4 py-3 text-left text-xs font-semibold text-[#3E2723] cursor-pointer hover:bg-[#E8DDD3] transition-colors"
              >
                Transaction Date <SortIcon field="date" />
              </th>
              <th
                onClick={() => handleSort('postDate')}
                className="px-4 py-3 text-left text-xs font-semibold text-[#3E2723] cursor-pointer hover:bg-[#E8DDD3] transition-colors"
              >
                Post Date <SortIcon field="postDate" />
              </th>
              <th
                onClick={() => handleSort('description')}
                className="px-4 py-3 text-left text-xs font-semibold text-[#3E2723] cursor-pointer hover:bg-[#E8DDD3] transition-colors"
              >
                Description <SortIcon field="description" />
              </th>
              <th
                onClick={() => handleSort('category')}
                className="px-4 py-3 text-left text-xs font-semibold text-[#3E2723] cursor-pointer hover:bg-[#E8DDD3] transition-colors"
              >
                Category <SortIcon field="category" />
              </th>
              <th
                onClick={() => handleSort('type')}
                className="px-4 py-3 text-left text-xs font-semibold text-[#3E2723] cursor-pointer hover:bg-[#E8DDD3] transition-colors"
              >
                Type <SortIcon field="type" />
              </th>
              <th
                onClick={() => handleSort('amount')}
                className="px-4 py-3 text-right text-xs font-semibold text-[#3E2723] cursor-pointer hover:bg-[#E8DDD3] transition-colors"
              >
                Amount <SortIcon field="amount" />
              </th>
              <th className="px-4 py-3 text-left text-xs font-semibold text-[#3E2723]">Memo</th>
              <th className="px-4 py-3 text-right text-xs font-semibold text-[#3E2723]">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-[#E8DDD3]">
            {sortedAndFilteredTransactions.map((transaction) => {
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
