import { ReactNode } from 'react';

interface BentoCardProps {
  children: ReactNode;
  className?: string;
  span?: 'full' | 'half' | 'third' | 'two-thirds';
}

export function BentoCard({ children, className = '', span = 'full' }: BentoCardProps) {
  const spanClasses = {
    full: 'col-span-full',
    half: 'col-span-full md:col-span-6',
    third: 'col-span-full md:col-span-4',
    'two-thirds': 'col-span-full md:col-span-8',
  };

  return (
    <div
      className={`
        bg-white rounded-2xl shadow-sm border border-gray-100
        overflow-hidden transition-all duration-300
        hover:shadow-lg hover:border-gray-200
        ${spanClasses[span]}
        ${className}
      `}
    >
      {children}
    </div>
  );
}

interface BentoGridProps {
  children: ReactNode;
}

export function BentoGrid({ children }: BentoGridProps) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-12 gap-4 md:gap-6">
      {children}
    </div>
  );
}
