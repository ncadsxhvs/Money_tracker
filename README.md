# Money Tracker

Simple personal finance tracker with CSV import capabilities.

## Quick Start

### Option 1: Using the start script (Recommended)
```bash
./start.sh
```

### Option 2: Manual start
```bash
# Install dependencies (first time only)
npm install

# Start development server
npm run dev
```

The app will be available at [http://localhost:3000](http://localhost:3000)

## Features

- ✅ Upload Chase bank CSV statements
- ✅ Manual transaction entry (description, amount, date, notes)
- ✅ Add/delete/search transactions
- ✅ Total balance display
- ✅ Color-coded transactions (red=expense, green=income)
- ✅ Mobile responsive design
- ✅ Client-side data storage (localStorage)

## Tech Stack

- **Framework**: Next.js 14+ (App Router)
- **Language**: TypeScript (strict mode)
- **Styling**: Tailwind CSS
- **CSV Parsing**: PapaParse
- **Storage**: localStorage (client-side only)

## Project Structure

```
money-tracker/
├── app/              # Next.js app router (pages)
├── components/       # React components
├── hooks/            # Custom React hooks
├── lib/              # Utilities and helpers
├── types/            # TypeScript type definitions
├── public/           # Static assets
└── data/             # Sample data files
```

## Development

### File Organization
- Place UI components in `components/`
- Place business logic in `lib/`
- Place React hooks in `hooks/`
- Place type definitions in `types/`

### Code Standards
- Max 500 lines per file
- Max 50 lines per function
- Use descriptive names
- Follow DRY principle
- TypeScript strict mode

### Available Scripts
```bash
npm run dev      # Start development server
npm run build    # Build for production
npm run start    # Start production server
npm run lint     # Run ESLint
```

## CSV Format

The app supports Chase bank CSV exports with the following format:

```csv
Transaction Date,Post Date,Description,Category,Type,Amount,Memo
09/17/2025,09/19/2025,McDonalds 11841,Food & Drink,Sale,-1.91,
09/15/2025,09/15/2025,Payment Thank You Bill Pa,,Payment,2300.00,
```

**Sample file**: `public/sample-statement.csv`

## Production Build

### Build for Production
```bash
npm run build
```

### Start Production Server
```bash
npm start
```

The production build is optimized with:
- Static page generation
- Code splitting and minification
- CSS optimization
- First Load JS: ~99.2 kB

## Deployment

See [DEPLOYMENT.md](DEPLOYMENT.md) for detailed deployment instructions.

Quick deploy options:
- **Vercel**: One-click deploy from GitHub
- **Netlify**: Auto-deploy from Git
- **Self-hosted**: Build and run with Node.js
- **Docker**: Containerized deployment

## Testing

### Manual Testing Checklist
- [ ] Upload sample CSV (`public/sample-statement.csv`)
- [ ] Upload real Chase CSV (`data/Chase9240_Activity20250820_20250919_20251020.CSV`)
- [ ] Add manual transactions
- [ ] Search transactions
- [ ] Delete transactions
- [ ] Verify balance calculations
- [ ] Test mobile responsiveness
- [ ] Verify localStorage persistence (refresh page)

### Performance
- Build size: ~99 kB First Load JS
- No compilation errors
- TypeScript strict mode enabled
- React.memo optimization on list items

## Documentation

- **CLAUDE.md** - AI assistant instructions and code standards
- **planning.md** - Detailed implementation plan and architecture
- **DEPLOYMENT.md** - Deployment guide for various platforms
- **PRD.md** - Product requirements document

## Browser Support

- Chrome/Edge (latest)
- Firefox (latest)
- Safari (latest)
- Mobile browsers (iOS Safari, Chrome Mobile)

## License

Private use only
