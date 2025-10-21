export type TransactionCategory =
  | 'Food & Drink'
  | 'Shopping'
  | 'Groceries'
  | 'Bills & Utilities'
  | 'Travel'
  | 'Gas'
  | 'Health & Wellness'
  | 'Automotive'
  | 'Entertainment'
  | 'Income'
  | 'Other';

export interface Transaction {
  id: string;
  description: string;
  amount: number; // Negative for expense, positive for income
  date: string; // Transaction Date - ISO 8601 format
  postDate?: string; // Post Date - ISO 8601 format
  notes?: string; // Memo
  type: 'income' | 'expense'; // Derived from amount
  category?: TransactionCategory;
  createdAt: string;
  updatedAt: string;
}

export interface TransactionCreate {
  description: string;
  amount: number;
  date: string;
  postDate?: string;
  notes?: string;
  category?: TransactionCategory;
}

// Chase Bank CSV format
export interface CSVRow {
  'Transaction Date': string;
  'Post Date': string;
  'Description': string;
  'Category': string;
  'Type': string; // Sale, Payment, Return, Fee
  'Amount': string;
  'Memo': string;
}
