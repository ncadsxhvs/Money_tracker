import Papa from 'papaparse';
import { Transaction, CSVRow, TransactionCategory } from '@/types/transaction';
import { parseDate } from './calculations';

/**
 * Parse Chase bank CSV file and convert to Transaction array
 */
export async function parseCSV(file: File): Promise<Transaction[]> {
  return new Promise((resolve, reject) => {
    Papa.parse<CSVRow>(file, {
      header: true,
      skipEmptyLines: true,
      complete: (results) => {
        try {
          const transactions = results.data
            .filter((row) => row['Transaction Date'] && row['Description'] && row['Amount'])
            .map((row) => {
              const amount = parseFloat(row['Amount']);
              const category = row['Category']?.trim() as TransactionCategory | undefined;

              return {
                id: crypto.randomUUID(),
                description: row['Description'].trim(),
                amount: amount,
                date: parseDate(row['Transaction Date']),
                notes: row['Memo']?.trim() || '',
                type: amount >= 0 ? 'income' : 'expense',
                category: category || 'Other',
                createdAt: new Date().toISOString(),
                updatedAt: new Date().toISOString(),
              } as Transaction;
            });

          resolve(transactions);
        } catch (error) {
          reject(new Error('Failed to parse CSV: ' + (error as Error).message));
        }
      },
      error: (error) => {
        reject(new Error('CSV parsing error: ' + error.message));
      },
    });
  });
}

/**
 * Validate CSV file before parsing
 */
export function validateCSVFile(file: File): { valid: boolean; error?: string } {
  // Check file type
  if (!file.name.endsWith('.csv') && !file.name.endsWith('.CSV')) {
    return { valid: false, error: 'File must be a CSV file' };
  }

  // Check file size (max 10MB)
  const maxSize = 10 * 1024 * 1024; // 10MB
  if (file.size > maxSize) {
    return { valid: false, error: 'File size must be less than 10MB' };
  }

  // Check if file is empty
  if (file.size === 0) {
    return { valid: false, error: 'File is empty' };
  }

  return { valid: true };
}
