# Money Tracker App - Implementation Plan

## Project Overview
A simple, privacy-focused money tracker built with Next.js 14+ that allows CSV import and manual transaction management.

**Tech Stack:**
- Next.js 14+ (App Router)
- TypeScript
- Tailwind CSS
- PapaParse (CSV parsing)
- Local Storage for data persistence

---

## Phase 1: Project Setup & Core Structure

### 1.1 Initialize Project
- [x] Create Next.js project with TypeScript
- [x] Install dependencies:
  - `papaparse` - CSV parsing
  - `@types/papaparse` - TypeScript definitions
  - `clsx` - Class name utility
- [x] Configure Tailwind CSS
- [x] Set up project structure

### 1.2 Define Type Definitions
**File:** `types/transaction.ts`

```typescript
interface Transaction {
  id: string
  description: string
  amount: number              // Negative for expenses, positive for income
  date: string               // ISO 8601 format
  notes?: string
  type: 'income' | 'expense' // Derived from amount sign
  createdAt: string
  updatedAt: string
}

interface TransactionCreate {
  description: string
  amount: number
  date: string
  notes?: string
}
```

### 1.3 Project Structure
```
money-tracker/
├── app/
│   ├── layout.tsx
│   ├── page.tsx
│   └── globals.css
├── components/
│   ├── Dashboard.tsx
│   ├── BalanceDisplay.tsx
│   ├── TransactionList.tsx
│   ├── TransactionItem.tsx
│   ├── AddTransactionForm.tsx
│   ├── CSVUploader.tsx
│   └── SearchBar.tsx
├── lib/
│   ├── csv-parser.ts
│   ├── calculations.ts
│   └── utils.ts
├── hooks/
│   └── useTransactions.ts
└── types/
    └── transaction.ts
```

---

## Phase 2: Core Functionality

### 2.1 State Management Hook
**File:** `hooks/useTransactions.ts`

**Features:**
- Load transactions from localStorage on mount
- Auto-save to localStorage on change
- Add transaction
- Delete transaction
- Search/filter transactions

**Key Functions:**
- `addTransaction(transaction: TransactionCreate)`
- `deleteTransaction(id: string)`
- `searchTransactions(query: string)`

### 2.2 CSV Parser
**File:** `lib/csv-parser.ts`

**Features:**
- Parse CSV files using PapaParse
- Map CSV columns to Transaction type
- Handle Chase bank CSV format
- Support multiple transaction types (Sale, Payment, Return, Fee)
- Error handling for malformed data

**Chase Bank CSV Format:**
```csv
Transaction Date,Post Date,Description,Category,Type,Amount,Memo
09/17/2025,09/19/2025,McDonalds 11841,Food & Drink,Sale,-1.91,
09/15/2025,09/15/2025,Payment Thank You Bill Pa,,Payment,2300.00,
09/02/2025,09/03/2025,MERCEDES-BENZ OF PARAMUS,Automotive,Return,350.00,
```

**Column Mapping:**
- `Transaction Date` → transaction.date
- `Description` → transaction.description
- `Amount` → transaction.amount (already signed: negative for expenses, positive for income/returns)
- `Category` → can be used for future categorization
- `Type` → Sale (expense), Payment (income), Return (income), Fee (expense)
- `Memo` → transaction.notes (optional)

### 2.3 Balance Calculation
**File:** `lib/calculations.ts`

**Functions:**
- `calculateBalance(transactions: Transaction[]): number`
- `formatCurrency(amount: number): string`
- `sortTransactionsByDate(transactions: Transaction[])`

---

## Phase 3: UI Components

### 3.1 Balance Display Component
**File:** `components/BalanceDisplay.tsx`

**Features:**
- Large, prominent display
- Color-coded (green for positive, red for negative, gray for zero)
- Formatted currency display

**Design:**
```
┌────────────────────────────────┐
│      Total Balance             │
│      $1,234.56                 │
│      (Large, bold text)        │
└────────────────────────────────┘
```

### 3.2 Transaction Item Component
**File:** `components/TransactionItem.tsx`

