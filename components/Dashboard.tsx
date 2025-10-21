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
import { Analytics } from './Analytics';
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
  const [categoryFilter, setCategoryFilter] = useState<string>('all');
  const [typeFilter, setTypeFilter] = useState<string>('all');

  // Filter transactions by all criteria
  const filteredTransactions = useMemo(() => {
    let filtered = allTransactions;

    // Category filter
    if (categoryFilter !== 'all') {
      filtered = filtered.filter(t => t.category === categoryFilter);
    }

    // Type filter
    if (typeFilter !== 'all') {
      filtered = filtered.filter(t => t.type === typeFilter);
    }

    return filtered;
  }, [allTransactions, categoryFilter, typeFilter]);

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

      {/* Analytics Overview */}
      <Analytics transactions={filteredTransactions} />

      {/* Add Transaction Form */}
      <TransactionFormHorizontal onAdd={addTransaction} />

      {/* Transactions Table */}
      <TransactionTable
        transactions={allTransactions}
        filteredTransactions={filteredTransactions}
        categoryFilter={categoryFilter}
        setCategoryFilter={setCategoryFilter}
        typeFilter={typeFilter}
        setTypeFilter={setTypeFilter}
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
