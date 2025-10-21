'use client';

import { useState, FormEvent } from 'react';
import { TransactionCreate, TransactionCategory } from '@/types/transaction';

interface TransactionFormHorizontalProps {
  onAdd: (transaction: TransactionCreate) => void;
}

export function TransactionFormHorizontal({ onAdd }: TransactionFormHorizontalProps) {
  const [date, setDate] = useState(new Date().toISOString().split('T')[0]);
  const [postDate, setPostDate] = useState(new Date().toISOString().split('T')[0]);
  const [description, setDescription] = useState('');
  const [category, setCategory] = useState<TransactionCategory>('Other');
  const [type, setType] = useState<'income' | 'expense'>('expense');
  const [amount, setAmount] = useState('');
  const [notes, setNotes] = useState('');

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();

    if (!description.trim() || !amount) {
      alert('Please fill in description and amount');
      return;
    }

    const parsedAmount = parseFloat(amount);
    if (isNaN(parsedAmount)) {
      alert('Please enter a valid amount');
      return;
    }

    // Convert to negative for expenses
    const finalAmount = type === 'expense' ? -Math.abs(parsedAmount) : Math.abs(parsedAmount);

    onAdd({
      description: description.trim(),
      amount: finalAmount,
      date: new Date(date).toISOString(),
      postDate: postDate ? new Date(postDate).toISOString() : undefined,
      notes: notes.trim(),
      category,
    });

    // Reset form
    setDescription('');
    setAmount('');
    setNotes('');
    setDate(new Date().toISOString().split('T')[0]);
    setPostDate(new Date().toISOString().split('T')[0]);
    setType('expense');
    setCategory('Other');
  };

  const categories: TransactionCategory[] = [
    'Food & Drink', 'Shopping', 'Groceries', 'Bills & Utilities',
    'Travel', 'Gas', 'Health & Wellness', 'Automotive',
    'Entertainment', 'Income', 'Other'
  ];

  return (
    <div className="bg-white rounded-lg border border-[#D5C4B3] p-6">
      <h3 className="text-base font-semibold text-[#3E2723] mb-4">Add New Transaction</h3>
      <form onSubmit={handleSubmit}>
        <div className="grid grid-cols-1 md:grid-cols-7 gap-3">
          <div>
            <label htmlFor="date" className="block text-xs font-medium text-[#3E2723] mb-1">
              Transaction Date
            </label>
            <input
              type="date"
              id="date"
              value={date}
              onChange={(e) => setDate(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-[#8B7355]"
              required
            />
          </div>

          <div>
            <label htmlFor="postDate" className="block text-xs font-medium text-[#3E2723] mb-1">
              Post Date
            </label>
            <input
              type="date"
              id="postDate"
              value={postDate}
              onChange={(e) => setPostDate(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-[#8B7355]"
            />
          </div>

          <div>
            <label htmlFor="description" className="block text-xs font-medium text-[#3E2723] mb-1">
              Description
            </label>
            <input
              type="text"
              id="description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-[#8B7355]"
              placeholder="Description"
              required
            />
          </div>

          <div>
            <label htmlFor="category" className="block text-xs font-medium text-[#3E2723] mb-1">
              Category
            </label>
            <select
              id="category"
              value={category}
              onChange={(e) => setCategory(e.target.value as TransactionCategory)}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-[#8B7355]"
            >
              {categories.map(cat => (
                <option key={cat} value={cat}>{cat}</option>
              ))}
            </select>
          </div>

          <div>
            <label htmlFor="type" className="block text-xs font-medium text-[#3E2723] mb-1">
              Type
            </label>
            <select
              id="type"
              value={type}
              onChange={(e) => setType(e.target.value as 'income' | 'expense')}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-[#8B7355]"
            >
              <option value="expense">Expense</option>
              <option value="income">Income</option>
            </select>
          </div>

          <div>
            <label htmlFor="amount" className="block text-xs font-medium text-[#3E2723] mb-1">
              Amount
            </label>
            <input
              type="number"
              id="amount"
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-[#8B7355]"
              placeholder="0.00"
              step="0.01"
              required
            />
          </div>

          <div>
            <label htmlFor="notes" className="block text-xs font-medium text-[#3E2723] mb-1">
              Memo
            </label>
            <input
              type="text"
              id="notes"
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-[#8B7355]"
              placeholder="Notes"
            />
          </div>
        </div>

        <div className="mt-4 flex justify-end">
          <button
            type="submit"
            className="px-6 py-2 bg-[#8B7355] text-white text-sm font-medium rounded-lg hover:bg-[#6D5B47] transition-colors"
          >
            Add Transaction
          </button>
        </div>
      </form>
    </div>
  );
}
