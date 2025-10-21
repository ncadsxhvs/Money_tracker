# Money Tracker App - Project Docs

## PRD.md

### Overview
Simple money tracker for personal finance. Upload CSV bank statements or add records manually.

### Core Features
1. **CSV Upload** - Import bank statement (.csv)
2. **Add Record** - Description, amount, date, notes
3. **View Records** - List all transactions with color coding
4. **Delete Record** - Remove transactions
5. **Balance Display** - Show total at top

### Data Model
```
Transaction:
- id (uuid)
- description (string)
- amount (number)
- date (date)
- notes (string, optional)
```

### UI Rules
- Red text = negative amount (expense)
- Green text = positive amount (income)
- Balance at top, large and prominent
- Simple list/table view

### Tech Stack
- Next.js 14+ (App Router)
- React
- Local storage or lightweight DB (SQLite/Prisma)
- CSV parsing library (papaparse)

---

## claude.md

### Project Context
Building a minimalist money tracker with Next.js. Focus on simplicity and speed.

### Key Requirements
- Keep UI minimal - no unnecessary elements
- Fast performance
- Mobile responsive
- No authentication (v1)

### Code Style
- Functional components
- TypeScript
- Tailwind CSS for styling
- Keep components small and focused

### File Structure Preferences
```
/app
  page.tsx (main view)
  /api
    /transactions (CRUD endpoints)
/components
  TransactionForm.tsx
  TransactionList.tsx
  Balance.tsx
  CSVUpload.tsx
/lib
  db.ts (database utilities)
  types.ts
```

### Don't Include
- User authentication (not in v1)
- Categories/tags
- Charts/graphs
- Export functionality
- Currency conversion

---

## planning.md

### Phase 1: Setup (Day 1)
- [ ] Initialize Next.js project with TypeScript
- [ ] Install dependencies: papaparse, @types/papaparse
- [ ] Setup Tailwind CSS
- [ ] Create database schema (localStorage or Prisma)

### Phase 2: Core Features (Day 2-3)
- [ ] Create Transaction type definitions
- [ ] Build Add Transaction form
- [ ] Build Transaction List component
- [ ] Implement Delete functionality
- [ ] Create Balance display component
- [ ] Add color coding logic

### Phase 3: CSV Import (Day 4)
- [ ] Build CSV upload component
- [ ] Implement CSV parsing
- [ ] Map CSV data to Transaction model
- [ ] Handle import errors
- [ ] Test with sample bank statements

### Phase 4: Polish (Day 5)
- [ ] Mobile responsive design
- [ ] Add loading states
- [ ] Error handling
- [ ] Basic validation
- [ ] Test all features

### MVP Scope
**Include:**
- All 5 core features
- Basic error handling
- Mobile responsive

**Exclude:**
- Categories
- Search/filter
- Data export
- Multi-user support
- Cloud sync

---

## schema.sql

```sql
CREATE TABLE transactions (
  id TEXT PRIMARY KEY,
  description TEXT NOT NULL,
  amount REAL NOT NULL,
  date TEXT NOT NULL,
  notes TEXT,
  created_at TEXT DEFAULT CURRENT_TIMESTAMP
);
```

---

## Sample CSV Format

```csv
Transaction Date,Post Date,Description,Category,Type,Amount,Memo
09/17/2025,09/19/2025,McDonalds 11841,Food & Drink,Sale,-1.91,
09/18/2025,09/19/2025,AMAZON MKTPL*ZF6S20AQ3,Shopping,Sale,-92.75,
09/17/2025,09/17/2025,DD *DOORDASH SAIGONCAF,Food & Drink,Sale,-35.75,
```