**Features:**
- Color-coded background (red for expenses, green for income)
- Display: date, description, amount, notes
- Delete button
- Hover effects

**Design:**
```
┌─────────────────────────────────────────────┐
│ 2024-01-15 | Grocery Store    | -$45.32 🔴 │
│ Notes: Weekly shopping                      │
│                                   [Delete]  │
└─────────────────────────────────────────────┘
```

### 3.3 Transaction List Component
**File:** `components/TransactionList.tsx`

**Features:**
- Scrollable list of TransactionItem components
- Empty state message
- Sorted by date (newest first)

### 3.4 Add Transaction Form
**File:** `components/AddTransactionForm.tsx`

**Fields:**
- Description (text input)
- Amount (number input)
- Date (date picker)
- Notes (textarea, optional)

**Features:**
- Form validation
- Clear form after submission
- Quick add button
- Mobile-friendly layout

### 3.5 CSV Uploader Component
**File:** `components/CSVUploader.tsx`

**Features:**
- File input (accept .csv only)
- Drag & drop support
- Upload button
- Loading state during processing
- Success/error messages
- Preview of parsed data before import

### 3.6 Search Bar Component
**File:** `components/SearchBar.tsx`

**Features:**
- Text input for searching
- Real-time filtering
- Search by description or notes
- Clear search button

---

## Phase 4: Main Dashboard

### 4.1 Dashboard Layout
**File:** `components/Dashboard.tsx`

**Layout:**
```
┌─────────────────────────────────────────┐
│           Total Balance                 │
│           $X,XXX.XX                     │
├─────────────────────────────────────────┤
│  [Upload CSV]  [Add Transaction]       │
├─────────────────────────────────────────┤
│  [Search: ____________]                 │
├─────────────────────────────────────────┤
│  Transaction List                       │
│  ┌───────────────────────────────────┐ │
│  │ Transaction items...              │ │
│  │ ...                               │ │
│  └───────────────────────────────────┘ │
└─────────────────────────────────────────┘
```

### 4.2 Main Page
**File:** `app/page.tsx`

- Import and render Dashboard component
- Handle client-side rendering for localStorage access

---

## Phase 5: Styling & Polish

### 5.1 Color Scheme
```css
/* Income - Green */
--income-bg: #dcfce7
--income-text: #166534
--income-border: #86efac

/* Expense - Red */
--expense-bg: #fee2e2
--expense-text: #991b1b
--expense-border: #fca5a5

/* Balance */
--balance-positive: #16a34a
--balance-negative: #dc2626
--balance-zero: #6b7280
```

### 5.2 Responsive Design
- Mobile-first approach
- Breakpoints: sm (640px), md (768px), lg (1024px)
- Stack form fields on mobile
- Adjust transaction item layout for mobile

### 5.3 Animations & Transitions
- Smooth hover effects
- Fade in/out for add/delete operations
- Loading spinners
- Skeleton screens

---

## Phase 6: Testing & Validation

### 6.1 Test Cases
- [ ] Upload valid CSV file
- [ ] Upload invalid CSV file (error handling)
- [ ] Add transaction manually
- [ ] Delete transaction
- [ ] Search transactions
- [ ] Balance calculation accuracy
- [ ] Data persistence (reload page)
- [ ] Empty state display
- [ ] Mobile responsiveness

### 6.2 Edge Cases
- [ ] Empty CSV file
- [ ] CSV with missing columns
- [ ] CSV with invalid data types
- [ ] Very large CSV files (1000+ rows)
- [ ] Duplicate transactions
- [ ] Invalid date formats
- [ ] Extremely large amounts

---

## Phase 7: Deployment

### 7.1 Pre-Deployment Checklist
- [ ] Test with real bank statement CSVs
- [ ] Verify all features work
- [ ] Check mobile responsiveness
- [ ] Optimize performance
- [ ] Add error boundaries
- [ ] Test localStorage limits

### 7.2 Deployment Steps
- [ ] Deploy to Vercel
- [ ] Test production build locally
- [ ] Configure environment variables (if needed)
- [ ] Set up custom domain (optional)

