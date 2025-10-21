# Money Tracker - Claude Instructions

### 🎯 Essential Context (Read First)
- **Check `planning.md`** for architecture, tech stack, and project goals
- **Follow existing patterns** in codebase rather than introducing new paradigms
- **Never assume missing context** - ask questions if unclear
- **Product Goal**: Simple personal finance tracker with CSV import and manual entry
- **Core Principle**: Simplicity first - no bloat, client-side processing, privacy-focused

### 🏗️ Tech Stack & Architecture
- **Frontend**: Next.js 14+ (App Router) + TypeScript + Tailwind CSS
- **Data**: localStorage (client-side only, no backend initially)
- **CSV Parsing**: PapaParse library
- **Styling**: Tailwind + color-coded UI (red=expense, green=income)

### 📁 Code Standards
- **File limit**: 500 lines max - split into modules if exceeded
- **Function size**: Aim for functions ≤ 50 lines. Break large functions into smaller helpers
- **Single Responsibility**: Each function/module should have one clear purpose
- **Imports**: External packages → internal modules → types
- **Naming**:
  - `camelCase` functions, `PascalCase` components/types, `kebab-case` files
  - Use descriptive names (e.g., `calculateInvoiceTotal` not `doCalc`)
  - Avoid generic names like `tmp`, `data`, `handleStuff`
- **TypeScript**: Strict mode, explicit types for functions
- **State Management**: Custom hooks with localStorage auto-sync
- **DRY Principle**: Do not duplicate code - refactor into shared functions
- **Comments**: Explain non-obvious logic, avoid over-commenting, remove debug code

### 📊 Core Data Model
```typescript
interface Transaction {
  id: string
  description: string
  amount: number        // Negative = expense, Positive = income
  date: string         // ISO 8601
  notes?: string
  type: 'income' | 'expense'
  createdAt: string
  updatedAt: string
}
```

### 🎨 UI Design Rules
- **Color Scheme**:
  - Income: Green (#dcfce7 bg, #166534 text, #86efac border)
  - Expense: Red (#fee2e2 bg, #991b1b text, #fca5a5 border)
  - Balance: Green (+), Red (-), Gray (0)
- **Layout**: Balance on top → Action buttons → Search → Transaction list
- **Mobile-first**: Responsive, touch-friendly, stack on mobile

### 🚀 Development Workflow
1. **Types/schemas first** (TypeScript interfaces in `/types`)
2. **Utilities layer** (CSV parser, calculations in `/lib`)
3. **Hooks layer** (State management in `/hooks`)
4. **React components** (UI in `/components`)
5. **Integration** (Wire up in app/page.tsx)

### 🧪 Testing Requirements
- **Minimum coverage**: Expected behavior + edge case + error handling
- Test CSV parsing with various formats
- Validate balance calculations
- Test localStorage persistence
- Handle edge cases (empty CSV, invalid data, large files)

### 🔒 Security Essentials
- Never commit secrets (use `.env.local`)
- Client-side CSV processing only
- Sanitize all user inputs
- Validate CSV structure before import
- Proper error handling with user-friendly messages

### 💡 Best Practices
- **Performance**: Use React.memo for list items, debounce search
- **UX**: Loading states, clear errors, confirm deletes, auto-save
- **Accessibility**: Keyboard nav, screen reader support
- **Data**: Always validate before processing, handle missing data gracefully

### 🧠 AI Assistant Rules
- **Never hallucinate** packages/APIs - verify before suggesting
- **Confirm file paths** exist before referencing
- **Follow existing patterns** in codebase
- **Check planning.md** for implementation details
- **Ask questions** if requirements unclear
- **Consider mobile** for all UI changes