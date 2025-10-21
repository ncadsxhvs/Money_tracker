import { Transaction } from '@/types/transaction';

/**
 * Export transactions to CSV format
 */
export function exportToCSV(transactions: Transaction[], filename: string = 'transactions.csv'): void {
  if (transactions.length === 0) {
    alert('No transactions to export');
    return;
  }

  // Create CSV header
  const headers = ['Transaction Date', 'Description', 'Amount', 'Type', 'Notes', 'Created At'];

  // Create CSV rows
  const rows = transactions.map((t) => {
    const date = new Date(t.date).toLocaleDateString('en-US');
    const createdAt = new Date(t.createdAt).toLocaleDateString('en-US');

    return [
      date,
      `"${t.description.replace(/"/g, '""')}"`, // Escape quotes
      t.amount.toString(),
      t.type,
      t.notes ? `"${t.notes.replace(/"/g, '""')}"` : '',
      createdAt,
    ].join(',');
  });

  // Combine header and rows
  const csvContent = [headers.join(','), ...rows].join('\n');

  // Create blob and download
  const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
  const link = document.createElement('a');
  const url = URL.createObjectURL(blob);

  link.setAttribute('href', url);
  link.setAttribute('download', filename);
  link.style.visibility = 'hidden';

  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);

  URL.revokeObjectURL(url);
}

/**
 * Generate filename with current date
 */
export function generateExportFilename(): string {
  const now = new Date();
  const dateStr = now.toISOString().split('T')[0]; // YYYY-MM-DD
  return `money-tracker-${dateStr}.csv`;
}