---

## Future Enhancements (Post-MVP)

### P1 Features
- [ ] Edit existing transactions
- [ ] Transaction categories
- [ ] Date range filtering
- [ ] Export to CSV
- [ ] Monthly/weekly summaries
- [ ] Dark mode

### P2 Features
- [ ] Multiple accounts
- [ ] Budget tracking
- [ ] Recurring transactions
- [ ] Charts and visualizations
- [ ] Backend API with database
- [ ] Multi-user support

---

## Implementation Timeline

### Week 1: Setup & Core
- Days 1-2: Project setup, types, folder structure
- Days 3-4: State management hook, CSV parser
- Days 5-7: Balance calculation, core utilities

### Week 2: UI Components
- Days 1-2: BalanceDisplay, TransactionItem, TransactionList
- Days 3-4: AddTransactionForm, CSVUploader
- Days 5-7: SearchBar, Dashboard integration

### Week 3: Polish & Deploy
- Days 1-2: Styling, responsive design
- Days 3-4: Testing, bug fixes
- Days 5-7: Deployment, documentation

---

## Development Notes

### Best Practices
1. **Data Validation**: Always validate CSV data before processing
2. **Error Handling**: Provide clear error messages for users
3. **Performance**: Use React.memo for transaction list items
4. **Accessibility**: Ensure keyboard navigation works
5. **Privacy**: All processing happens client-side

### Common Pitfalls to Avoid
- Don't store sensitive data in plain localStorage (consider encryption for future)
- Handle timezone issues with dates
- Validate amount inputs (no letters, proper decimal handling)
- Test with various CSV formats from different banks
- Don't forget loading states

### CSV Format Flexibility
**Primary Format: Chase Bank**
The app is designed to work with Chase bank CSV exports. The format includes:
```csv
Transaction Date,Post Date,Description,Category,Type,Amount,Memo
09/17/2025,09/19/2025,McDonalds 11841,Food & Drink,Sale,-1.91,
09/15/2025,09/15/2025,Payment Thank You Bill Pa,,Payment,2300.00,
```

**Key Features of Chase Format:**
- Amount is already signed (negative for expenses, positive for income)
- Type field indicates: Sale, Payment, Return, Fee
- Category field provides transaction categorization
- Memo field for additional notes
- Transaction Date is in MM/DD/YYYY format

**Future Enhancement:**
Support for other bank formats can be added by creating format adapters in the CSV parser.

---

## Resources

### Documentation
- [Next.js App Router](https://nextjs.org/docs/app)
- [Tailwind CSS](https://tailwindcss.com/docs)
- [PapaParse](https://www.papaparse.com/docs)

### Sample CSV Files
A sample Chase bank statement is available at `public/sample-statement.csv`:
```csv
Transaction Date,Post Date,Description,Category,Type,Amount,Memo
09/17/2025,09/19/2025,McDonalds 11841,Food & Drink,Sale,-1.91,
09/18/2025,09/19/2025,AMAZON MKTPL*ZF6S20AQ3,Shopping,Sale,-92.75,
09/15/2025,09/15/2025,Payment Thank You Bill Pa,,Payment,2300.00,
09/14/2025,09/15/2025,DOORDASH*09/13-2 ORDER,Food & Drink,Sale,-96.72,
09/12/2025,09/14/2025,Payment Thank You-Mobile,,Payment,3000.00,
09/06/2025,09/07/2025,COSTCO WHSE #0244,Shopping,Sale,-120.44,
09/02/2025,09/03/2025,MERCEDES-BENZ OF PARAMUS,Automotive,Return,350.00,
08/25/2025,08/26/2025,EXXON NJ FUEL LLC,Gas,Sale,-84.56,
```

**Real data sample:** A full Chase CSV export is available in `/data/Chase9240_Activity20250820_20250919_20251020.CSV` for testing with real-world data.

---

**Ready to Start?** Begin with Phase 1 and work through each phase systematically. Good luck with your money tracker app!
