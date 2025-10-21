'use client';

import { useMemo } from 'react';
import { Transaction } from '@/types/transaction';
import { formatCurrency } from '@/lib/calculations';

interface AnalyticsProps {
  transactions: Transaction[];
}

export function Analytics({ transactions }: AnalyticsProps) {
  const analytics = useMemo(() => {
    const totalIncome = transactions
      .filter(t => t.amount > 0)
      .reduce((sum, t) => sum + t.amount, 0);

    const totalExpenses = Math.abs(
      transactions
        .filter(t => t.amount < 0)
        .reduce((sum, t) => sum + t.amount, 0)
    );

    const netBalance = totalIncome - totalExpenses;

    // Category breakdown for expenses only
    const categoryData: Record<string, number> = {};
    transactions
      .filter(t => t.amount < 0)
      .forEach(t => {
        const category = t.category || 'Other';
        categoryData[category] = (categoryData[category] || 0) + Math.abs(t.amount);
      });

    const categoryBreakdown = Object.entries(categoryData)
      .map(([name, value]) => ({ name, value }))
      .sort((a, b) => b.value - a.value);

    return {
      totalIncome,
      totalExpenses,
      netBalance,
      categoryBreakdown,
    };
  }, [transactions]);

  if (transactions.length === 0) {
    return null;
  }

  return (
    <div className="bg-white rounded-lg border border-[#D5C4B3] p-6">
      <h3 className="text-lg font-semibold text-[#3E2723] mb-4">Financial Overview</h3>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Summary Cards */}
        <div className="space-y-4">
          <div className="bg-[#F5EFE7] rounded-lg p-4 border border-[#D5C4B3]">
            <div className="text-sm text-[#8B7355] mb-1">Total Income</div>
            <div className="text-2xl font-bold text-green-600">
              {formatCurrency(analytics.totalIncome)}
            </div>
          </div>

          <div className="bg-[#F5EFE7] rounded-lg p-4 border border-[#D5C4B3]">
            <div className="text-sm text-[#8B7355] mb-1">Total Expenses</div>
            <div className="text-2xl font-bold text-[#3E2723]">
              {formatCurrency(analytics.totalExpenses)}
            </div>
          </div>

          <div className="bg-[#F5EFE7] rounded-lg p-4 border border-[#D5C4B3]">
            <div className="text-sm text-[#8B7355] mb-1">Net Balance</div>
            <div className={`text-2xl font-bold ${
              analytics.netBalance >= 0 ? 'text-green-600' : 'text-red-600'
            }`}>
              {formatCurrency(analytics.netBalance)}
            </div>
          </div>
        </div>

        {/* Category Breakdown */}
        <div>
          <h4 className="text-sm font-semibold text-[#3E2723] mb-3">Expenses by Category</h4>
          {analytics.categoryBreakdown.length > 0 ? (
            <div className="space-y-2 max-h-[250px] overflow-y-auto">
              {analytics.categoryBreakdown.map((category) => {
                const percentage = analytics.totalExpenses > 0
                  ? (category.value / analytics.totalExpenses * 100).toFixed(1)
                  : '0.0';
                return (
                  <div
                    key={category.name}
                    className="bg-[#F5EFE7] rounded-lg p-3 border border-[#D5C4B3] flex justify-between items-center"
                  >
                    <div className="flex-1">
                      <div className="text-sm font-medium text-[#3E2723]">{category.name}</div>
                      <div className="text-xs text-[#8B7355]">{percentage}% of total expenses</div>
                    </div>
                    <div className="text-base font-bold text-[#3E2723]">
                      {formatCurrency(category.value)}
                    </div>
                  </div>
                );
              })}
            </div>
          ) : (
            <div className="flex items-center justify-center h-[250px] text-[#8B7355]">
              No expense data to display
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
