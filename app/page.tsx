import { Dashboard } from '@/components/Dashboard';
import { ErrorBoundary } from '@/components/ErrorBoundary';
import { Header } from '@/components/Header';
import { MonthNavigation } from '@/components/MonthNavigation';

export default function Home() {
  return (
    <ErrorBoundary>
      <div className="min-h-screen">
        <Header />
        <MonthNavigation />
        <main className="p-6">
          <Dashboard />
        </main>
      </div>
    </ErrorBoundary>
  );
}
