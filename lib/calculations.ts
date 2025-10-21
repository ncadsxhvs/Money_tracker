import { Transaction } from '@/types/transaction';

/**
 * Calculate total balance from all transactions
 */
export function calculateBalance(transactions: Transaction[]): number {
  return transactions.reduce((sum, t) => sum + t.amount, 0);
}

/**
 * Calculate balance for a specific month
 */
export function calculateMonthlyBalance(
  transactions: Transaction[],
  year: number,
  month: number
): number {
  return transactions
    .filter((t) => {
      const date = new Date(t.date);
      return date.getFullYear() === year && date.getMonth() === month;
    })
    .reduce((sum, t) => sum + t.amount, 0);
}

/**
 * Format number as currency
 */
export function formatCurrency(amount: number): string {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
  }).format(amount);
}

/**
 * Sort transactions by date (newest first)
 */
export function sortTransactionsByDate(transactions: Transaction[]): Transaction[] {
  return [...transactions].sort((a, b) => {
    return new Date(b.date).getTime() - new Date(a.date).getTime();
  });
}

/**
 * Parse date from MM/DD/YYYY format to ISO 8601
 */
export function parseDate(dateStr: string): string {
  // Handle MM/DD/YYYY format from Chase CSV
  const parts = dateStr.split('/');
  if (parts.length === 3) {
    const [month, day, year] = parts;
    return new Date(`${year}-${month.padStart(2, '0')}-${day.padStart(2, '0')}`).toISOString();
  }

  // Fallback to parsing as-is
  return new Date(dateStr).toISOString();
}

/**
 * Format ISO date to readable string
 */
export function formatDate(isoDate: string): string {
  return new Date(isoDate).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
  });
}
