import { useState, FormEvent } from 'react';
import { TransactionCreate } from '@/types/transaction';

interface AddTransactionFormProps {
  onAdd: (transaction: TransactionCreate) => void;
}

export function AddTransactionForm({ onAdd }: AddTransactionFormProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [description, setDescription] = useState('');
  const [amount, setAmount] = useState('');
  const [date, setDate] = useState(new Date().toISOString().split('T')[0]);
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

    onAdd({
      description: description.trim(),
      amount: parsedAmount,
      date: new Date(date).toISOString(),
      notes: notes.trim(),
    });

    // Reset form
    setDescription('');
    setAmount('');
    setDate(new Date().toISOString().split('T')[0]);
    setNotes('');
    setIsOpen(false);
  };

  const handleCancel = () => {
    setIsOpen(false);
    setDescription('');
    setAmount('');
    setDate(new Date().toISOString().split('T')[0]);
    setNotes('');
  };

  if (!isOpen) {
    return (
      <button
        onClick={() => setIsOpen(true)}
        className="px-4 py-2 bg-zinc-900 text-white text-sm font-medium rounded-lg hover:bg-zinc-800 border border-zinc-700"
      >
        Add Transaction
      </button>
    );
  }

  return (
    <div className="bg-white rounded-lg border border-gray-200 p-5">
      <h3 className="text-base font-semibold text-gray-900 mb-4">
        Add New Transaction
      </h3>
      <form onSubmit={handleSubmit} className="space-y-4">
        {/* Description */}
        <div>
          <label htmlFor="description" className="block text-xs font-medium text-gray-600 mb-1.5">
            Description *
          </label>
          <input
            type="text"
            id="description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            className="w-full px-3 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-amber-400 focus:border-transparent text-sm"
            placeholder="e.g., Grocery shopping"
            maxLength={200}
            required
          />
        </div>

        {/* Amount and Date */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
          <div>
            <label htmlFor="amount" className="block text-xs font-medium text-gray-600 mb-1.5">
              Amount * (negative for expense)
            </label>
            <input
              type="number"
              id="amount"
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
              className="w-full px-3 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-amber-400 focus:border-transparent text-sm"
              placeholder="-50.00 or 100.00"
              step="0.01"
              required
            />
          </div>

          <div>
            <label htmlFor="date" className="block text-xs font-medium text-gray-600 mb-1.5">
              Date *
            </label>
            <input
              type="date"
              id="date"
              value={date}
              onChange={(e) => setDate(e.target.value)}
              className="w-full px-3 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-amber-400 focus:border-transparent text-sm"
              required
            />
          </div>
        </div>

        {/* Notes */}
        <div>
          <label htmlFor="notes" className="block text-xs font-medium text-gray-600 mb-1.5">
            Notes (optional)
          </label>
          <textarea
            id="notes"
            value={notes}
            onChange={(e) => setNotes(e.target.value)}
            className="w-full px-3 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-amber-400 focus:border-transparent text-sm"
            placeholder="Additional details..."
            rows={3}
            maxLength={500}
          />
        </div>

        {/* Buttons */}
        <div className="flex gap-2">
          <button
            type="submit"
            className="flex-1 px-4 py-2 bg-zinc-900 text-white text-sm font-medium rounded-lg hover:bg-zinc-800 border border-zinc-700"
          >
            Add
          </button>
          <button
            type="button"
            onClick={handleCancel}
            className="flex-1 px-4 py-2 bg-white text-gray-700 text-sm font-medium rounded-lg hover:bg-gray-50 border border-gray-200"
          >
            Cancel
          </button>
        </div>
      </form>
    </div>
  );
}
