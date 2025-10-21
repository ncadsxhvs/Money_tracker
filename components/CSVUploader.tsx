import { useState, ChangeEvent, useRef } from 'react';
import { Transaction } from '@/types/transaction';
import { parseCSV, validateCSVFile } from '@/lib/csv-parser';

interface CSVUploaderProps {
  onUpload: (transactions: Transaction[]) => void;
}

export function CSVUploader({ onUpload }: CSVUploaderProps) {
  const [isUploading, setIsUploading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileSelect = async (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setError(null);

    // Validate file
    const validation = validateCSVFile(file);
    if (!validation.valid) {
      setError(validation.error || 'Invalid file');
      return;
    }

    setIsUploading(true);

    try {
      const transactions = await parseCSV(file);

      if (transactions.length === 0) {
        setError('No valid transactions found in the CSV file');
        setIsUploading(false);
        return;
      }

      onUpload(transactions);

      // Reset file input
      if (fileInputRef.current) {
        fileInputRef.current.value = '';
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to parse CSV file');
    } finally {
      setIsUploading(false);
    }
  };

  const handleButtonClick = () => {
    fileInputRef.current?.click();
  };

  return (
    <div className="space-y-2">
      <button
        onClick={handleButtonClick}
        disabled={isUploading}
        className="px-4 py-2 bg-[#8B7355] text-white text-sm font-medium rounded-lg hover:bg-[#6D5B47] transition-colors disabled:opacity-50"
      >
        {isUploading ? 'Processing...' : 'Upload CSV'}
      </button>

      <input
        ref={fileInputRef}
        type="file"
        accept=".csv,.CSV"
        onChange={handleFileSelect}
        className="hidden"
        aria-label="Upload CSV file"
      />

      {error && (
        <div className="bg-red-50 border border-red-200 text-red-700 px-3 py-2 rounded-lg">
          <p className="text-xs">Error: {error}</p>
        </div>
      )}
    </div>
  );
}
