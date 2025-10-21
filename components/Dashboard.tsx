'use client';

import { useState, useMemo } from 'react';
import { useTransactions } from '@/hooks/useTransactions';
import { calculateBalance } from '@/lib/calculations';
import { exportToCSV, generateExportFilename } from '@/lib/csv-export';
import { TransactionFormHorizontal } from './TransactionFormHorizontal';
import { TransactionTable } from './TransactionTable';
import { CSVUploader } from './CSVUploader';
import { Toast } from './Toast';
import { EditTransactionModal } from './EditTransactionModal';
import { DashboardSkeleton } from './SkeletonLoader';
import { Transaction } from '@/types/transaction';

export function Dashboard() {
  const {
    transactions,
    allTransactions,
    isLoading,
    searchQuery,
    setSearchQuery,
    addTransaction,
    addTransactions,
    deleteTransaction,
    updateTransaction,
    clearTransactions,
  } = useTransactions();

  const [toast, setToast] = useState<{ message: string; type: 'success' | 'error' } | null>(null);
  const [editingTransaction, setEditingTransaction] = useState<Transaction | null>(null);
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');

  // Filter transactions by date range
  const filteredByDate = useMemo(() => {
    let filtered = transactions;

    if (startDate) {
      const start = new Date(startDate);
      filtered = filtered.filter((t) => new Date(t.date) >= start);
    }

    if (endDate) {
      const end = new Date(endDate);
      end.setHours(23, 59, 59, 999); // Include entire end date
      filtered = filtered.filter((t) => new Date(t.date) <= end);
    }

    return filtered;
  }, [transactions, startDate, endDate]);

  const balance = calculateBalance(allTransactions);

  const handleCSVUpload = (csvTransactions: Transaction[]) => {
    addTransactions(csvTransactions);
    setToast({
      message: `Successfully imported ${csvTransactions.length} transactions!`,
      type: 'success',
    });
  };

  const handleEdit = (id: string) => {
    const transaction = allTransactions.find((t) => t.id === id);
    if (transaction) {
      setEditingTransaction(transaction);
    }
  };

  const handleSaveEdit = (id: string, updates: any) => {
    updateTransaction(id, updates);
    setToast({
      message: 'Transaction updated successfully!',
      type: 'success',
    });
  };

  const handleExport = () => {
    const filename = generateExportFilename();
    exportToCSV(allTransactions, filename);
    setToast({
      message: `Exported ${allTransactions.length} transactions!`,
      type: 'success',
    });
  };

  if (isLoading) {
    return <DashboardSkeleton />;
  }

  return (
    <div className="space-y-6">
      {/* CSV Upload and Actions */}
      <div className="flex items-center gap-4">
        <CSVUploader onUpload={handleCSVUpload} />
        {allTransactions.length > 0 && (
          <>
            <button
              onClick={handleExport}
              className="px-4 py-2 bg-[#8B7355] text-white text-sm font-medium rounded-lg hover:bg-[#6D5B47] transition-colors"
            >
              Export CSV
            </button>
            <button
              onClick={() => {
                if (window.confirm('Are you sure you want to clear all transactions? This cannot be undone.')) {
                  clearTransactions();
                }
              }}
              className="px-4 py-2 bg-red-600 text-white text-sm font-medium rounded-lg hover:bg-red-700 transition-colors"
            >
              Clear All
            </button>
          </>
        )}
      </div>

      {/* Add Transaction Form */}
      <TransactionFormHorizontal onAdd={addTransaction} />

      {/* Transactions Table */}
      <TransactionTable
        transactions={allTransactions}
        onEdit={handleEdit}
        onDelete={deleteTransaction}
      />

      {/* Edit Transaction Modal */}
      {editingTransaction && (
        <EditTransactionModal
          transaction={editingTransaction}
          onSave={handleSaveEdit}
          onClose={() => setEditingTransaction(null)}
        />
      )}

      {/* Toast Notification */}
      {toast && (
        <Toast
          message={toast.message}
          type={toast.type}
          onClose={() => setToast(null)}
        />
      )}
    </div>
  );
}
