import { useState, useEffect, useCallback } from 'react';
import { Transaction, TransactionCreate } from '@/types/transaction';

const STORAGE_KEY = 'money-tracker-transactions';

/**
 * Hook for managing transactions with localStorage persistence
 */
export function useTransactions() {
  const [transactions, setTransactions] = useState<Transaction[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');

  // Load from localStorage on mount
  useEffect(() => {
    try {
      const stored = localStorage.getItem(STORAGE_KEY);
      if (stored) {
        const parsed = JSON.parse(stored);
        setTransactions(parsed);
      }
    } catch (error) {
      console.error('Failed to load transactions from localStorage:', error);
    } finally {
      setIsLoading(false);
    }
  }, []);

  // Save to localStorage whenever transactions change
  useEffect(() => {
    if (!isLoading) {
      try {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(transactions));
      } catch (error) {
        console.error('Failed to save transactions to localStorage:', error);
      }
    }
  }, [transactions, isLoading]);

  /**
   * Add a new transaction
   */
  const addTransaction = useCallback((transaction: TransactionCreate) => {
    const newTransaction: Transaction = {
      id: crypto.randomUUID(),
      ...transaction,
      type: transaction.amount >= 0 ? 'income' : 'expense',
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };

    setTransactions((prev) => [newTransaction, ...prev]);
    return newTransaction;
  }, []);

  /**
   * Add multiple transactions (for CSV import)
   */
  const addTransactions = useCallback((newTransactions: Transaction[]) => {
    setTransactions((prev) => [...newTransactions, ...prev]);
  }, []);

  /**
   * Delete a transaction by ID
   */
  const deleteTransaction = useCallback((id: string) => {
    setTransactions((prev) => prev.filter((t) => t.id !== id));
  }, []);

  /**
   * Update a transaction
   */
  const updateTransaction = useCallback((id: string, updates: Partial<TransactionCreate>) => {
    setTransactions((prev) =>
      prev.map((t) => {
        if (t.id === id) {
          const amount = updates.amount ?? t.amount;
          return {
            ...t,
            ...updates,
            amount,
            type: amount >= 0 ? 'income' : 'expense',
            updatedAt: new Date().toISOString(),
          };
        }
        return t;
      })
    );
  }, []);

  /**
   * Clear all transactions
   */
  const clearTransactions = useCallback(() => {
    if (window.confirm('Are you sure you want to delete all transactions? This cannot be undone.')) {
      setTransactions([]);
    }
  }, []);

  /**
   * Filter transactions by search query
   */
  const filteredTransactions = transactions.filter((t) => {
    if (!searchQuery) return true;

    const query = searchQuery.toLowerCase();
    return (
      t.description.toLowerCase().includes(query) ||
      t.notes?.toLowerCase().includes(query) ||
      t.amount.toString().includes(query)
    );
  });

  return {
    transactions: filteredTransactions,
    allTransactions: transactions,
    isLoading,
    searchQuery,
    setSearchQuery,
    addTransaction,
    addTransactions,
    deleteTransaction,
    updateTransaction,
    clearTransactions,
  };
}
