'use client';

export function Header() {
  return (
    <header className="bg-[#E8DDD3] border-b border-[#D5C4B3] px-6 py-4">
      <div className="flex items-center justify-between">
        {/* Logo/Title */}
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 bg-[#8B7355] rounded-lg flex items-center justify-center text-white font-bold">
            M
          </div>
          <h1 className="text-xl font-bold text-[#3E2723]">Money Tracker</h1>
        </div>

        {/* Action Icons */}
        <div className="flex items-center gap-4">
          <button
            className="p-2 hover:bg-[#D5C4B3] rounded-lg transition-colors"
            aria-label="Toggle theme"
          >
            <svg className="w-5 h-5 text-[#3E2723]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z" />
            </svg>
          </button>
          <button
            className="p-2 hover:bg-[#D5C4B3] rounded-lg transition-colors"
            aria-label="Switch view"
          >
            <svg className="w-5 h-5 text-[#3E2723]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 10h16M4 14h16M4 18h16" />
            </svg>
          </button>
          <button
            className="p-2 hover:bg-[#D5C4B3] rounded-lg transition-colors"
            aria-label="Settings"
          >
            <svg className="w-5 h-5 text-[#3E2723]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
            </svg>
          </button>
        </div>
      </div>
    </header>
  );
}
